import { z } from "zod";
import { confirmPasswordSchema } from "../register";

export const authSendMailSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 ký tự"),
});

export const authConfirmOTPSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập OTP")
    .max(6, "OTP chỉ tối đa 6 ký tự"),
});

export const authNewPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .max(30, "Mật khẩu không được quá 30 ký tự"),
});

export const authSchema = z
  .object({
    ...authSendMailSchema.shape,
    ...authConfirmOTPSchema.shape,
    ...confirmPasswordSchema.shape,
    ...authNewPasswordSchema.shape,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type SendMailSchema = z.infer<typeof authSendMailSchema>;
export type ConfirmOTPSchema = z.infer<typeof authConfirmOTPSchema>;
export type NewPasswordSchema = z.infer<typeof authNewPasswordSchema>;

export type EmailConfirmOTP = SendMailSchema & ConfirmOTPSchema;
export type ResetPassword = EmailConfirmOTP & NewPasswordSchema;
