import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import styles from "./styles/jobCard.module.scss";

const JobCard = () => {
  const job = Array.from({ length: 5 });
  return (
    <>
      {job.map(() => {
        return (
          <div className={cx("job-card")}>
            <h6 className="fw-bold">Nhân Viên Viết Hồ Sơ Môi Trường</h6>
            <p>Công Ty TNHH Giải Pháp V...</p>
            <p>💰 10 - 15 triệu | 📍 TP.HCM</p>
            <small>⏳ Còn 1 ngày</small>
          </div>
        );
      })}
    </>
  );
};

export default JobCard;
