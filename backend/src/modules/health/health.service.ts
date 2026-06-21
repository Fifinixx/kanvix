import { prisma } from "../../lib/prisma";

const DB_CHECK_TIMEOUT_MS = 3000;

export  async function HealthLiveService() {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}

export async function HealthReadyService() {
  const checks = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: "unknown" as "unknown" | "healthy" | "unhealthy",
  };

  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("DB health check timed out")),
          DB_CHECK_TIMEOUT_MS,
        ),
      ),
    ]);
    checks.database = "healthy";
  } catch {
    checks.database = "unhealthy";
  }

  return checks;
}
