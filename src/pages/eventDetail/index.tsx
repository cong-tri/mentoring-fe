import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEventDetail } from "../../hooks";

import { Helmet } from "react-helmet";

import { Banner, Navbar, RelatendEvent } from "./components";

import styles from "./styles/eventDetail.module.scss";
import classNames from "classnames/bind";
import { Loader } from "../../components";

const cx = classNames.bind(styles);

const EventDetailPage = () => {
  const [activeId, setActiveId] = useState<string>("#");

  const { slug } = useParams<{ slug: string }>();
  const slugParts = slug ? slug.split("-") : [];
  const EventCode = slugParts.slice(-1).join("-");

  const { data, isLoading } = useGetEventDetail(EventCode);
  console.log(data);

  useEffect(() => {
    const elementWithId = document.querySelectorAll("[id]");
    const handleScroll = () => {
      let currentId = "#";

      elementWithId.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < 400) {
          currentId = `#${el.id}`;
        }
      });
      setActiveId(currentId);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Mentoring - Thông Tin Sự Kiện</title>
      </Helmet>

      <Banner
        bannerContent={{
          title: data?.title,
          subTitle: data?.subTitle,
          endTime: data?.endTime,
          startTime: data?.startTime,
          description: data?.description,
        }}
      />
      <Navbar activeId={activeId} />
      <div className="container">
        <h2 className={cx("title", "fw-bold ")}>CÓ SỰ THAM GIA </h2>
        <div className={cx("underline")}></div>
        <div
          className={cx("row", "justify-content-center", "section")}
          id="dien-gia"
        >
          {data?.guests.map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mt-3"
            >
              <div className={cx("organizer")}>
                <a href="#">
                  <img
                    className={cx("organize-img")}
                    src="/assets/images/images3.png"
                    alt=""
                  />
                </a>
                <div className={cx("blogs-info")}>
                  <div className={cx("info-tile")}>
                    <h4>Khách Mời</h4>
                    <h5>{item.FULL_NAME}</h5>
                    <p>CEO của Tesla & SpaceX</p>
                  </div>
                  <div className={cx("info-body", "p-1")}>
                    <p>
                      Elon Musk là một doanh nhân, kỹ sư và nhà phát minh người
                      Mỹ gốc Nam Phi. Ông là người sáng lập, CEO của Tesla,
                      SpaceX, và có ảnh hưởng lớn trong ngành công nghệ và không
                      gian.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className={cx("title", "fw-bold")}>Mục tiêu sự kiện </h2>
      <div className={cx("underline")} />
      <div
        className={cx("container", "mt-4", "section", "container-target")}
        id="muc-tieu"
      >
        <div className={cx("event-card")}>
          <ul className="mt-3">
            <li>
              Tổng hợp những kinh nghiệm 30 năm và các ngầm định của văn hóa
              FPT.
            </li>
            <li>Văn hóa doanh nghiệp trong bối cảnh văn hóa dân tộc.</li>
            <li>
              Kết hợp giữa chuyên gia văn hóa dân tộc và kinh nghiệm thành công
              từ doanh nghiệp hàng đầu.
            </li>
          </ul>
        </div>
      </div>
      <h2 className={cx("title", "fw-bold")}>Chi tiết sự kiện </h2>
      <div className={cx("underline")} />
      <div
        className={cx("container", "mt-3", "section", "container-details")}
        id="chi-tiet"
      >
        <div className={cx("details-card")}>
          <h3 className="fw-bold text-uppercase">
            Lorem ipsum dolor sit amet.
          </h3>
          <ul className="mt-3">
            <li>
              Tổng hợp những kinh nghiệm 30 năm và các ngầm định của văn hóa
              FPT.
            </li>
            <li>Văn hóa doanh nghiệp trong bối cảnh văn hóa dân tộc.</li>
            <li>
              Kết hợp giữa chuyên gia văn hóa dân tộc và kinh nghiệm thành công
              từ doanh nghiệp hàng đầu.
            </li>
          </ul>
          <h3 className="fw-bold text-uppercase">Lorem ipsum</h3>
          <ul className="mt-3">
            <li>
              Tổng hợp những kinh nghiệm 30 năm và các ngầm định của văn hóa FPT
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Neque, laborum?
            </li>
            <li>Văn hóa doanh nghiệp trong bối cảnh văn hóa dân tộc.</li>
            <li>
              Kết hợp giữa chuyên gia văn hóa dân tộc và kinh nghiệm thành công
              từ doanh nghiệp hàng đầu.
            </li>
          </ul>
        </div>
      </div>

      <h2 className={cx("title", "fw-bold ")}>Địa điểm tổ chức </h2>
      <div className={cx("underline")} />
      <div
        className={cx("container", "section", "container-map", "mt-5", "mb-3")}
        id="map"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4150499198827!2d106.62725477451814!3d10.85600285772194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529deaaaaaaab%3A0xce800a25143c8e3a!2zQ2FvIMSQ4bqzbmcgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1741938025738!5m2!1svi!2s"
          width="100%"
          height={400}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <h2 className={cx("title", "fw-bold ")}>Sự kiện khác </h2>
      <div className={cx("underline")} />
      <div className="container mt-3">
        <RelatendEvent />
      </div>
    </>
  );
};

export default EventDetailPage;
