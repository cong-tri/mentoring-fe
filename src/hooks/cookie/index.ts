import { useCookies } from "react-cookie";
import { CookieSetOptions, CookieGetOptions } from "universal-cookie";

export const useCookieCustom = (
  dependencies?: string[],
  options?: CookieGetOptions
) => {
  const [cookies, setCookie, removeCookie] = useCookies(dependencies, options);

  const setCookieCustom = (
    cookieName: string,
    value: string,
    option?: CookieSetOptions
  ) => {
    setCookie(cookieName, value, option);
  };

  const getCookieCustom = (cookieName: string): string => cookies[cookieName];

  const removeCookieCustom = (
    cookieName: string,
    options?: CookieSetOptions
  ) => {
    removeCookie(cookieName, options);
  };

  return { setCookieCustom, getCookieCustom, removeCookieCustom };
};
