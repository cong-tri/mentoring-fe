import classNames from "classnames/bind";
import styles from "./styles/titleContact.module.scss";

const cx = classNames.bind(styles);
const titleContacts = [
  {
    id: 1,
    icon: "fa-solid fa-phone fs-4",
    info: "Hotline",
    SubT: "0373 0404 87",
  },
  {
    id: 2,
    icon: "fa-solid fa-envelope fs-4",
    info: "Email",
    SubT: "mentoringvn@gmail.com",
  },
  {
    id: 3,
    icon: "fa-solid fa-location-dot fs-4",
    info: "Địa chỉ",
    SubT: " Tòa nhà SaiGonTech Công viên phần mềm quang trung, Quận 12,Thành phố Hồ Chí Minh.",
  },
];
const ContactTitle = () => {
  return (
    <>
      <div className={cx("col-12", "col-contact-ipad", "col-lg-6")}>
        <div className={cx("title-contact")}>
          <div className="title-header-contact">
            <h1>Liên hệ với chúng tôi</h1>
            <p>
              Chúng tôi muốn lắng nghe ý kiến của bạn. Vui lòng gửi mọi yêu cầu
              hoặc thắc mắc cho chúng tôi, chúng tôi sẽ liên lạc với bạn sớm
              nhất có thể.
            </p>
          </div>
          <div className={cx("elementor")}>
            {titleContacts.map((item) => (
              <div className={cx("elementor-contact")} key={item.info}>
                <div className={cx("icon-contact")}>
                  <i className={item.icon}></i>
                </div>
                <div className={cx("object-content")}>
                  <h5 className={cx("contact-info", "m-0")}>{item.info}</h5>
                  <p>{item.SubT}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactTitle;
