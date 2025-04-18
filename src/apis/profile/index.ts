import { API } from "../../configs/axios-config";

const PATH_GET_PROFILE = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_INFO_USER;

const PATH_GET_EXPERIENCE = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_EXPERIENCES;

const PATH_GET_ACTIVITIES = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_ACTIVITIES;

const PATH_GET_EXPERTISE = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_EXPERTISE;

const PATH_GET_CERTIFICATES = import.meta.env
  .VITE_MENTORING_USER_API_PATH_GET_CERTIFICATES;

export const hanldeRequestProfile = async () => {
  try {
    const res = await API.get(PATH_GET_PROFILE);
    return res.data;
  } catch {
    return null;
  }
};

export const handleRequestExperiences = async () => {
  try {
    const res = await API.get(PATH_GET_EXPERIENCE);
    return res.data;
  } catch {
    return null;
  }
};

export const handleRequestActivities = async () => {
  try {
    const res = await API.get(PATH_GET_ACTIVITIES);
    return res.data;
  } catch {
    return null;
  }
};

export const handleRequestExpertise = async () => {
  try {
    const res = await API.get(PATH_GET_EXPERTISE);
    return res.data;
  } catch {
    return null;
  }
};

export const handleRequestCertificates = async () => {
  try {
    const res = await API.get(PATH_GET_CERTIFICATES);
    return res.data;
  } catch {
    return null;
  }
};
