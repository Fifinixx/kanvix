export interface TokenPayload {
  id: string;
  email: string;
}
export interface RefreshToken{
  userId:string,
  tokenHash:string,
  expiresAt:Date,
}