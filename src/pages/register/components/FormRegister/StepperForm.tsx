import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useCookieCustom } from "../../../../hooks";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormValue,
  registerFormSchema,
} from "../../../../schemas/register";

import styles from "./styles/formRegister.module.scss";
import classNames from "classnames/bind";
import OtpInput from "./OTPVerify";
import handleApiRegister, {
  MENTORING_USER_VERIFY_EMAIL_TOKEN,
} from "../../../../apis/register";

const cx = classNames.bind(styles);

const StepperForm: React.FC = () => {
  // function useAuth custom hook for authenticate
  const { handleSendOTP, handleVerifyEmail } = useAuth();

  const { getCookieCustom, setCookieCustom, removeCookieCustom } =
    useCookieCustom([MENTORING_USER_VERIFY_EMAIL_TOKEN]);
  const verifyToken: string = getCookieCustom(
    MENTORING_USER_VERIFY_EMAIL_TOKEN
  );

  // function useForm for handle form
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    mode: "onSubmit",
  });

  // for value error validate
  const [errorMessage, setErrorMessage] = useState("");

  // for value check show pasword
  const [showPassword, setShowPassword] = useState(false);

  // for value next step form
  const [step, setStep] = useState(1);

  // for check valid send check mail when role !== 'Guest'
  const [isCheckMail, setIsCheckMail] = useState<boolean>(false);

  // for check valid send mail check otp when role !== 'Guest'
  const [isCheckOTP, setIsCheckOTP] = useState<boolean>(
    verifyToken !== undefined && verifyToken !== "" ? false : true
  );

  // for check valid register success to disable button submit
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (verifyToken && verifyToken !== "") {
      setIsCheckOTP(false);
    }
  }, [verifyToken]);

  // function useNavigate for navigate to 1 path or router
  const navigate = useNavigate();

  // function handle submit form register
  const handleSubmitRegister: SubmitHandler<RegisterFormValue> = async (
    data
  ) => {
    try {
      setErrorMessage("");

      const { confirmPassword, otp, ...payload } = data;

      // check confirmPassword vs password
      if (confirmPassword !== payload.password) {
        setErrorMessage("Mật khẩu không khớp, vui lòng thử lại.");
        return;
      }

      if (payload.role !== "Guest" && (!otp || otp === "")) {
        setErrorMessage("Vui lòng nhập mã OTP để xác thực email.");
        return;
      }

      const response = await handleApiRegister(payload);

      if (response?.success && response.status === 201) {
        removeCookieCustom(MENTORING_USER_VERIFY_EMAIL_TOKEN, { path: "/" });
        setIsSuccess(true);

        toast.success("Đăng ký tài khoản thành công, vui lòng đăng nhập!", {
          autoClose: 3000,
          onClose: () => navigate("/auth/login"),
        });
      } else {
        setIsSuccess(false);
        toast.error(response?.message, {
          autoClose: 3000,
        });
        return;
      }
    } catch {
      setIsSuccess(false);
      setErrorMessage("Lỗi không xác định, vui lòng thử lại.");
      return;
    }
  };

  // function handle next step form
  const handleNextStep = async () => {
    let isValid = false;
    const role = getValues("role");

    if (step === 1) {
      isValid = await trigger(["emailUser", "password", "confirmPassword"]);
    } else if (step === 2) {
      isValid = await trigger([
        "lastName",
        "firstName",
        "salutation",
        "phoneNumber",
        "dob",
        "gender",
        "role",
      ]);

      if (isValid) {
        if (role === "Guest") {
          setStep(2);
          setIsCheckMail(false);
          handleSubmit(handleSubmitRegister)();
          return;
        } else {
          setIsCheckMail(true);
          if (verifyToken && verifyToken !== "") {
            console.log("đã có token >>");
          }
          handleSendOTPToVerify();
        }
      }
    } else if (step === 3) {
      isValid = await trigger(["otp"]);
      const otp: string = getValues("otp") ?? "";

      if (isValid) {
        if (verifyToken === "") {
          setIsCheckOTP(true);
          await handleVerifyOTP(otp);
        } else {
          toast.error("Email của bạn đã được xác minh", {
            autoClose: 2500,
            onClose: () => setIsCheckOTP(false),
          });
        }
      }
    } else if (step === 4) {
      if (verifyToken === "") {
        setStep(3);
      }

      isValid = await trigger([
        "uIDRef",
        "uCFTs",
        "iCBKs",
        "avatar",
        "cvFile",
        "verificationToken",
      ]);
    }

    if (isValid) setStep((prev) => prev + 1);
  };

  // function handle send otp to verify email
  const handleSendOTPToVerify = async () => {
    const email = getValues("emailUser");

    try {
      const response = await handleSendOTP({ email });

      if (response?.status === 200 && response.success) {
        toast.success(`OTP đã được gửi tới email: ${email}`, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message ??
            "Đã xảy ra lỗi khi xác thực email hoặc email không đúng.",
          {
            autoClose: 2000,
            onClose: () => setStep(2),
          }
        );
      }
    }
  };

  // function handle verify otp
  const handleVerifyOTP = async (otp: string) => {
    const email = getValues("emailUser");

    try {
      const response = await handleVerifyEmail({ email, otp });
      if (response?.status === 200 && response.success && response.token) {
        setCookieCustom(MENTORING_USER_VERIFY_EMAIL_TOKEN, response.token);
        toast.success("Xác thực email với otp thành công!", {
          autoClose: 2500,
          onClose: () => {
            setIsCheckOTP(true);
            setStep(4);
          },
        });
      } else {
        toast.error(response?.message, {
          autoClose: 2500,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message ??
            "Đã xảy ra lỗi khi xác thực otp hoặc otp không đúng.",
          {
            autoClose: 2000,
            onClose: () => setStep(3),
          }
        );
      }
    }
  };

  // function handle resend otp
  const handleResendOTP = () => {
    const email = getValues("emailUser");
    console.log("email: ", email);
  };

  // function handle on change role
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "Guest") {
      setIsCheckMail(false);
    } else setIsCheckMail(true);
  };

  return (
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

      <div className={cx("title-form")}>{step === 1 && <h2>Đăng ký</h2>}</div>
      <div className={`${cx("form-register")} mt-xl-4`}>
        <form onSubmit={handleSubmit(handleSubmitRegister)}>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {step === 1 && (
            <>
              <div className="form-group my-1">
                <label
                  htmlFor="emailUser"
                  className="form-label fw-bold fw-bold"
                >
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="emailUser"
                  {...register("emailUser")}
                  className={`form-control form-control-lg border border-2 ${errors.emailUser ? "border-danger" : ""}`}
                  placeholder="Nhập email"
                />
                {errors.emailUser ? (
                  <span className="text-danger">
                    {errors.emailUser.message}
                  </span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className="form-group my-1">
                <label
                  htmlFor="password"
                  className="form-label fw-bold fw-bold"
                >
                  Mật khẩu <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    // type="password"
                    id="password"
                    {...register("password")}
                    className={`form-control form-control-lg border border-2 ${errors.password ? "border-danger" : ""}`}
                    minLength={8}
                    maxLength={30}
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
                  <span className="text-danger">{errors.password.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className="form-group my-1">
                <label
                  htmlFor="password"
                  className="form-label fw-bold fw-bold"
                >
                  Nhập lại mật khẩu <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    // type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className={`form-control form-control-lg border border-2 ${errors.confirmPassword ? "border-danger" : ""}`}
                    minLength={8}
                    maxLength={30}
                    placeholder="Nhập lại mật khẩu"
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
                {errors.confirmPassword ? (
                  <span className="text-danger">
                    {errors.confirmPassword.message}
                  </span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className={cx("back-next")}>
                <Link to={"/auth/login"}>
                  <button type="button" className={cx("back-login")}>
                    Đăng nhập
                  </button>
                </Link>
                <button
                  type="button"
                  className={cx("next-login")}
                  onClick={handleNextStep}
                >
                  Tiếp
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="row row-cols-2 my-1">
                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="lastName">
                    Họ <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    className={`form-control form-control-lg border border-2 ${errors.lastName ? "border-danger" : ""}`}
                    {...register("lastName")}
                    type="text"
                    id="lastName"
                  />
                  {errors.lastName ? (
                    <span className="text-danger">
                      {errors.lastName.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="firstName">
                    Tên <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    className={`form-control form-control-lg border border-2 ${errors.firstName ? "border-danger" : ""}`}
                    {...register("firstName")}
                    type="text"
                    id="firstName"
                  />
                  {errors.firstName ? (
                    <span className="text-danger">
                      {errors.firstName.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>
              </div>

              <div className="row row-cols-2 my-1">
                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="salutation">
                    Danh xưng <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control form-control-lg border border-2 ${errors.salutation ? "border-danger" : ""}`}
                    {...register("salutation")}
                    id="salutation"
                  >
                    <option value="">Chọn danh xưng</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="TS.">TS.</option>
                    <option value="PGS. TS">PGS. TS</option>
                    <option value="ThS.">ThS.</option>
                  </select>
                  {errors.salutation ? (
                    <span className="text-danger">
                      {errors.salutation.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="gender">
                    Giới tính <span className="text-danger fw-bold">*</span>
                  </label>
                  <select
                    {...register("gender", { valueAsNumber: true })}
                    className={`form-control form-control-lg border border-2 ${errors.gender ? "border-danger" : ""}`}
                    id="gender"
                  >
                    <option value={0}>Nữ</option>
                    <option value={1} selected>
                      Nam
                    </option>
                  </select>
                  {errors.gender ? (
                    <span className="text-danger">{errors.gender.message}</span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>
              </div>

              <div className="row row-cols-2 my-1">
                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="dob">
                    Ngày sinh
                  </label>
                  <input
                    {...register("dob")}
                    className="form-control form-control-lg border border-2"
                    type="date"
                    id="dob"
                  />
                  {errors.dob ? (
                    <span className="text-danger">{errors.dob.message}</span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="phoneNumber">
                    Số điện thoại <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("phoneNumber")}
                    className={`form-control form-control-lg border border-2 ${errors.phoneNumber ? "border-danger" : ""}`}
                    type="tel"
                    maxLength={15}
                    id="phoneNumber"
                  />
                  {errors.phoneNumber ? (
                    <span className="text-danger">
                      {errors.phoneNumber.message}
                    </span>
                  ) : (
                    <span className="opacity-0 invisible">not valid</span>
                  )}
                </div>
              </div>

              <div className="form-group my-3">
                <label htmlFor="role" className="form-label fw-bold">
                  Bạn muốn thành vai trò nào?{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  {...register("role", { value: "Guest" })}
                  className="form-control form-control-lg border border-2"
                  id="role"
                  onChange={handleRoleChange}
                  defaultValue={"Guest"}
                >
                  <option value={"Guest"}>Guest</option>
                  <option value={"Mentee"}>Mentee</option>
                  <option value={"Mentor"}>Mentor</option>
                </select>
              </div>

              <div className={cx("back-next")}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={cx("back-step-one")}
                >
                  Quay lại
                </button>

                {isCheckMail ? (
                  <>
                    <button
                      type="button"
                      className={`${cx("next-login")} ms-auto`}
                      onClick={handleNextStep}
                    >
                      Xác nhận email để tiếp tục
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type={isSuccess ? "button" : "submit"}
                      className={`${cx("next-login")} ms-auto`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <OtpInput
                  onVerify={handleVerifyOTP}
                  onResendOTP={handleResendOTP}
                  email={getValues("emailUser")}
                  getValues={getValues}
                  setValue={setValue}
                  error={errors.otp?.message}
                />
              </div>

              <div className={cx("back-next")}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={cx("back-step-one")}
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  className={cx("next-login", "ms-auto")}
                  onClick={handleNextStep}
                  disabled={!isCheckOTP}
                >
                  Tiếp
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="form-group">
                <input
                  type="hidden"
                  id="verificationToken"
                  {...register("verificationToken")}
                  value={getCookieCustom(MENTORING_USER_VERIFY_EMAIL_TOKEN)}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="uIDRef">
                  Mã CCCD <span className="text-danger">*</span>
                </label>
                <input
                  {...register("uIDRef")}
                  id="uIDRef"
                  placeholder="Nhập mã CCCD"
                  className={`form-control form-control-lg border border-2 ${errors.uIDRef ? "border-danger" : ""}`}
                />
                {errors.uIDRef ? (
                  <span className="text-danger">{errors.uIDRef.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>
              <div className="form-group my-1">
                <label htmlFor="avatar">
                  Ảnh đại diện <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  {...register("avatar")}
                  id="avatar"
                  accept="image/*"
                  className={`form-control form-control-lg border border-2 ${errors.avatar ? "border-danger" : ""}`}
                />
                {errors.avatar ? (
                  <span className="text-danger">{errors.avatar.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className="form-group my-1">
                <label htmlFor="cvFile">
                  CV <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  {...register("cvFile")}
                  id="cvFile"
                  accept=".pdf"
                  className={`form-control form-control-lg border border-2 ${errors.cvFile ? "border-danger" : ""}`}
                />
                {errors.cvFile ? (
                  <span className="text-danger">{errors.cvFile.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className="form-group my-1">
                <label htmlFor="uCFTs">
                  Ảnh CCCD mặt trước <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  {...register("uCFTs")}
                  id="uCFTs"
                  accept="image/png, image/jpeg"
                  className={`form-control form-control-lg border border-2 ${errors.uCFTs ? "border-danger" : ""}`}
                />
                {errors.uCFTs ? (
                  <span className="text-danger">{errors.uCFTs.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className="form-group my-1">
                <label htmlFor="iCBKs">
                  Ảnh CCCD mặt sau <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  {...register("iCBKs")}
                  id="iCBKs"
                  accept="image/png, image/jpeg"
                  className={`form-control form-control-lg border border-2 ${errors.iCBKs ? "border-danger" : ""}`}
                />
                {errors.iCBKs ? (
                  <span className="text-danger">{errors.iCBKs.message}</span>
                ) : (
                  <span className="opacity-0 invisible">not valid</span>
                )}
              </div>

              <div className={cx("back-next")}>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={cx("back-step-one")}
                >
                  Quay lại
                </button>
                <button
                  className={cx("next-login", "ms-auto")}
                  type={isSuccess ? "button" : "submit"}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default StepperForm;
