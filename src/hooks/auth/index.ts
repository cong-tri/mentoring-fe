// import { useCookies } from "react-cookie";
import { useCookieCustom } from "../cookie";

import {
  handleApiLogin,
  handleApiRegister,
  handleApiSendOTP,
  handleApiVerifyEmail,
} from "../../apis";
import {
  LoginFormValues,
  MENTORING_USER_INFO,
  MENTORING_USER_TOKEN,
} from "../../apis/login";

import { ResponeLogin, BaseResponse, ResponseVerifyEmail } from "../../types";
import { EmailConfirmOTP, RegisterQuery, SendMailSchema } from "../../schemas";

export const useAuth = () => {
  // const [cookies, setCookie, removeCookie] = useCookies([
  //   MENTORING_USER_TOKEN,
  //   MENTORING_USER_INFO,
  // ]);

  const { setCookieCustom, getCookieCustom, removeCookieCustom } =
    useCookieCustom([MENTORING_USER_TOKEN, MENTORING_USER_INFO]);

  // Function to handle login
  const handleLogin = async (
    data: LoginFormValues
  ): Promise<ResponeLogin | undefined> => {
    const response = await handleApiLogin(data);

    if (response?.status === 200 && response?.success) {
      setCookieCustom(MENTORING_USER_INFO, JSON.stringify(response.user));
      setCookieCustom(MENTORING_USER_TOKEN, response.token ?? "");
    }

    return response;
  };

  // Function to handle register
  const handleRegister = async (
    data: RegisterQuery
  ): Promise<BaseResponse | undefined> => {
    console.log("data >>", data);

    const response = await handleApiRegister(data);
    console.log("response >>>>", response);

    return response;
  };

  // Function to handle send otp
  const handleSendOTP = async (
    data: SendMailSchema
  ): Promise<BaseResponse | undefined> => {
    const response = await handleApiSendOTP(data);

    return response;
  };

  // Function to handle verify email with otp for register
  const handleVerifyEmail = async (
    data: EmailConfirmOTP
  ): Promise<ResponseVerifyEmail | undefined> => {
    const response = await handleApiVerifyEmail(data);

    return response;
  };

  // Function to get token
  const getToken = (): string => getCookieCustom(MENTORING_USER_TOKEN);

  // Function to get user data
  const getUser = () =>
    getCookieCustom(MENTORING_USER_INFO)
      ? JSON.parse(getCookieCustom(MENTORING_USER_INFO))
      : null;

  // Function to logout
  const handleLogout = () => {
    removeCookieCustom(MENTORING_USER_TOKEN, { path: "/" });
    removeCookieCustom(MENTORING_USER_INFO, { path: "/" });
  };

  return {
    getToken,
    getUser,
    handleLogout,
    handleLogin,
    handleRegister,
    handleSendOTP,
    handleVerifyEmail,
  };
};
