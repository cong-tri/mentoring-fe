// BASE RESPONSE
export type BaseResponse = {
  status?: number | undefined;
  code?: number;
  success: boolean;
  message: string;
};

// PAGINATION
export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};

// QUERY PARAM SEARCH
export type QueryParamsGet = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startTime?: string;
  endTime?: string;
};

export type SearchCheckBox = {
  id: string;
  name: string;
  children?: SearchCheckBox[];
};

// MENU
export type Menu = {
  meN_ID: string;
  title: string;
  url: string;
  parenT_ID?: string;
  displayOrder: number;
  position: number;
  children: Menu[];
};

export type ResponseMenu = BaseResponse & {
  data?: Menu[] | undefined;
};

export type UserLogin = {
  userID: string;
  email: string;
  userCode: string;
  name: string;
  birthDate: string;
  gender: 0 | 1;
  roles: string[];
};

export type ResponseVerifyEmail = BaseResponse & {
  token?: string;
};

export type ResponeLogin = BaseResponse & {
  token?: string;
  user?: UserLogin;
};
// EXPERTISE
export type Expertise = {
  expertise: string;
  subExpertise: string;
};

// IMAGE
export type Image = {
  IMAGE_ID: string;
  imgUrl: string;
};

// VIDEO
export type Video = {
  VIDEO_ID: string;
  videoUrl: string;
};

// MENTOR
export type Mentor = {
  USER_ID: string;
  firstName: string;
  lastName: string;
  salutation: string;
  email: string;
  slug: string;
  introduce?: string;
  avatar?: string;
  totalCompletedMentees: number;
  totalConfirmedMentees: number;
  avgRating: number;
  expertiseList: Expertise[] | [];
};

// RANDOM MENTOR
export type ResponeRandomMentor = BaseResponse & {
  data: Mentor[];
};

// MENTOR LIST
export type ResponeGetMentorAll = BaseResponse & {
  data: Mentor[] | undefined;
  pagination: Pagination | undefined;
};

// COMMENT
export type Comment = {
  CMT_ID: string;
  USER_ID: string;
  EVENT_ID?: string;
  NEWS_ID?: string;
  BLOG_ID?: string;
  RECAPEVENT_ID?: string;
  RECAPBOOKING_ID?: string;
  parentCommentID?: string;
  commentText: string;
  fullName?: string;
  aliasName?: string;
  salutation?: string;
  avatar?: string;
};

export type ResponseGetComment = BaseResponse & {
  totalComments: number;
  comments: Comment[] | [];
};

// LIKES
export type Like = {
  LIKE_ID?: string;
  USER_ID: string;
  EVENT_ID?: string;
  NEWS_ID?: string;
  BLOG_ID?: string;
  RECAPEVENT_ID?: string;
  RECAPBOOKING_ID?: string;
  fullName?: string;
  aliasName?: string;
  salutation?: string;
  avatar?: string;
};

export type ResponseGetLike = BaseResponse & {
  likeCount: number;
  likes: Like[] | [];
};

//BLOG
export type Blog = {
  BLOGS_ID: string;
  USER_ID: string;
  title: string;
  status: string;
  slug: string;
  thumbnail: string;
  createdDate: string | Date;
};

export type ResponeGetBlogAll = BaseResponse & {
  data: Blog[];
  pagination: Pagination | undefined;
};

export type BlogSerach = {
  BLOGS_ID: string;
  USER_ID: string;
  title: string;
  slug: string;
  thumbnail: string;
  createdDate: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string | null;
  UpdatedAt: string;
};

export type ResponeGetBlogSearchAll = BaseResponse & {
  data: Blog[];
};

export type BlogDetail = {
  BLOGS_ID: string;
  USER_ID: string;
  title: string;
  slug: string;
  thumbnail: string;
  createdDate: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string | null;
  UpdatedAt: string;
};
export type ResponeGetBlogDetails = BaseResponse & {
  data: BlogDetail | null;
};

// EVENT CATEGORY
export type EventCategory = {
  EVENTCAT_ID: string;
  title: string;
  subTitle: string;
  description: string;
  thumbnail: string;
  keyWords: string;
};

// EVENT
export type Event = {
  EVENT_ID: string;
  EVENTCAT_ID: string;
  title: string;
  subTitle: string;
  slug: string;
  EventCode: number;
  startTime: string;
  endTime: string;
  status: string;
  location: string;
  maxParticipants: number;
  organization: string;
  position?: string;
  thumbnail: string;
  description: string;
  keyWords: string;
  createdBy: string;
  createdAt: string;
  totalParticipants: number;
};

type EventGuest = {
  GUEST_ID: string;
  USER_ID: string;
  FULL_NAME: string;
  EMAIL: string;
  PHONE: string;
  ORGANIZATION: string;
  ROLE: string;
  avatar: null | string;
  introduce: null | string;
  slogan: null | string;
  UP_ID: null | string;
  expertise: Expertise[] | [];
};

export type EventDetail = Event & {
  content: string;
  totalActiveGuests: number;
  totalCanceledGuests: number;
  totalPendingGuests: number;
  totalGuests: number;
  guests: EventGuest[] | [];
  eventCategory: EventCategory;
  SEOAdvanced: null;
  SEOBasics: null;
  images: Image[] | [];
  videos: Video[] | [];
};

export type ResponseGetEventAll = BaseResponse & {
  data: Event[] | [];
  pagination: Pagination;
};

export type ResponseGetEventDetail = BaseResponse & {
  data: EventDetail | undefined;
};
