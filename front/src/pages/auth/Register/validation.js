import * as yup from "yup";

const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validation = yup.object({
  username: yup
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  email: yup
    .string()
    .trim()
    .matches(emailRules, "Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is required"),
});