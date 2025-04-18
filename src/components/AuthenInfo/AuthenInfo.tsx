import styles from "./styles/authenInfo.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);
const AuthTitle = () => {
  const location = useLocation();

  return (
    <>
      <div className={cx("authen-title", "d-none", "d-lg-block")}>
        <div className={cx("authen-login")}>
          <Link to={"/"}>
            <img
              src="/assets/images/LOGO.svg"
              alt="Logo"
              className="img-fluid"
              style={{ height: 180, width: "auto" }}
            />
          </Link>
        </div>
        <div className="my-3">
          <h4 className="fw-bold text-uppercase">Mentoring</h4>
          <h3>
            {location.pathname.includes("/auth/login")
              ? "Chào mừng đến với Mentoring"
              : "Bước đầu hành trình phát triển"}
          </h3>
          <p>
            {location.pathname.includes("/auth/login")
              ? "Nếu bạn chưa có tài khoản, bạn hãy đăng ký để kết nối với những người hướng dẫn trên con đường phát tiển của bạn!"
              : "Nếu bạn đã có tài khoản, bạn hãy đăng nhập để kết nối với những người hướng dẫn trên con đường phát tiển của bạn!"}
          </p>
        </div>
        <div className={cx("to-register-login")}>
          <Link
            to={
              location.pathname.includes("/auth/login")
                ? "/auth/register"
                : "/auth/login"
            }
          >
            <button className={cx("btn-to-register-login")} type="button">
              {location.pathname.includes("/auth/login")
                ? "Đăng ký"
                : "Đăng nhập"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthTitle;
