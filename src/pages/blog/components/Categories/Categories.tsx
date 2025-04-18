import classNames from "classnames/bind";
import styles from "./styles/categories.module.scss";

const cx = classNames.bind(styles);

const Categories = () => {
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-6 col-lg-3">
          <div className={cx("category-card")}>
            <i className="icon">🌟</i>
            <h5>Phát triển cá nhân</h5>
            <p>Cải thiện bản thân mỗi ngày</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className={cx("category-card")}>
            <i className="icon">💬</i>
            <h5>Mentoring</h5>
            <p>Học hỏi từ chuyên gia</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className={cx("category-card")}>
            <i className="icon">📚</i>
            <h5>Học tập</h5>
            <p>Phương pháp hiệu quả</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className={cx("category-card")}>
            <i className="icon">💼</i>
            <h5>Sự nghiệp</h5>
            <p>Xây dựng tương lai</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
