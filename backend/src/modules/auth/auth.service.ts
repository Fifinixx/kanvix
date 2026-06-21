import { prisma } from "../../lib/prisma";
import { SignUpSchema, SignUpType } from "../../../../shared/schemas/signup";
import bcrypt from "bcryptjs";

export async function AuthSignUpService(user: SignUpType) {
  const { firstName, lastName, email, password } = user;
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);
  const formedUser = {
    firstName,
    lastName,
    email,
    passwordHash: hasedPassword,
  };
  const insertUser = await prisma.user.create({ data: formedUser });
  return insertUser;
}

export async function AuthSignInService() {}
