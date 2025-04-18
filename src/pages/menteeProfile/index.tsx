import classNames from "classnames/bind";
import styles from "./styles/menteeProfile.module.scss";
import MenteeContent from "./components/MenteeContent";

const cx = classNames.bind(styles);

const MenteeProfilePage = () => {
  return (
    <div className={cx("container")}>
      <header className={cx("profile-header")}>
        <h1>Nguyễn Văn A</h1>
        <p>Mentee - Đam mê phát triển bản thân & sự nghiệp</p>
      </header>

      <MenteeContent />
    </div>
  );
};

export default MenteeProfilePage;
