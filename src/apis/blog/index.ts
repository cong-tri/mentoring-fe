import { AxiosError } from "axios";
import { API } from "../../configs/axios-config";
import {
  ResponeGetBlogAll,
  ResponeGetBlogDetails,
  ResponeGetBlogSearchAll,
} from "../../types";

//PATH LIST BLOG
const PATH_LIST_BLOG: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_BLOG_ALL as string;

const PATH_BLOG_SEARCH: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_BLOG_SEARCH as string;

const PATH_BLOG_DETAIlS: string = import.meta.env
  .VITE_MENTORING_USER_API_PATH_BLOG_DETAIL as string;

// function handle api get list blog
export const handleApiGetBlogAll = async (): Promise<
  ResponeGetBlogAll | undefined
> => {
  try {
    const response = await API.get<ResponeGetBlogAll>(PATH_LIST_BLOG);

    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      success: true,
      pagination: response.data.pagination,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseBlogAll: ResponeGetBlogAll = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
        data: [],
        pagination: undefined,
      };
      return responseBlogAll;
    }
  }
};

// function handle api get list blog paginate
export const handleApiGetBlogWithPaginate = async (
  page?: number,
  limit?: number
): Promise<ResponeGetBlogAll | undefined> => {
  try {
    const response = await API.get<ResponeGetBlogAll>(PATH_LIST_BLOG, {
      params: {
        page: page,
        limit: limit,
      },
    });

    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      success: true,
      pagination: response.data.pagination,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseBlogAll: ResponeGetBlogAll = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
        data: [],
        pagination: undefined,
      };
      return responseBlogAll;
    }
  }
};

// function handle api get blog search
export const hanndleApiGetBlogSearch = async (
  name?: string,
  id?: string
): Promise<ResponeGetBlogSearchAll | undefined> => {
  try {
    const response = await API.get<ResponeGetBlogSearchAll>(PATH_BLOG_SEARCH, {
      params: {
        name: name || undefined,
        id: id || undefined,
      },
    });
    // console.log(response);
    return {
      status: response.status,
      data: response.data.data,
      message: response.data.message,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseBlogSearch: ResponeGetBlogSearchAll = {
        status: error.response?.status,
        success: false,
        message: error.response?.data.message,
        data: [],
      };
      return responseBlogSearch;
    }
  }
};

// function handle api get blog detail
export const handleApiGetBlogDetails = async (
  id: string
): Promise<ResponeGetBlogDetails | undefined> => {
  if (!id) {
    return {
      status: 400,
      success: false,
      message: "ID không hợp lệ!",
      data: null,
    };
  }

  try {
    const response = await API.get<ResponeGetBlogDetails>(
      `${PATH_BLOG_DETAIlS}/${id}`
    );

    return {
      status: response.status,
      message: "",
      data: response.data.data,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseBlogAll: ResponeGetBlogDetails = {
        status: error.response?.status,
        success: false,
        message: error.message,
        data: null,
      };
      return responseBlogAll;
    }
  }
};
