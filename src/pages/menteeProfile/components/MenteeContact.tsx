import classNames from "classnames/bind";
import styles from "../styles/menteeContact.module.scss";

const cx = classNames.bind(styles);

import {
  MenteeContactMockData,
  MenteeEducationsMockData,
} from "../data/menteeProfile";

const MenteeContact = () => {
  return (
    <aside className={cx("sidebar")}>
      <div className={cx("sidebar-section")}>
        <h2 className={cx("section-title")}>Liên hệ</h2>
        {MenteeContactMockData.map((contact, index) => (
          <div key={index} className={cx("contact-item")}>
            <div className={cx("contact-icon")}>
              <i className={contact.icon}></i>
            </div>
            <div>{contact.text}</div>
          </div>
        ))}
      </div>

      <div className={cx("sidebar-section")}>
        <h2 className={cx("section-title")}>Học vấn</h2>
        {MenteeEducationsMockData.map((edu, index) => (
          <div key={index} className={cx("skill-card")}>
            <div className={cx("skill-title")}>{edu.title}</div>
            <div className={cx("skill-desc")}>{edu.desc}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MenteeContact;
