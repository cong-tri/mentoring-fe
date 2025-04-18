import z from "zod";

export const menteeBookingSchema = z.object({
  selectedTime: z.string().min(1, "Vui lòng chọn thời gian"),
  message: z.string().min(1).max(1000),
});

export const menteeProfileSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  bio: z.string().min(1, "Giới thiệu là bắt buộc"),
  stats: z.array(
    z.object({
      number: z.string().min(1, "Số liệu là bắt buộc"),
      title: z.string().min(1, "Tiêu đề là bắt buộc"),
    })
  ),
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
  goals: z.array(
    z.object({
      title: z.string().min(1, "Tiêu đề là bắt buộc"),
      description: z.string().min(1, "Mô tả là bắt buộc"),
    })
  ),
  contacts: z.array(
    z.object({
      value: z.string().min(1, "Thông tin liên hệ là bắt buộc"),
    })
  ),
  education: z.array(
    z.object({
      school: z.string().min(1, "Trường học là bắt buộc"),
      degree: z.string().min(1, "Bằng cấp là bắt buộc"),
      time: z.string().min(1, "Thời gian là bắt buộc"),
    })
  ),
});
