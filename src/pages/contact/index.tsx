import { Helmet } from "react-helmet";

import classNames from "classnames/bind";
import styles from "./styles/contact.module.scss";

import { ContactTitle, FormContact } from "./components";

const cx = classNames.bind(styles);
const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Liên Hệ</title>
      </Helmet>

      <div className={cx("parents-contact")}>
        <div className="row">
          <div className={cx("contact-banner")}>Contact</div>
        </div>
        <div className={cx("row", "row-contact")}>
          <ContactTitle />

          <FormContact />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.312703761638!2d106.62899591345833!3d10.852814877457487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1741793268505!5m2!1svi!2s"
          width="100%"
          height="500"
          loading="lazy"
          className={cx("contact-map")}
        ></iframe>
      </div>
    </>
  );
};

export default ContactPage;
