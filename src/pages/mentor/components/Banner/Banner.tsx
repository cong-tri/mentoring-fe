import classNames from "classnames/bind";
import styles from "./styles/banner.module.scss";

const cx = classNames.bind(styles);

const Banner = () => {
  return <div className={cx("mentor-banner")}>Mentor</div>;
};

export default Banner;
