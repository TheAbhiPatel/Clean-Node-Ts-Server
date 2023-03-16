import { object, string, TypeOf } from "zod";

export const signupUserSchema = object({
  body: object({
    name: string({ required_error: "Name is Required" }),
    email: string({ required_error: "Email is Required" }).email(
      "Email is not Valid"
    ),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password must be 6 characters long!"
    ),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is Required !" }).email(
      "Invalid email"
    ),
    password: string({ required_error: "Password is Required !" }),
  }),
});

export type signupUserInput = TypeOf<typeof signupUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
