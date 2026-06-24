import { prisma } from "../../lib/prisma";
import { SignUpSchema, SignUpType } from "../../../../shared/schemas/signup";
import bcrypt from "bcryptjs";
import { RefreshToken } from "../../../../shared/types";
import { GenerateRefreshToken, HashRefreshToken } from "../../lib/crypto.util";
import { GenerateAccessToken } from "../../lib/jwt.util";

export async function SignUpService(user: SignUpType) {
  const { firstName, lastName, email, password } = user;
  const checkUser = SignUpSchema.parse({
    firstName,
    lastName,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);
  const formedUser = {
    firstName,
    lastName,
    email,
    passwordHash: hasedPassword,
  };
  const insertedUser = await prisma.user.create({ data: formedUser });
  return insertedUser;
}

export async function SignInService(rawToken: string) {}

export async function SignOutService(rawToken: string) {
  const hashedRefreshedToken = HashRefreshToken(rawToken);
  await prisma.refreshToken.deleteMany({
    // used deleteMany here because it does not throw.
    // You do not want an error thrown when user signs out.
    where: { tokenHash: hashedRefreshedToken },
  });
}

export async function CreateRefreshTokenService({userId, token, expiresAt}: RefreshToken) {
  const insertedRefreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: token,
      expiresAt
    },
  });
  return insertedRefreshToken;
}

export async function RotateRefreshTokenService(rawToken: string) {
  const hashIncomingToken = HashRefreshToken(rawToken);

  const existingRefreshToken = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashIncomingToken },
    include: { user: true },
  });

  if (
    !existingRefreshToken ||
    existingRefreshToken.revoked ||
    existingRefreshToken.expiresAt < new Date()
  ) {
    return 401;
  }

  const { user } = existingRefreshToken;

  const newRefreshToken = GenerateRefreshToken();
  const newAccessToken = GenerateAccessToken({
    id: user.id,
    email: user.email,
  });
  const newHashedToken = HashRefreshToken(newRefreshToken);

  await prisma.$transaction(async (tx) => {
    const newTokenRecord = await tx.refreshToken.create({
      data: {
        tokenHash: newHashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await tx.refreshToken.update({
      where: { id: existingRefreshToken.id },
      data: {
        // not hard deleting but just marking revoked:true
        //Why? Because if someone hits the server with an old token,
        // you know someone has stolen a refresh token, and you can
        // nuke all user sessions
        revoked: true, 
        replacedBy: newTokenRecord.id,
      },
    });
  });

  return { newAccessToken, newRefreshToken };
}
