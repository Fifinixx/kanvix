import { prisma } from "../../lib/prisma";
import { SignUpSchema, SignUpType } from "../../../../shared/schemas/signup";
import bcrypt from "bcryptjs";
import { RefreshToken } from "../../../../shared/types";
import { HashRefreshToken } from "../../lib/crypto.util";

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

export async function SignOutService(rawToken:string) {
  const hashedRefreshedToken = HashRefreshToken(rawToken);
  await prisma.refreshToken.deleteMany({
    // used deleteMany here because it does not throw.
    // You do not want an error thrown when user signs out.
    where: { tokenHash: hashedRefreshedToken },
  });
}

export async function CreateRefreshTokenService(refreshToken: RefreshToken) {
  const insertedRefreshToken = await prisma.refreshToken.create({
    data: {
      ...refreshToken,
    },
  });
  return insertedRefreshToken;
}

export async function RotateRefreshTokenService(refreshToken:RefreshToken){

}
