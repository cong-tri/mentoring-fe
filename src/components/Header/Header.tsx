import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { useAuth } from "../../hooks/auth";
import { handleAPIGetMenus } from "../../apis/admin";
import { Menu } from "../../types";
import Cookies from "universal-cookie";

const cl = classNames.bind(styles);
const cookies = new Cookies();

const userInfo = cookies.get("MENTORING_USER_INFO");

type TOOL_BOX_TYPE = {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  hidden?: boolean;
};

const TOOL_BOX: TOOL_BOX_TYPE[] = [
  {
    id: "profile",
    title: "Hồ sơ Mentor",
    icon: <i className="fa-solid fa-user" />,
    href: "/profile/mentor",
    hidden: !userInfo?.roles?.includes("Mentor"),
  },
  {
    id: "profile",
    title: "Hồ sơ Mentee",
    icon: <i className="fa-solid fa-user" />,
    href: "/profile/mentee",
    hidden: !userInfo?.roles?.includes("Mentee"),
  },
  {
    id: "upgrade",
    title: "Nâng cấp",
    icon: <i className="fa-solid fa-arrow-up" />,
    href: "/upgrade",
    hidden: userInfo?.roles?.includes("Mentor"),
  },
  {
    id: "settings",
    title: "Cài đặt",
    icon: <i className="fa-solid fa-gear" />,
    href: "/settings",
  },
  {
    id: "logout",
    title: "Đăng xuất",
    icon: <i className="fa-solid fa-sign-out-alt" />,
    href: "/logout",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menus, setMenus] = useState<Menu[]>();
  const [isOffcanvasDropdownOpen, setIsOffcanvasDropdownOpen] = useState(false);
  const [isProfileToolboxOpen, setIsProfileToolboxOpen] = useState(false);
  const { getToken, handleLogout } = useAuth();
  const location = useLocation();
  const token = getToken();
  const hasFetchedMenus = useRef(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleOffcanvasDropdown = () =>
    setIsOffcanvasDropdownOpen(!isOffcanvasDropdownOpen);
  const toggleProfileToolbox = () =>
    setIsProfileToolboxOpen(!isProfileToolboxOpen);

  useEffect(() => {
    const fetchMenus = async () => {
      if (hasFetchedMenus.current) return;
      hasFetchedMenus.current = true;
      try {
        const responseData = await handleAPIGetMenus();
        if (responseData?.code === 200 && responseData.success) {
          setMenus(
            [...(responseData.data ?? [])].sort(
              (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };
    fetchMenus();
  }, []);

  return (
    <header className={cl("header")}>
      <Link to="/" className={cl("logo-container")}>
        <img src="/assets/images/LOGO.svg" className={cl("logo")} alt="Logo" />
      </Link>

      <nav className={cl("nav-links")}>
        {menus && menus.length > 0 ? (
          menus.map((item) => (
            <div key={item.meN_ID} className={cl("nav-item")}>
              {item.children && item.children.length > 0 ? (
                <div className={cl("dropdown")}>
                  <button className={cl("dropdown-toggle")}>
                    {item.title}
                  </button>
                  <ul className={cl("dropdown-menu")}>
                    {item.children.map((child) => (
                      <li key={child.meN_ID}>
                        <Link to={child.url} className={cl("dropdown-item")}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.url}
                  className={cl("nav-link", {
                    active: location.pathname.includes(item.url),
                  })}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </nav>

      <div className={cl("auth-section")}>
        {token ? (
          <div className={cl("profile-container")}>
            <button className={cl("auth-btn")} onClick={toggleProfileToolbox}>
              <i className="fa-solid fa-user-tie" />
              <span className="ms-2">Xin chào {userInfo?.name}</span>
            </button>
            <ul
              className={cl("profile-toolbox", { show: isProfileToolboxOpen })}
            >
              {TOOL_BOX.map((toolbox, index) => {
                return (
                  <>
                    {toolbox.id === "logout" ? (
                      <li key={index}>
                        <Link
                          to={"#"}
                          type="button"
                          onClick={() => handleLogout()}
                        >
                          {toolbox.icon} {toolbox.title}
                        </Link>
                      </li>
                    ) : (
                      <>
                        {!toolbox.hidden && (
                          <li key={index}>
                            <Link
                              to={toolbox.href}
                              onClick={toggleProfileToolbox}
                            >
                              {toolbox.icon} {toolbox.title}
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        ) : (
          <button className={cl("auth-btn")}>
            <Link to="/auth/login" className={cl("auth-link")}>
              Đăng nhập
            </Link>
          </button>
        )}
      </div>

      <button className={cl("menu-toggle")} onClick={toggleMenu}>
        <i className="fas fa-bars" />
      </button>

      <div className={cl("offcanvas", { open: isMenuOpen })}>
        <div className={cl("offcanvas-header")}>
          <h3 className={cl("offcanvas-title")}>Menu</h3>
          <button className={cl("close-btn")} onClick={toggleMenu}>
            ×
          </button>
        </div>
        <div className={cl("offcanvas-body")}>
          {menus && menus.length > 0 ? (
            menus.map((item) => (
              <div key={item.meN_ID}>
                {item.children.length > 0 ? (
                  <>
                    <button
                      className={cl("offcanvas-dropdown-toggle")}
                      onClick={toggleOffcanvasDropdown}
                    >
                      {item.title}
                    </button>
                    <ul
                      className={cl("offcanvas-dropdown-menu", {
                        show: isOffcanvasDropdownOpen,
                      })}
                    >
                      {item.children.map((child) => (
                        <li key={child.meN_ID}>
                          <Link to={child.url} onClick={toggleMenu}>
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.url} onClick={toggleMenu}>
                    {item.title}
                  </Link>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
          <Link
            to="/auth/login"
            className={cl("offcanvas-auth-btn")}
            onClick={toggleMenu}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
}
