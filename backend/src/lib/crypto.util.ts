import crypto from "node:crypto";

export function GenerateRefreshToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  return rawToken;
}

export function HashRefreshToken(rawToken: string) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
 return hashedToken;
}
