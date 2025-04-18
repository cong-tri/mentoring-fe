import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Tên đăng nhập hoặc email không được để trống"),
  password: z
    .string()
    .trim()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .max(30, "Mật khẩu không được quá 30 ký tự"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
