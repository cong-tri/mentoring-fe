import handleApiLogin from "./login";
import handleApiRegister from "./register";
import { handleApiMentorRandom, handleApiGetMentorAll } from "./mentor";
import { handleApiGetEvent, handleApiGetEventDetail } from "./event";
import {
  handleApiSendOTP,
  handleApiSendPassword,
  handleApiVerifyEmail,
  handleApiVerifyOTP,
} from "./auth";
import { handleAPIVisitCounter, handleAPIGetMenus } from "./admin";

export {
  handleApiLogin,
  handleApiRegister,
  handleApiMentorRandom,
  handleApiGetMentorAll,
  handleApiGetEvent,
  handleApiGetEventDetail,
  handleApiSendOTP,
  handleApiSendPassword,
  handleApiVerifyEmail,
  handleApiVerifyOTP,
  handleAPIVisitCounter,
  handleAPIGetMenus,
};
