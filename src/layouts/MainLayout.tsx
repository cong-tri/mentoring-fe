import { Outlet } from "react-router-dom";

import { BackToTop, CookieNotification, Footer, Header } from "../components";
import { Slide, ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <CookieNotification />
      <Header />
      <Outlet />
      <ToastContainer
        position="top-center"
        style={{ width: "100%" }}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
        // progress={undefined}
        theme="light"
        transition={Slide}
      />
      <BackToTop />
      <Footer />
    </>
  );
}
