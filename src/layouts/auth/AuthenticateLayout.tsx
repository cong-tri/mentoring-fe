import { Outlet } from "react-router-dom";
import { AuthTitle } from "../../components";

import { Slide, ToastContainer } from "react-toastify";

import styles from "./styles/authen.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AuthenticateLayout = () => {
  return (
    <>
      <div className={cx("authen")}>
        <div className="row gap-0 w-100 h-100">
          <div className="col px-0 d-none d-sm-none d-lg-none d-xl-block">
            <AuthTitle />
          </div>
          <div className="col px-0">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        style={{ width: "100%" }}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
        theme="light"
        transition={Slide}
      />
    </>
  );
};

export default AuthenticateLayout;
