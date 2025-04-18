import { z } from "zod";

const MAX_FILE_SIZE: number = 1000 * 1024 * 10;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const registerAccountSchema = z.object({
  emailUser: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 ký tự"),
  password: z
    .string()
    .trim()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .max(30, "Mật khẩu không được quá 30 ký tự"),
});

export const confirmPasswordSchema = z.object({
  confirmPassword: z
    .string()
    .trim()
    .min(8, "Mật khẩu nhập lại phải ít nhất 8 ký tự")
    .max(30, "Mật khẩu nhập lại không được quá 30 ký tự"),
});

export const registerInfoSchema = z.object({
  lastName: z
    .string()
    .trim()
    .min(1, "Họ không được để trống")
    .max(255, "Họ không được vượt quá 255 ký tự"),
  firstName: z
    .string()
    .trim()
    .min(1, "Tên không được để trống")
    .max(255, "Tên không được quá 255 ký tự"),
  salutation: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn danh xưng")
    .max(255, "Danh xưng không quá 255 ký tự"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Số điện thoại ít nhất 10 số")
    .max(11, "Số điện thoại không được quá 11 số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa số"),
  // dob: z.coerce.date().or(z.string()),
  dob: z.string(),
  gender: z
    .number()
    .int()
    .refine((val) => val === 0 || val === 1, {
      message: "Giới tính chỉ được là 0 (Nữ) hoặc 1 (Nam)",
    }),
});

export const registerRoleSchema = z.enum(["Guest", "Mentee", "Mentor"], {
  errorMap: () => ({ message: "Role phải là 'Guest', 'Mentee' hoặc 'Mentor'" }),
});

export const confirmOTPSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, "Vui lòng nhập đầy đủ 6 số OTP")
    .regex(/^\d{6}$/, "Mã OTP phải gồm 6 chữ số")
    .optional(),
});

export const registerIsSchoolSchema = z.object({
  isSchool: z.boolean().default(false),
  SCHOOL_ID: z.string().optional(),
});

const fileSchema = (message: string) => {
  return (
    z
      // .any()
      // .instanceof(FileList)
      // .refine((file) => file instanceof File, {
      //   message: message,
      // })
      // .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      //   message: "File phải là định dạng PNG, JPG hoặc WEBP",
      // })
      // .refine((file) => file.size <= MAX_FILE_SIZE, {
      //   message: "Kích thước file phải nhỏ hơn 10MB",
      // })
      .custom<FileList>((v) => v instanceof FileList && v.length > 0, {
        message,
      })
      .refine(
        (files) => {
          if (!files || files.length === 0) return false;
          return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
        },
        {
          message: "File phải là định dạng PNG, JPG hoặc WEBP",
        }
      )
      .refine(
        (files) => {
          if (!files || files.length === 0) return false;
          return files[0].size <= MAX_FILE_SIZE;
        },
        {
          message: "Kích thước file phải nhỏ hơn 10MB",
        }
      )
      .optional()
  );
};

export const registerApplicationSchema = z.object({
  uIDRef: z
    .string({ required_error: "Mã CCCD là bắt buộc" })
    .trim()
    .min(1, "Mã CCCD là bắt buộc")
    .max(12, "Mã CCCD phải có đúng 12 số")
    .regex(/^\d+$/, "uIDRef chỉ được chứa số")
    .optional(),
  verificationToken: z.string().optional(),
  uCFTs: fileSchema("Mặt trước CCCD là bắt buộc"),
  iCBKs: fileSchema("Mặt sau CCCD là bắt buộc"),
  avatar: fileSchema("Ảnh đại diện là bắt buộc"),
  cvFile: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "CV là bắt buộc")
    .refine(
      (files) => !files?.length || files[0]?.type === "application/pdf",
      "File phải là PDF"
    )
    .optional(),
});

export const registerFormSchema = z
  .object({
    ...registerAccountSchema.shape,
    ...registerInfoSchema.shape,
    ...confirmPasswordSchema.shape,
    ...registerIsSchoolSchema.shape,
    ...confirmOTPSchema.shape,
    ...registerApplicationSchema.shape,
    role: registerRoleSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.isSchool) {
        return data.SCHOOL_ID && data.SCHOOL_ID.trim().length > 0;
      }
      return true;
    },
    {
      message: "Mã trường học là bắt buộc khi chọn là trường học",
      path: ["SCHOOL_ID"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "Guest") return true;
      return data.otp && data.otp.length === 6;
    },
    {
      message: "OTP là bắt buộc khi không phải Guest",
      path: ["otp"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "Guest") return true;
      return !!data.verificationToken;
    },
    {
      message: "Token xác minh là bắt buộc khi không phải Guest",
      path: ["verificationToken"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "Guest") return true;

      return (
        !!data.uIDRef &&
        !!data.uCFTs &&
        !!data.iCBKs &&
        !!data.avatar &&
        !!data.cvFile
      );
    },
    {
      message:
        "Mã CCCD, mặt trước, mặt sau CCCD, hình đại diện, CV là bắt buộc nếu role là Mentee hoặc Mentor",
      path: ["cvFile"],
    }
  );

export type RegisterAccount = z.infer<typeof registerAccountSchema>;
export type RegisterInfo = z.infer<typeof registerInfoSchema>;
export type RegisterIsSchool = z.infer<typeof registerIsSchoolSchema>;
export type RegisterApplication = z.infer<typeof registerApplicationSchema>;

export type RegisterFormValue = z.infer<typeof registerFormSchema>;
export type RegisterQuery = RegisterAccount &
  RegisterInfo &
  RegisterIsSchool &
  RegisterApplication;
