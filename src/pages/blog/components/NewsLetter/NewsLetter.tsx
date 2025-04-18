import classNames from "classnames/bind";
import styles from "./styles/newsLetter.module.scss";

const cx = classNames.bind(styles);

const NewLetter = () => {
  return (
    <>
      <div className={cx("newsletter")}>
        <h3>Đăng ký nhận bài viết mới</h3>
        <p>
          Cập nhật những bài viết mới nhất và thông tin về các chương trình
          mentoring.
        </p>
        <form className={cx("newsletter-form")}>
          <input
            type="email"
            placeholder="Email của bạn"
            className={cx("newsletter-input")}
            required
          />
          <button type="submit" className={cx("newsletter-button")}>
            Đăng ký
          </button>
        </form>
      </div>
    </>
  );
};

export default NewLetter;
