import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../../../../schemas";

import classNames from "classnames/bind";
import styles from "./styles/formLogin.module.scss";

const cx = classNames.bind(styles);

const initialState: LoginFormValues = {
  email: "devoda8328@mobilesm.com",
  password: "securepassword",
};

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialState,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { handleLogin } = useAuth();

  // handle submit login
  const handleSubmitLogin = async (data: LoginFormValues) => {
    try {
      setErrorMessage("");
      const response = await handleLogin(data);

      if (response?.status === 200 && response.success) {
        console.log("login success", isSubmitted);
        setIsSuccess(true);
        toast.success(response.message, {
          autoClose: 3000,
          onClose: () => (window.location.href = "/"),
        });
      } else {
        setIsSuccess(false);
        toast.error(response?.message, {
          autoClose: 3000,
        });

        return;
      }
    } catch (error) {
      setIsSuccess(false);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Đăng nhập không thành công!");
      }
    }
  };

  return (
    <>
      <div className={cx("login-form")}>
        <div
          className={cx(
            "login-reponsive",
            "text-center",
            "d-block",
            "d-xl-none"
          )}
        >
          <img
            src="/assets/images/LOGO.svg"
            alt="Mentoring"
            className={cx("image-login")}
          />
          <h2>Chào mừng đến với Mentoring</h2>
        </div>

        <div className={cx("title-form")}>
          <h2>Đăng nhập</h2>
        </div>
        <div className={cx("form-login")}>
          <form onSubmit={handleSubmit(handleSubmitLogin)}>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className={cx("form-group", "my-1")}>
              <label htmlFor="username" className="form-label fw-bold">
                Tên đăng nhập / Email
              </label>
              <input
                type="text"
                id="username"
                {...register("email")}
                className={`form-control form-control-lg ${
                  errors.email ? "border border-danger" : ""
                }`}
                placeholder="Nhập tên đăng nhập hoặc email"
              />
              {errors.email ? (
                <span className="text-danger">{errors.email.message}</span>
              ) : (
                <span className="opacity-0 invisible">not valid</span>
              )}
            </div>
            <div className="form-group my-1">
              <label htmlFor="password" className="form-label fw-bold">
                Mật khẩu
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`form-control form-control-lg ${
                    errors.password ? "border border-danger" : ""
                  }`}
                  maxLength={30}
                  {...register("password")}
                  placeholder="Nhập mật khẩu"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>
              </div>
              {errors.password ? (
                <span className="text-danger mb-2">
                  {errors.password.message}
                </span>
              ) : (
                <span className="opacity-0 invisible mb-2">not valid</span>
              )}
            </div>

            <div className={cx("login-orther")}>
              <Link to={"/auth/register"} className={cx("orther-item-login")}>
                <p>Đăng ký</p>
              </Link>
              <Link
                to={"/auth/forgot-password"}
                className={cx("orther-item-login")}
              >
                <p>Quên mật khẩu</p>
              </Link>
            </div>
            <button
              type={isSuccess ? "button" : "submit"}
              className={cx("btn-login")}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>
          <p className={cx("login-or-with")}>Hoặc với</p>
          <div className={cx("btn-orther-login")}>
            <button className={cx("google")}>
              <img
                src="/assets/images/google.svg"
                alt=""
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              Đăng nhập bằng Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
