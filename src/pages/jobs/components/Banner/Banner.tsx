import classNames from "classnames/bind";
import styles from "./styles/banner.module.scss";

const cx = classNames.bind(styles);

const Banner = () => {
  return <div className={cx("jobs_banner")}>Jobs</div>;
};

export default Banner;
