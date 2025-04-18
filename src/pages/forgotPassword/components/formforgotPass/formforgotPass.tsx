import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  handleApiSendOTP,
  handleApiSendPassword,
  handleApiVerifyOTP,
} from "../../../../apis/auth";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authSchema } from "../../../../schemas";

import styles from "./styles/formforgotPass.module.scss";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type AuthFormValue = z.infer<typeof authSchema>;
const initialState: AuthFormValue = {
  email: "",
  otp: "",
  newPassword: "",
  confirmPassword: "",
};

const FormforgotPasssword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValue>({
    resolver: zodResolver(authSchema),
    mode: "onSubmit",
    defaultValues: initialState,
  });

  const handleSendemail = async () => {
    const email = getValues("email");
    if (!email) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    try {
      const response = await handleApiSendOTP({ email });
      console.log("API Response:", response);
      if (response?.status == 200) {
        // alert("OTP đã được gửi đến email của bạn!");
        toast.success(response.message, {
          autoClose: 3000,
        });

        setTimeout(() => {
          setStep(2);
        }, 3500);
      } else {
        toast.error(response?.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Lỗi xác minh email: ${error.message}`, {
          autoClose: 3000,
        });
      }
    }
  };

  const handleVerifyOTP = async () => {
    const email = getValues("email"); // Lấy email từ form
    const otp = getValues("otp"); // Lấy OTP từ form

    if (!email || !otp) {
      alert("Vui lòng nhập OTP hợp lệ!");
      return false;
    }

    try {
      const response = await handleApiVerifyOTP({ email, otp });
      if (response?.status === 200) {
        toast.success(response.message, {
          autoClose: 3000,
        });

        setTimeout(() => {
          setStep(3);
        }, 3500);
      } else {
        toast.error(response?.message, {
          autoClose: 3000,
        });
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Lỗi xác minh OTP: ${error.message}`, {
          autoClose: 3000,
        });
      }
    }
  };

  const handleSubmitResetPassword: SubmitHandler<AuthFormValue> = async (
    data
  ) => {
    try {
      const email = getValues("email"); // Lấy email từ form
      const payload = {
        email: email,
        otp: data.otp, // Mã OTP từ form
        newPassword: data.newPassword, // Mật khẩu mới từ form
      };

      console.log("Dữ liệu gửi lên API:", payload);
      const response = await handleApiSendPassword(payload);
      console.log("API Response:", response);

      if (response?.status === 200) {
        toast.success(response.message, {
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/auth/login");
        }, 3500);
      } else {
        toast.error(response?.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Lỗi đặt lại mật khẩu: ${error.message}`, {
          autoClose: 3000,
        });
      }
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await trigger("email");
      if (isValid) await handleSendemail();
    } else if (step === 2) {
      const isValid = await trigger("otp");
      if (isValid) {
        await handleVerifyOTP();
      }
    }
  };

  return (
    <>
      <div className={cx("register-form")}>
        <div
          className={cx(
            "register-reponsive",
            "text-center",
            "d-block",
            "d-xl-none"
          )}
        >
          <img
            src="/assets/images/LOGO.svg"
            alt="Mentoring"
            className={cx("image-register")}
          />
          <h2>Chào mừng đến với Mentoring</h2>
        </div>

        <div className={cx("title-form")}>
          <h2>Quên mật khẩu</h2>
        </div>
        <div className={cx("form-register")}>
          <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
            {step === 1 && (
              <>
                <div className="form-group my-1">
                  <label htmlFor="" className="form-label fw-bold fw-bold">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`form-control form-control-lg border border-2' ${errors.email ? "border-danger" : ""}`}
                    placeholder="Nhập email"
                  />

                  {/* {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg border border-gray-400 rounded"
                      value={digit}
                      onChange={(event) => handleChange(index, event)}
                    />
                  ))}
                  {errors.email ? (
                    <span className="text-danger">{errors.email.message}</span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )} */}
                </div>
                <div className={cx("forgot-password-email")}>
                  <Link
                    to="/auth/login"
                    className={cx("forgot-password-email-item")}
                  >
                    Quay lại
                  </Link>
                  <button
                    className={cx("forgot-password-email-item")}
                    type="button"
                    onClick={handleNextStep}
                  >
                    Tiếp tục
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group my-1">
                  <label htmlFor="otp" className="form-label fw-bold fw-bold">
                    OTP <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    {...register("otp")}
                    className="form-control form-control-lg border border-2"
                    placeholder="Nhập otp"
                  />
                  {errors.otp ? (
                    <span className="text-danger">{errors.otp.message}</span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className={cx("forgot-password-email")}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={cx("forgot-password-email-item")}
                  >
                    Quay lại
                  </button>
                  <button
                    className={cx("forgot-password-email-item")}
                    type="button"
                    onClick={handleNextStep}
                  >
                    Tiếp tục
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="form-group my-1">
                  <label htmlFor="otp" className="form-label fw-bold fw-bold">
                    Mật khẩu mới <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...register("newPassword")}
                    className="form-control form-control-lg border border-2"
                    placeholder="Nhập mật khẩu"
                  />
                  {errors.newPassword ? (
                    <span className="text-danger">
                      {errors.newPassword.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className="form-group my-1">
                  <label htmlFor="otp" className="form-label fw-bold fw-bold">
                    Nhập lại mật khẩu mới<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className="form-control form-control-lg border border-2"
                    placeholder="Nhập lại mật khẩu"
                  />
                  {errors.confirmPassword ? (
                    <span className="text-danger">
                      {errors.confirmPassword.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className={cx("forgot-password-email")}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={cx("forgot-password-email-item")}
                  >
                    Quay lại
                  </button>
                  <button
                    className={cx("forgot-password-email-item")}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Lưu"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default FormforgotPasssword;
