import classNames from "classnames/bind";
import { memo, useCallback, useState } from "react";
import styles from "../styles/bookingModal.module.scss";
import BookingForm from "./BookingForm";
import RegisterForm from "./RegisterForm";

const cx = classNames.bind(styles);

interface BookingMethodProps {
  isOpenModal: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpenModal, onClose }: BookingMethodProps) => {
  const [registered, setRegistered] = useState(false);

  const handleRegisterSuccess = useCallback(() => {
    setRegistered(true);
  }, []);

  const handleBookingSuccess = useCallback(() => {
    onClose();
  }, []);

  return (
    <div
      style={{ display: isOpenModal ? "flex" : "none" }}
      id="booking-modal"
      className={cx("modal")}
    >
      <div className={cx("modal-content")}>
        <div className={cx("modal-content_box")}>
          <span onClick={onClose} className={cx("close-btn")}>
            ×
          </span>
          <h2
            style={{
              marginBottom: registered ? "20px" : "0px",
            }}
            className={cx("modal-title")}
          >
            {registered ? "Đặt lịch tư vấn miễn phí" : "Đăng ký tư vấn"}
          </h2>
          <div className={cx("modal-body")}>
            {registered ? (
              <BookingForm onBookingSuccess={handleBookingSuccess} />
            ) : (
              <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookingModal);
