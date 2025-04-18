import { API } from "../../configs/axios-config";

import { EmailConfirmOTP, ResetPassword, SendMailSchema } from "../../schemas";
import { BaseResponse, ResponseVerifyEmail } from "../../types";
import { AxiosError } from "axios";

// PATH FORGOT PASSWORD
const PATH_SEND_OTP: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_SEND_OTP as string;

// PATH VERIFY OTP
const PATH_VERIFY_OTP: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_VERIFY_OTP as string;

// PATH VERIFY EMAIL
const PATH_VERIFY_EMAIL: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_VERIFY_EMAIL as string;

// PATH RESET PASSWORD
const PATH_RESET_PASSWORD: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_RESET_PASSWORD as string;

// function handle call api authen login
export async function handleApiSendOTP(
  data: SendMailSchema
): Promise<BaseResponse | undefined> {
  try {
    const response = await API.post<BaseResponse>(`${PATH_SEND_OTP}`, data);

    if (response.status !== 200) {
      return;
    }
    return {
      message: response.data.message,
      status: response.status,
      success: response.data.success,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseSendMail: BaseResponse = {
        status: error.response?.status === 429 ? 429 : error.response?.status,
        success: false,
        message:
          error.response?.status === 429
            ? "Bạn đã gửi quá nhiều email. Vui lòng thử lại sau!"
            : error.response?.data.message,
      };

      return responseSendMail;
    }
  }
}

// function handle call api verifi otp for verify email register
export async function handleApiVerifyEmail(
  data: EmailConfirmOTP
): Promise<ResponseVerifyEmail | undefined> {
  try {
    const response = await API.post<ResponseVerifyEmail>(
      `${PATH_VERIFY_EMAIL}`,
      data
    );

    if (response.status !== 200 && !response.data.success) {
      return;
    }

    return {
      status: response.status,
      success: response.data.success,
      message: response.data.message,
      token: response.data.token,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseLogin: BaseResponse = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
      };

      return responseLogin;
    }
  }
}

// function handle call api verifi otp for forgot password
export async function handleApiVerifyOTP(
  data: EmailConfirmOTP
): Promise<BaseResponse | undefined> {
  try {
    const response = await API.post<BaseResponse>(`${PATH_VERIFY_OTP}`, data);

    if (response.status !== 200) {
      return;
    }
    return {
      ...response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseLogin: BaseResponse = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
      };

      return responseLogin;
    }
  }
}

// function handle call api reset password
export async function handleApiSendPassword(
  data: ResetPassword
): Promise<BaseResponse | undefined> {
  try {
    const response = await API.post<BaseResponse>(
      `${PATH_RESET_PASSWORD}`,
      data
    );

    if (response.status !== 200) {
      return;
    }

    return {
      ...response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseLogin: BaseResponse = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
      };

      return responseLogin;
    }
  }
}
