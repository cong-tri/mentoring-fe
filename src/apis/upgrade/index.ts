import { API } from "../../configs/axios-config";
import { UpgradeFormData } from "../../schemas";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const API_PATH_UPGRADE: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_UPGRADE as string;
const API_PATH_SEND_ACTIVATION_OTP: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_SEND_ACTIVATION_OTP as string;
const API_PATH_VERIFY_ACTIVATION_OTP: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_VERIFY_ACTIVATION_OTP as string;

export const handleApiUpgrade = async (data: UpgradeFormData) => {
  try {
    const formData = new FormData();
    formData.append("requestType", data.requestType);
    formData.append("uIDRef", data.uIDRef);
    formData.append("avatar", data.avatar[0]);
    formData.append("cvFile", data.cvFile[0]);
    formData.append("uCFTs", data.uCFTs[0]);
    formData.append("iCBKs", data.iCBKs[0]);
    formData.append("jwtToken", data.jwtToken || "");

    const res = await API.post(API_PATH_UPGRADE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

export const handleSendMail = async () => {
  try {
    if (cookies.get("VERIFY_EMAIL")) {
      return {
        isOpenModal: true,
      };
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2);
    const res = await API.post(API_PATH_SEND_ACTIVATION_OTP);

    if (res?.data?.success === true) {
      cookies.set("VERIFY_EMAIL", true, {
        expires,
      });
    }
    console.log("Res: ", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    }

    return null;
  }
};

export const handleVerifyActivationOtp = async (otp: string) => {
  try {
    const res = await API.post(API_PATH_VERIFY_ACTIVATION_OTP, {
      otp,
    });

    return res.data;
  } catch {
    return null;
  }
};
