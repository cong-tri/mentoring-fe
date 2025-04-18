import classNames from "classnames/bind";
import styles from "./styles/navbar.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

type NavBar = {
  id: number;
  href: string;
  title: string;
};
type NavbarProps = {
  activeId: string;
};
const navBars: NavBar[] = [
  // {
  //   id: 1,
  //   href: "#home",
  //   title: "Home",
  // },
  {
    id: 2,
    href: "#dien-gia",
    title: "Diễn giả",
  },
  {
    id: 3,
    href: "#muc-tieu",
    title: "Mục tiêu",
  },
  {
    id: 4,
    href: "#chi-tiet",
    title: "Chi tiết",
  },
  {
    id: 5,
    href: "#map",
    title: "Địa điểm",
  },
];

const Navbar = ({ activeId }: NavbarProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.clientHeight);
    }

    const handleResize = () => {
      if (header) setHeaderHeight(header.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={cx("navbar", "navbar-expand", "custom-navbar")}
        style={{ top: `${headerHeight}px` }}
      >
        <div className="container-fluid text-center">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {navBars.map((item) => {
                return (
                  <>
                    <li className="nav-item" key={item.id}>
                      <a
                        className={`nav-link ${item.href === activeId ? " fw-semibold text-primary" : ""}`}
                        href={item.href}
                      >
                        {item.title}
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
