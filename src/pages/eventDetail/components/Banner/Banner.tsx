import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles/banner.module.scss";
import { handleFormatDateTime } from "../../../../lib";

const cx = classNames.bind(styles);

type ContentBanner = {
  title: string | undefined;
  subTitle: string | undefined;
  endTime: string | undefined;
  startTime: string | undefined;
  description: string | undefined;
};

const Banner = ({ bannerContent }: { bannerContent: ContentBanner }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-03-31 12:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown("Sự kiện đã bắt đầu!");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cx("banner")}>
      <div className={cx("overlay")} />
      <div className={cx("content")}>
        <h4 className="fw-bold">SỰ KIỆN</h4>
        <h2 className="fw-bold">{bannerContent.title}</h2>
        <p>{bannerContent.subTitle}</p>
        <p>
          <span style={{ color: "#f79c4b" }}>{bannerContent.description}</span>
        </p>
        <div className={cx("event-date")}>
          <div className={cx("event-date-item")}>
            <p> Ngày bắt đầu:</p>
            <p className="fw-bold">
              {handleFormatDateTime(bannerContent.startTime ?? "")}
            </p>
          </div>
          <div className={cx("event-date-item")}>
            <p> Ngày kết thúc:</p>
            <p className="fw-bold">
              {handleFormatDateTime(bannerContent.endTime ?? "")}
            </p>
          </div>
        </div>
        <div className={cx("countdown")}>{countdown}</div>
        <a href="#" className="btn btn-primary mt-3">
          Đăng ký tham gia
        </a>
      </div>
    </div>
  );
};

export default Banner;
