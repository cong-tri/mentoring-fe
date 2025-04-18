import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type FooterNavBar = {
  id: number;
  title: string;
  path?: string;
  children?: FooterNavBar[];
};

const listFooterTitle: FooterNavBar[] = [
  {
    id: 1,
    title: "THÔNG TIN",
    children: [
      {
        id: 1,
        title: "Về Chúng Tôi",
        path: "/about",
      },
      {
        id: 2,
        title: "Liên Hệ",
        path: "/contact",
      },
      {
        id: 3,
        title: "Tin Tức",
        path: "/blog",
      },
      {
        id: 4,
        title: "Sự Kiện",
        path: "/event",
      },
    ],
  },
  {
    id: 2,
    title: "CHƯƠNG TRÌNH",
    children: [
      {
        id: 1,
        title: "Mentor",
        path: "/mentor",
      },
      {
        id: 2,
        title: "Việc Làm",
        path: "/job",
      },
    ],
  },
  {
    id: 3,
    title: "CỘNG ĐỒNG",
    children: [
      {
        id: 1,
        title: "Diễn đàn",
        path: "#",
      },
      {
        id: 2,
        title: "Fanpage",
        path: "#",
      },
    ],
  },
  {
    id: 4,
    title: "SUPPORT",
    children: [
      {
        id: 1,
        title: "Privacy Policy",
        path: "#",
      },
      {
        id: 2,
        title: "Terms & Conditions",
        path: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={cx("")}>
      <div className="row align-items-center gx-0">
        <div className="col-12 col-xl-4 text-center text-xl-start">
          <img src="/assets/images/LOGO.svg" className="mx-auto" alt="Logo" />
        </div>
        <div className="col-12 d-none d-xl-block col-xl-8">
          <div className="row row-cols-1 row-cols-lg-4">
            {listFooterTitle.map((item) => {
              return (
                <div className="col" key={item.id}>
                  <h3>{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row gx-0">
        <div className="col-12 col-xl-4 ps-xl-2 text-center text-xl-start">
          <div className={cx("footer-info")}>
            <p className={cx("footer-info-company-name")}>
              TRUNG TÂM HUẤN LUYỆN <br className="d-block d-xl-none" /> KỸ NĂNG
              THẾ HỆ TRẺ
            </p>
            <p>Hotline: 0373 0404 87</p>
            <p>Email: mentoringvn@gmail.com</p>
            <p>
              Địa chỉ: 14 Lam Sơn, Phường 2, Quận Tân Bình,{" "}
              <br className="d-none d-xl-block d-xxl-none" /> Tp.HCM
            </p>
          </div>
        </div>
        <div className="d-none d-xl-block col-12 col-xl-8">
          <div className="row row-cols-1 row-cols-lg-4">
            {listFooterTitle.map((item) => {
              return (
                <div className="col" key={item.id}>
                  <ul>
                    {item.children?.map((itemChild) => {
                      return (
                        <li key={itemChild.id}>
                          <Link to={itemChild.path ? itemChild.path : "#"}>
                            {itemChild.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={cx("footer-bottom")}>
        <p>
          © Copyright 2025 Trung Tâm Huấn Luyện Kỹ Năng Thế Hệ Trẻ. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
