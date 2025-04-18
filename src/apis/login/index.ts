import { API } from "../../configs/axios-config";
import { z } from "zod";

import { loginSchema } from "../../schemas";
import { ResponeLogin } from "../../types";
import { AxiosError } from "axios";

// path login
const PATH_LOGIN: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_LOGIN as string;

// secret key store token
export const MENTORING_USER_TOKEN: string = import.meta.env
  .VITE_MENTORING_USER_TOKEN as string;

// secret key store user info
export const MENTORING_USER_INFO: string = import.meta.env
  .VITE_MENTORING_USER_INFO as string;

export type LoginFormValues = z.infer<typeof loginSchema>;

// function handle call api authen login
export default async function handleApiLogin(
  data: LoginFormValues
): Promise<ResponeLogin | undefined> {
  try {
    const response = await API.post(PATH_LOGIN, data);

    if (response.status !== 200 && !response.data.success) {
      return;
    }

    const responseLogin: ResponeLogin = {
      success: response.data.success,
      message: response.data.message,
      status: response.status,
      token: response.data.token,
      user: response.data.user,
    };

    return responseLogin;
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseLogin: ResponeLogin = {
        status: error.response?.status,
        success: error.response?.data.success,
        message: error.response?.data.message,
      };

      return responseLogin;
    }
  }
}
