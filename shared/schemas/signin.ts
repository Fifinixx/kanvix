import { z } from "zod";

const SignInSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters long" })
    .max(20, { message: "Password must be maximum 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

type SignInType = z.infer<typeof SignInSchema>;
export { SignInSchema };
export type { SignInType };


