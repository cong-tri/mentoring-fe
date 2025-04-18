import { AxiosError } from "axios";
import { API_ADMIN } from "../../configs/axios-config";

const PATH_VISIT_COUNTER = import.meta.env
  .VITE_MENTORING_ADMIN_API_PATH_VISIT_COUNTER as string;

async function handleAPIVisitCounter() {
  try {
    await API_ADMIN.get(PATH_VISIT_COUNTER);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.message;
    }
  }
}

export default handleAPIVisitCounter;
