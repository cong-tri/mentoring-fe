import { API } from "../../configs/axios-config";
import { AxiosError } from "axios";

import {
  QueryParamsGet,
  ResponseGetComment,
  ResponseGetEventAll,
  ResponseGetEventDetail,
  ResponseGetLike,
} from "../../types";

// get path from .env
const PATH_GET_EVENT_ALL: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_EVENT_ALL as string;

const PATH_EVENT_DETAIL: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_EVENT_DETAIL as string;

export type QueryParamsGetEvent = QueryParamsGet & {
  eventCatId?: string;
};

// function handle api get list event
const handleApiGetEvent = async ({
  page,
  limit,
  search,
  status,
  startTime,
  endTime,
  eventCatId,
}: QueryParamsGetEvent): Promise<ResponseGetEventAll | undefined> => {
  try {
    const response = await API.get(PATH_GET_EVENT_ALL, {
      params: {
        page,
        limit,
        search,
        status,
        startTime,
        endTime,
        eventCatId,
      },
    });

    return {
      ...response.data,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response: ResponseGetEventAll = {
        status: error.response?.status,
        success: false,
        message:
          error.response?.statusText ?? "Xảy ra lỗi khi lấy danh sách sự kiện",
        data: [],
        pagination: {
          currentPage: 0,
          totalItems: 0,
          totalPages: 0,
          limit: 0,
        },
      };
      return response;
    }
  }
};

// function handle api get event detail
const handleApiGetEventDetail = async (
  EventCode: string
): Promise<ResponseGetEventDetail | undefined> => {
  try {
    if (EventCode === "") return;

    const response = await API.get(`${PATH_EVENT_DETAIL}/${EventCode}`);
    if (response.status !== 200) return;

    return {
      ...response.data,
      success: true,
      message: "Lấy thông tin chi tiết sự kiện thành công",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseMentorAll: ResponseGetEventDetail = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
        data: undefined,
      };
      return responseMentorAll;
    }
  }
};

// function handle api get all comments
const handleApiGetComment = async (
  id: string
): Promise<ResponseGetComment | undefined> => {
  try {
    const response = await API.get(`/v1/api/event/${id}/comments`);
    console.log(response);
    // return {};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.message,
        totalComments: 0,
        comments: [],
      };
    }
  }
};

// function handle api get all comments
const handleApiGetLike = async (
  id: string
): Promise<ResponseGetLike | undefined> => {
  try {
    const response = await API.get(`/v1/api/event/${id}/likes`);
    console.log(response);
    // return {};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.message,
        likeCount: 0,
        likes: [],
      };
    }
  }
};

export {
  handleApiGetEvent,
  handleApiGetEventDetail,
  handleApiGetComment,
  handleApiGetLike,
};
