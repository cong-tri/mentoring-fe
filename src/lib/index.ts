// function handle format datetime
export const handleFormatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

export const handleDecodeJWT = (token: string) => {
  if (token === "") return;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};
