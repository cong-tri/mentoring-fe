import classNames from "classnames/bind";
import styles from "../styles/menteeContent.module.scss";
import {
  MenteeExpsMockData,
  MenteeGalleryMockData,
  MenteeStatsMockData,
} from "../data/menteeProfile";
import MenteeContact from "./MenteeContact";

const cx = classNames.bind(styles);

const MenteeContent = () => {
  return (
    <div className={cx("profile-content")}>
      <main className={cx("main-content")}>
        <div className={cx("profile-image-container")}>
          <img
            src="https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif"
            alt="Mentee Avatar"
            className={cx("profile-image")}
          />
        </div>
        <h2 className={cx("section-title")}>Giới thiệu</h2>
        <p>
          Xin chào! Tôi là Nguyen Van A, một mentee đang tìm kiếm cơ hội phát
          triển kỹ năng và định hướng sự nghiệp trong lĩnh vực công nghệ. Tôi
          mong muốn học hỏi từ những người đi trước để hoàn thiện bản thân và
          đạt được các mục tiêu nghề nghiệp.
        </p>

        <div className={cx("stats-container")}>
          {MenteeStatsMockData.map((stat, index) => (
            <div key={index} className={cx("stat-item")}>
              <div className={cx("stat-number")}>{stat.number}</div>
              <div className={cx("stat-title")}>{stat.title}</div>
            </div>
          ))}
        </div>

        <h2 className={cx("section-title")}>Kinh nghiệm cá nhân</h2>
        {MenteeExpsMockData.map((exp, index) => (
          <div key={index} className={cx("experience-item")}>
            <div className={cx("experience-title")}>{exp.title}</div>
            <div className={cx("experience-company")}>{exp.company}</div>
            <div className={cx("experience-date")}>{exp.date}</div>
            <p>{exp.description}</p>
          </div>
        ))}

        <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
        <div className={cx("gallery-container")}>
          {MenteeGalleryMockData.map((image, index) => (
            <div key={index} className={cx("gallery-item")}>
              <img src={image.src} alt={image.alt} />
              <div className={cx("gallery-overlay")}>
                <div className={cx("gallery-info")}>{image.label}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MenteeContact />
    </div>
  );
};

export default MenteeContent;
