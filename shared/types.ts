export interface TokenPayload {
  id: string;
  email: string;
}
export interface RefreshToken {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export type ServiceFn = () => Promise<Response>;

export interface QueuedRequests  {
  service: ServiceFn;
  resolve: (res:Response) => void;
  reject: (err:unknown) => void
};
