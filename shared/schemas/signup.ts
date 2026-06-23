import { z } from "zod";

const SignUpSchema = z.object({
  firstName: z
    .string("Please enter valid first name")
    .min(3,  "Please enter a first name of atleast 3 characters.")
    .max(30, "Please enter a first name below 30 characters"),
  lastName: z
    .string("Please enter valid last name")
    .min(3, "Please enter a last name of atleast 3 characters.")
    .max(20, "Please enter a last name below 20 characters"),
  email: z.email("Please enter a valid email."),
  password: z
    .string("Please enter valid password")
    .min(5, "Password must be atleast 5 characters long")
    .max(20, "Password must be maximum 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

type SignUpType = z.infer<typeof SignUpSchema>;
export { SignUpSchema, SignUpType };
