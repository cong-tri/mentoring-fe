import { useState } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles/upgrade.module.scss";
import {
  handleApiUpgrade,
  handleSendMail,
  handleVerifyActivationOtp,
} from "../../apis/upgrade";
import { upgradeSchema, UpgradeFormData } from "../../schemas/upgrade";

const cx = classNames.bind(styles);

const Upgrade = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<UpgradeFormData>({
    resolver: zodResolver(upgradeSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UpgradeFormData) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("requestType", data.requestType);
    formData.append("uIDRef", data.uIDRef);
    formData.append("avatar", data.avatar[0]);
    if (data.cvFile?.[0]) formData.append("cvFile", data.cvFile[0]);
    formData.append("uCFTs", data.uCFTs[0]);
    formData.append("iCBKs", data.iCBKs[0]);
    if (jwtToken) formData.append("jwtToken", jwtToken);

    const sendMailResponse = await handleSendMail();

    if (sendMailResponse?.isOpenModal) {
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    if (sendMailResponse?.success) {
      setMessage("OTP đã được gửi đến email của bạn!");
      setIsSuccessModalOpen(true);
      setIsModalOpen(true);
    } else {
      console.log("Send OTP Status: ", sendMailResponse);
      setMessage(
        sendMailResponse?.response?.data?.error ||
          sendMailResponse?.response?.data?.message ||
          sendMailResponse?.message ||
          "Có lỗi khi gửi OTP"
      );
      setIsErrorModalOpen(true);
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const verifyResponse = await handleVerifyActivationOtp(otp);
    if (verifyResponse?.success && verifyResponse.token) {
      setJwtToken(verifyResponse.token);
      setIsModalOpen(false);

      const data = getValues();
      data.jwtToken = verifyResponse.token;

      const upgradeResponse = await handleApiUpgrade(data);
      if (upgradeResponse?.status === 200) {
        setMessage("Yêu cầu nâng cấp đã được gửi thành công!");
        setIsSuccessModalOpen(true);
      } else {
        setMessage(
          upgradeResponse?.message || "Có lỗi khi gửi yêu cầu nâng cấp"
        );
        setIsErrorModalOpen(true);
      }
    } else {
      setMessage(verifyResponse?.message || "OTP không hợp lệ");
      setIsErrorModalOpen(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={cx("upgrade-container")}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("upgrade-form")}>
        <h2 className={cx("title")}>Nâng cấp tài khoản</h2>

        <div className={cx("form-group")}>
          <label htmlFor="requestType">Loại yêu cầu nâng cấp *</label>
          <select
            {...register("requestType")}
            id="requestType"
            className={cx({ "input-error": errors.requestType })}
          >
            <option value="">Chọn loại yêu cầu</option>
            <option value="Mentee">Mentee</option>
            <option value="Mentor">Mentor</option>
          </select>
          {errors.requestType && (
            <span className={cx("error")}>{errors.requestType.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="uIDRef">Mã CCCD *</label>
          <input
            {...register("uIDRef")}
            id="uIDRef"
            placeholder="Nhập mã CCCD"
            className={cx({ "input-error": errors.uIDRef })}
          />
          {errors.uIDRef && (
            <span className={cx("error")}>{errors.uIDRef.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="avatar">Ảnh đại diện *</label>
          <input
            type="file"
            {...register("avatar")}
            id="avatar"
            accept="image/*"
            className={cx({ "input-error": errors.avatar })}
          />
          {errors.avatar && (
            <span className={cx("error")}>{errors.avatar.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="cvFile">CV</label>
          <input
            type="file"
            {...register("cvFile")}
            id="cvFile"
            accept=".pdf"
            className={cx({ "input-error": errors.cvFile })}
          />
          {errors.cvFile && (
            <span className={cx("error")}>{errors.cvFile.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="uCFTs">Ảnh CCCD mặt trước *</label>
          <input
            type="file"
            {...register("uCFTs")}
            id="uCFTs"
            accept="image/png, image/jpeg"
            className={cx({ "input-error": errors.uCFTs })}
          />
          {errors.uCFTs && (
            <span className={cx("error")}>{errors.uCFTs.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="iCBKs">Ảnh CCCD mặt sau *</label>
          <input
            type="file"
            {...register("iCBKs")}
            id="iCBKs"
            accept="image/png, image/jpeg"
            className={cx({ "input-error": errors.iCBKs })}
          />
          {errors.iCBKs && (
            <span className={cx("error")}>{errors.iCBKs.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={cx("submit-btn")}
          disabled={isSubmitting || isLoading}
        >
          {isLoading
            ? "Đang xử lý..."
            : isSubmitting
              ? "Đang gửi..."
              : "Gửi yêu cầu"}
        </button>
      </form>

      {/* Modal OTP */}
      {isModalOpen && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <h3 className={cx("modal-title")}>Xác thực OTP</h3>
            <p>Nhập mã OTP đã được gửi đến email của bạn</p>
            <form onSubmit={handleOtpSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập OTP"
                className={cx("otp-input")}
                disabled={isLoading}
              />
              <div className={cx("modal-buttons")}>
                <button
                  type="submit"
                  className={cx("modal-btn", "confirm")}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xác thực..." : "Xác nhận"}
                </button>
                <button
                  type="button"
                  className={cx("modal-btn", "cancel")}
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {isErrorModalOpen && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <h3 className={cx("modal-title", "error-title")}>Lỗi</h3>
            <p>{message}</p>
            <div className={cx("modal-buttons")}>
              <button
                type="button"
                className={cx("modal-btn", "confirm")}
                onClick={() => setIsErrorModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {isSuccessModalOpen && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <h3 className={cx("modal-title", "success-title")}>Thành công</h3>
            <p>{message}</p>
            <div className={cx("modal-buttons")}>
              <button
                type="button"
                className={cx("modal-btn", "confirm")}
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upgrade;
