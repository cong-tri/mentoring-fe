import { SearchCheckBox } from "../../../../../types";

export const listFilter: SearchCheckBox[] = [
  {
    id: "typeJobs",
    name: "Loại công việc",
    children: [
      { id: "1", name: "Việc làm fulltime" },
      { id: "2", name: "Việc làm bán thời gian" },
      { id: "3", name: "Thực Tập" },
      { id: "4", name: "Freelance" },
      { id: "5", name: "Theo dự án" },
    ],
  },
  {
    id: "workModel",
    name: "Mô Hình Làm Việc",
    children: [
      { id: "1", name: "Làm tại công ty" },
      { id: "2", name: "Làm việc hybrid" },
      { id: "3", name: "Làm việc từ xa" },
    ],
  },
  {
    id: "experience",
    name: "Kinh Nghiệm",
    children: [
      { id: "1", name: "Chưa có kinh nghiệm" },
      { id: "2", name: "Mới ra trường" },
      { id: "3", name: "<1 năm" },
      { id: "4", name: "1 – 3 năm" },
      { id: "5", name: "3 – 5 năm" },
      { id: "6", name: "5 – 10 năm" },
      { id: "7", name: "10+ năm" },
    ],
  },
  {
    id: "eduLevel",
    name: "Trình độ học vấn",
    children: [
      { id: "1", name: "Thạc Sĩ" },
      { id: "2", name: "Cử Nhân" },
      { id: "3", name: "Cao Đẳng" },
      { id: "3", name: "Bằng Liên Kết" },
      { id: "3", name: "Trung Học Phổ Thông" },
    ],
  },
];
