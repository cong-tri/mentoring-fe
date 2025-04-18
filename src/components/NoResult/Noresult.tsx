import classNames from "classnames/bind";
import styles from "./Noresult.module.scss";
const cx = classNames.bind(styles);
const Noresult = () => {
  return (
    <>
      <div className={cx("container-noresult")}>
        <img
          className={cx("noresult-image")}
          src="/assets/images/noResult.svg"
          alt=""
        />
        <p>không tìm thấy dữ liệu</p>
      </div>
    </>
  );
};

export default Noresult;
