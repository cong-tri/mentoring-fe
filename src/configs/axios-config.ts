import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
// BASE URL USER
const BASE_URL_USER: string = import.meta.env.VITE_MENTORING_USER_API as string;
const KEY_FOR_PUBLIC_API = import.meta.env
  .VITE_MENTORING_KEY_FOR_PUBLIC_API as string;

const API = axios.create({
  baseURL: BASE_URL_USER,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 60 * 1000,
});

// intercepting requests
API.interceptors.request.use(
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // handle request here
    const token = cookies.get("MENTORING_USER_TOKEN");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    request.headers["x-api-key"] = KEY_FOR_PUBLIC_API;

    return request;
  },
  (error: AxiosError) => {
    // handle error here
    throw error;
  }
);

//intercepting responses
API.interceptors.response.use(
  (response) => {
    // handle response here
    return response;
  },
  (error: AxiosError) => {
    //handle error here
    throw error;
  }
);

const API_ADMIN = axios.create({
  baseURL: import.meta.env.VITE_MENTORING_ADMIN_API as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// intercepting requests
API_ADMIN.interceptors.request.use(
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // handle request here
    request.headers["Authorization"] = "Bearer ";
    return request;
  },
  (error: AxiosError) => {
    // handle error here
    throw error;
  }
);

//intercepting responses
API_ADMIN.interceptors.response.use(
  (response) => {
    // handle response here
    return response;
  },
  (error: AxiosError) => {
    //handle error here
    throw error;
  }
);

export { API, API_ADMIN };
