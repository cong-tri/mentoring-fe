import classNames from "classnames/bind";
import styles from "./styles/tags.module.scss";

const cx = classNames.bind(styles);

const Tags = () => {
  return (
    <>
      <div className={cx("tags")}>
        <h3>Tags</h3>
        <div className={cx("tag-tiems")}>
          <span>Phát triển</span>
          <span>Mentoring</span>
          <span>Học tập</span>
          <span>Sự nghiệp</span>
          <span>Kỹ năng</span>
        </div>
      </div>
    </>
  );
};

export default Tags;
