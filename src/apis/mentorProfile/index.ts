import { API } from "../../configs/axios-config";

const PATH_GET_USER_INFO = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_INFO_USER;

const PATH_GET_USER_EXPERIENCE = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_EXPERIENCES;

const PATH_GET_USER_ACTIVITIES = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_ACTIVITIES;

const PATH_GET_USER_EXPERTISE = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_EXPERTISE;

const PATH_GET_USER_CERTIFICATES = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_CERTIFICATES;

export const handleRequestGetMentorProfile = async (mentorId: string) => {
  try {
    const res = await API.get(`${PATH_GET_USER_INFO}/${mentorId}`);
    return res.data;
  } catch {
    return null;
  }
};

export const hanldeRequestMentorExpirence = async (mentorId: string) => {
  try {
    const res = await API.get(`${PATH_GET_USER_EXPERIENCE}/${mentorId}`);
    return res.data;
  } catch {
    return null;
  }
};

export const hanldeRequestMentorActivities = async (mentorId: string) => {
  try {
    const res = await API.get(`${PATH_GET_USER_ACTIVITIES}/${mentorId}`);
    return res.data;
  } catch {
    return null;
  }
};

export const hanldeRequestMentorExpertise = async (mentorId: string) => {
  try {
    const res = await API.get(`${PATH_GET_USER_EXPERTISE}/${mentorId}`);
    console.log("hanldeRequestMentorExpertise: ", res);
    return res.data;
  } catch {
    return null;
  }
};

export const hanldeRequestMentorCertificate = async (mentorId: string) => {
  try {
    const res = await API.get(`${PATH_GET_USER_CERTIFICATES}/${mentorId}`);
    return res.data;
  } catch {
    return null;
  }
};
