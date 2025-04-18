import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./styles/popularBlogs.module.scss";

const cx = classNames.bind(styles);

const PopularBlogs = () => {
  return (
    <>
      <div className={cx("popular-posts")}>
        <h3 className={cx("title")}>Bài viết phổ biến</h3>
        <div className={cx("post")}>
          <Link to="/blog/details/:slug">
            <img
              src="https://img.freepik.com/free-vector/mobile-marketing-isometric-style_23-2148896785.jpg?ga=GA1.1.1099950878.1741455431&semt=ais_hybrid"
              alt="Bài viết 1"
            />
          </Link>
          <div className={cx("post-main")}>
            <Link to="/blog/details/:slug" className={cx("popular-title")}>
              <h6 className="mb-0">10 mẹo tăng năng suất</h6>
            </Link>
            <p className={cx("date")}>25/02/2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularBlogs;
