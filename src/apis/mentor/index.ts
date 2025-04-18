import { API } from "../../configs/axios-config";
import { AxiosError } from "axios";

import {
  QueryParamsGet,
  ResponeGetMentorAll,
  ResponeRandomMentor,
} from "../../types";

// Lấy biến từ môi trường
const PATH_RANDOM: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_MENTOR_RANDOM as string;

const PATH_GET_MENTOR_ALL: string = import.meta.env
  .VITE_MENTORING_ADMIN_API_PATH_GET_MENTOR_ALL as string;

const handleApiMentorRandom = async (): Promise<
  ResponeRandomMentor | undefined
> => {
  try {
    const response = await API.get(PATH_RANDOM);

    if (response.status !== 200) {
      return {
        status: response.status,
        success: false,
        message: response.statusText,
        data: [],
      };
    }

    return {
      ...response.data,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseMentorRandom: ResponeRandomMentor = {
        status: error.response?.status,
        success: false,
        message:
          error.response?.statusText ?? "Xảy ra lỗi khi lấy danh sách mentor",
        data: [],
      };
      return responseMentorRandom;
    }
  }
};

const handleApiGetMentorAll = async ({
  page = 1,
  search,
}: QueryParamsGet): Promise<ResponeGetMentorAll | undefined> => {
  try {
    const response = await API.get<ResponeGetMentorAll>(PATH_GET_MENTOR_ALL, {
      params: {
        page,
        limit: 8,
        search,
      },
    });

    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseMentorAll: ResponeGetMentorAll = {
        status: error.response?.status,
        success: error.response?.data.success,
        message: error.response?.data.message,
        data: [],
        pagination: undefined,
      };
      return responseMentorAll;
    }
  }
};

export { handleApiMentorRandom, handleApiGetMentorAll };
