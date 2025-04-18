import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/bookingForm.module.scss";
import { menteeBookingSchema } from "../../../schemas";
import { memo } from "react";

const cx = classNames.bind(styles);

interface BookingFormProps {
  onBookingSuccess: () => void;
}

const BookingForm = ({ onBookingSuccess }: BookingFormProps) => {
  const form = useForm<z.infer<typeof menteeBookingSchema>>({
    resolver: zodResolver(menteeBookingSchema),
    defaultValues: {
      selectedTime: "",
      message: "",
    },
  });

  const handleTimeSlotClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const time = e.currentTarget.dataset.time;
    const day = e.currentTarget.closest("tr")?.querySelector("td")?.textContent;
    if (time && day) {
      form.setValue("selectedTime", `${day} - ${time}`, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = () => {
    alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
    onBookingSuccess();
  };

  return (
    <>
      <div className={cx("availability-section")}>
        <h3>Lịch trống</h3>
        <div className={cx("calendar-container")}>
          <table className={cx("availability-table")}>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Giờ khả dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thứ Hai, 10/03/2025</td>
                <td>
                  <button
                    className={cx("time-slot")}
                    data-time="09:00"
                    onClick={handleTimeSlotClick}
                  >
                    09:00
                  </button>
                  <button
                    className={cx("time-slot")}
                    data-time="14:00"
                    onClick={handleTimeSlotClick}
                  >
                    14:00
                  </button>
                </td>
              </tr>
              <tr>
                <td>Thứ Ba, 11/03/2025</td>
                <td>
                  <button
                    className={cx("time-slot")}
                    data-time="10:00"
                    onClick={handleTimeSlotClick}
                  >
                    10:00
                  </button>
                  <button
                    className={cx("time-slot")}
                    data-time="15:00"
                    onClick={handleTimeSlotClick}
                  >
                    15:00
                  </button>
                </td>
              </tr>
              <tr>
                <td>Thứ Tư, 12/03/2025</td>
                <td>
                  <button
                    className={cx("time-slot")}
                    data-time="11:00"
                    onClick={handleTimeSlotClick}
                  >
                    11:00
                  </button>
                  <button
                    className={cx("time-slot")}
                    data-time="16:00"
                    onClick={handleTimeSlotClick}
                  >
                    16:00
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cx("booking-form")}
      >
        <h3>Thông tin đặt lịch</h3>
        <div className={cx("form-group")}>
          <label htmlFor="selected-time">Thời gian đã chọn</label>
          <input
            id="selected-time"
            {...form.register("selectedTime")}
            readOnly
            placeholder="Chọn giờ ở trên"
            className={cx({
              "input-error": form.formState.errors.selectedTime,
            })}
          />
          {form.formState.errors.selectedTime && (
            <span className={cx("error")}>
              {form.formState.errors.selectedTime.message}
            </span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="message">Ghi chú (nếu có)</label>
          <textarea
            id="message"
            {...form.register("message")}
            placeholder="Nhập ghi chú (tùy chọn)"
          />
        </div>
        <button
          type="submit"
          className={cx("submit-btn")}
          disabled={form.formState.isSubmitting}
        >
          Xác nhận đặt lịch
        </button>
      </form>
    </>
  );
};

export default memo(BookingForm);
