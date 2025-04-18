import { AxiosError } from "axios";

import { API } from "../../configs/axios-config";

import { RegisterQuery } from "../../schemas/register";
import { BaseResponse } from "../../types";

// path register
const PATH_REGISTER: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_REGISTER as string;

export const MENTORING_USER_VERIFY_EMAIL_TOKEN: string = import.meta.env
  .VITE_MENTORING_USER_VERIFY_EMAIL_TOKEN as string;

// function handle call api authen register
export default async function handleApiRegister(
  data: RegisterQuery
): Promise<BaseResponse | undefined> {
  try {
    console.log("data: ", data);
    const { uCFTs, iCBKs, avatar, cvFile, ...payload } = data;

    const formData = new FormData();
    formData.append("avatar", avatar && avatar?.length !== 0 ? avatar[0] : "");
    formData.append("cvFile", cvFile && cvFile?.length !== 0 ? cvFile[0] : "");
    formData.append("uCFTs", uCFTs && uCFTs?.length !== 0 ? uCFTs[0] : "");
    formData.append("iCBKs", iCBKs && iCBKs?.length !== 0 ? iCBKs[0] : "");

    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);

    const dataQuery: RegisterQuery = { ...payload, ...formDataObject };

    const response = await API.post(`${PATH_REGISTER}`, dataQuery, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) {
      return;
    }

    return {
      status: response.status,
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response: BaseResponse = {
        status: error.response?.status === 429 ? 429 : error.response?.status,
        success: false,
        message:
          error.response?.status === 429
            ? "Bạn đã gửi quá nhiều email. Vui lòng thử lại sau!"
            : error.response?.data.message,
      };

      return response;
    }
  }
}
