import { type ServiceFn, QueuedRequests } from "../../shared/types";

let isRefreshingToken = false;
let queue: QueuedRequests[] = [];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function emptyQueue(refreshError: Error | null) {
  const pendingQueue = [...queue];
  queue = []; // clearing here to not re-execute previous promises

  if (refreshError) {
    pendingQueue.forEach(({ reject }) => reject(refreshError));
    return;
  }

  for (let item of pendingQueue) {
    try {
      item.resolve(await item.service());
    } catch (e) {
      item.reject(e);
    }
  }
}
export async function customFetch(serviceFn: ServiceFn): Promise<Response | 401>{
  // if already fetching refresh token, return a promise
  if (isRefreshingToken) {
    return new Promise((resolve, reject) => {
      queue.push({ service: serviceFn, resolve, reject });
    });
  }

  try {
    const response = await serviceFn();

    if (response.status !== 401) return response;

    isRefreshingToken = true;

    const refresh = await fetch(`${baseUrl}/auth/refresh`, {
      method:"POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      await emptyQueue(new Error("Session expired"));
      return 401;
    }
    const retryAfterRefresh = await serviceFn();
    await emptyQueue(null);
    return retryAfterRefresh;
  } catch (e: any) {
    console.error(e);
    await emptyQueue(e); // empty queue if error thrown, while refreshing token
    throw(e);
  } finally {
    isRefreshingToken = false;
  }
}
