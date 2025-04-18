import { RouteObject } from "react-router-dom";

import {
  AboutPage,
  EventPage,
  HomePage,
  JobsPage,
  MentoringProfilePage,
  MentorPage,
  MenteeProfilePage,
  BlogPage,
  BlogDetails,
  EventDetailPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  JobDetailsPage,
  NotFoundPage,
  EditMentorProfilePage,
  EditMenteeProfile,
  ForgotPasssWord,
  UpgradePage,
  RequestMentor,
  ProfileMentorPage,
} from "../pages";

import { AuthenticateLayout, MainLayout } from "../layouts";
import { AuthMiddleware } from "../context/authMiddleware";

export const publicRouter: RouteObject[] = [
  {
    id: "protected",
    element: <AuthMiddleware />,
    children: [
      {
        // element: <MainLayout />,
        id: "root",
        path: "/",
        Component: MainLayout,
        children: [
          { id: "home", path: "/", element: <HomePage /> },

          // About
          { id: "aboutus", path: "/aboutus", element: <AboutPage /> },

          {
            id: "profile",
            path: "/profile/mentor",
            element: <ProfileMentorPage />,
          },

          // Mentor
          {
            id: "mentor",
            path: "/mentor",
            element: <MentorPage />,
          },
          {
            id: "mentor details",
            path: "/mentor/profile/:mentorId",
            element: <MentoringProfilePage />,
          },
          {
            id: "mentor edit",
            path: "/mentor/profile/edit/:slug",
            element: <EditMentorProfilePage />,
          },

          // Mentee
          {
            id: "mentee details",
            path: "/mentee/profile/:slug",
            element: <MenteeProfilePage />,
          },
          {
            id: "mentee edit",
            path: "/mentee/profile/edit/:slug",
            element: <EditMenteeProfile />,
          },

          // Event
          { id: "event", path: "/event", element: <EventPage /> },
          {
            id: "event details",
            path: "/event/details/:slug",
            element: <EventDetailPage />,
          },

          // Job
          {
            id: "job",
            path: "/job",
            element: <JobsPage />,
          },
          {
            id: "job details",
            path: "/job/details/:slug",
            element: <JobDetailsPage />,
          },

          // Blog
          {
            id: "blog",
            path: "/blog",
            element: <BlogPage />,
          },
          {
            id: "blog details",
            path: "/blog/details/:slug",
            element: <BlogDetails />,
          },

          // Contact
          {
            id: "contact",
            path: "/contact",
            element: <ContactPage />,
          },

          {
            id: "Upgrade",
            path: "/upgrade",
            element: <UpgradePage />,
          },
        ],
      },
      // Request_Mentor
      {
        id: "requestmentor",
        path: "/requestmentor",
        element: <RequestMentor />,
      },
      {
        id: "authenticate",
        path: "/auth",
        Component: AuthenticateLayout,
        children: [
          // Login
          {
            id: "login",
            path: "login",
            element: <LoginPage />,
          },

          //Register
          {
            id: "register",
            path: "register",
            element: <RegisterPage />,
          },

          //Forgot PassWord
          {
            id: "forgot password",
            path: "forgot-password",
            element: <ForgotPasssWord />,
          },
        ],
      },
    ],
  },

  // Not Found
  { id: "not-found", path: "*", element: <NotFoundPage /> },
];
