import z from "zod";

export const mentorRegisterSchema = z.object({
  name: z.string().min(1, "Họ và tên không được để trống"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Email không được để trống"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải ít nhất 10 số")
    .max(10, "Số điện thoại chỉ gồm 10 số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa số"),
});

export const mentorProfileSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  slogan: z.string().min(1, "Slogan là bắt buộc"),
  bio: z.string().min(1, "Giới thiệu là bắt buộc"),
  experiences: z.array(
    z.object({
      title: z.string().min(1, "Chức danh là bắt buộc"),
      company: z.string().min(1, "Công ty là bắt buộc"),
      time: z.string().min(1, "Thời gian là bắt buộc"),
      description: z.string().min(1, "Mô tả là bắt buộc"),
    })
  ),
  gallery: z.array(
    z.object({
      src: z.string().min(1, "Ảnh là bắt buộc"),
      title: z.string().min(1, "Tiêu đề là bắt buộc"),
    })
  ),
  methods: z.array(
    z.object({
      title: z.string().min(1, "Tiêu đề là bắt buộc"),
      description: z.string().min(1, "Mô tả là bắt buộc"),
    })
  ),
  skills: z.array(
    z.object({
      title: z.string().min(1, "Tên chuyên môn là bắt buộc"),
      description: z.string().min(1, "Mô tả là bắt buộc"),
      subItems: z.array(z.string()),
    })
  ),
  certificates: z.array(
    z.object({
      title: z.string().min(1, "Tên chứng chỉ là bắt buộc"),
      organization: z.string().min(1, "Tổ chức là bắt buộc"),
      year: z.string().min(1, "Năm là bắt buộc"),
    })
  ),
});
