import { AxiosError } from "axios";
import { API_ADMIN } from "../../configs/axios-config";
import { ResponseMenu } from "../../types";

const PATH_VISIT_COUNTER = import.meta.env
  .VITE_MENTORING_ADMIN_API_PATH_VISIT_COUNTER as string;

const PATH_LIST_MENU = import.meta.env
  .VITE_MENTORING_ADMIN_API_PATH_LIST_MENU as string;

async function handleAPIVisitCounter() {
  try {
    await API_ADMIN.get(PATH_VISIT_COUNTER);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.message;
    }
  }
}

async function handleAPIGetMenus(): Promise<ResponseMenu | undefined> {
  try {
    const response = await API_ADMIN.get(PATH_LIST_MENU);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        success: false,
        message: error.response?.data.message,
      };
    }
  }
}

export { handleAPIVisitCounter, handleAPIGetMenus };
