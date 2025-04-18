import { z } from "zod";

export const upgradeSchema = z.object({
  requestType: z.enum(["Mentee", "Mentor"], {
    message: "Vui lòng chọn loại yêu cầu hợp lệ",
  }),
  uIDRef: z.string().min(1, "Mã CCCD là bắt buộc"),
  avatar: z
    .instanceof(FileList)
    .refine(
      (files) =>
        files instanceof FileList && files[0]?.type.startsWith("image/"),
      "File phải là ảnh (PNG, JPG, v.v.)"
    ),
  cvFile: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "CV là bắt buộc")
    .refine(
      (files) => !files?.length || files[0]?.type === "application/pdf",
      "File phải là PDF"
    ),
  uCFTs: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Ảnh CCCD mặt trước là bắt buộc")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "File phải là ảnh (PNG, JPG)"
    ),
  iCBKs: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Ảnh CCCD mặt sau là bắt buộc")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "File phải là ảnh (PNG, JPG)"
    ),
  jwtToken: z.string().optional(),
});

export type UpgradeFormData = z.infer<typeof upgradeSchema>;
