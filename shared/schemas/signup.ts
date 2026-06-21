import { z } from "zod";

const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(30, { message: "Please enter a first name below 30 characters" }),
  lastName: z
    .string()
    .min(3)
    .max(20, { message: "Please enter a last name below 20 characters" }),
  email: z.email(),
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

type SignUpType = z.infer<typeof SignUpSchema>
export {SignUpSchema, SignUpType}

