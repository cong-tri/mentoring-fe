import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { handleAPIVisitCounter } from "../../apis";

import { newsData } from "./data";

import Slider from "./components/Slider/Slider";
import styles from "./homepage.module.scss";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      (async function fetchVisitCounter() {
        await handleAPIVisitCounter();
      })();
    }
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const getCurrentNews = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return newsData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <Helmet>
        <title>Mentoring - Trang chủ</title>
      </Helmet>

      <div className={styles.homePage}>
        <div className={styles.bg}>
          <section className={styles.hero}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="500"
              height="500"
              viewBox="0 0 1444 1175"
              fill="none"
            >
              <path
                opacity="0.05"
                d="M768.314 428.947C484.323 331.75 618.517 158.035 386.199 35.2638C229.428 -47.5842 97.0068 32.2604 38.2769 119.706C-23.2184 211.268 3.32782 345.555 28.6505 409.623C77.2366 532.549 215.676 568.655 269.308 655.912C322.941 743.169 281.685 911.77 362.821 1067.28C443.957 1222.8 689.929 1183.19 768.314 1110.21C850.279 1033.9 895.818 912.065 1009.16 817.759C1109.5 734.268 1197.01 668.233 1315.14 539.101C1349.95 501.046 1443.61 378.714 1443.61 378.714C1443.61 378.714 1245.46 445.48 1172.81 460.288C1006.33 494.215 900.116 474.057 768.314 428.947Z"
                fill="url(#paint0_linear_3488_2335)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3488_2335"
                  x1="1443.61"
                  y1="0.435913"
                  x2="0.607422"
                  y2="0.435913"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#009DD1" />
                  <stop offset="1" stopColor="#0064A4" />
                </linearGradient>
              </defs>
            </svg>
            <div className={styles.heroContent}>
              <h1>Học hỏi và phát triển với sự giúp đỡ từ các cố vấn</h1>
              <p>
                Đăng ký và gặp gỡ hơn 6,086 cố vấn để được cố vấn 1:1 trong cộng
                đồng toàn cầu của chúng tôi.
              </p>
              <div className={styles.searchBar}>
                <input type="text" placeholder="Tìm kiếm mentor" />
                <button>
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <img
              src="/assets/images/dowload2.png"
              alt="User 1"
              className={`${styles.circleImg} ${styles.circle1}`}
            />
            <img
              src="/assets/images/dowload2.png"
              alt="User 2"
              className={`${styles.circleImg} ${styles.circle2}`}
            />
            <img
              src="/assets/images/dowload2.png"
              alt="User 3"
              className={`${styles.circleImg} ${styles.circle3}`}
            />
            <img
              src="/assets/images/dowload2.png"
              alt="User 4"
              className={`${styles.circleImg} ${styles.circle4}`}
            />
            <img
              src="/assets/images/dowload2.png"
              alt="User 5"
              className={`${styles.circleImg} ${styles.circle5}`}
            />
            <img
              src="/assets/images/dowload2.png"
              alt="User 6"
              className={`${styles.circleImg} ${styles.circle6}`}
            />
          </section>
        </div>
        <div></div>
        <div className={styles.sc}>
          <div className={styles.howItWorks}>
            <h1 className={styles.title_1}>Đặc trưng</h1>
            <h2 className={styles.title}>Cách hoạt động</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.icon}>
                  <i className="fas fa-search"></i>
                </div>
                <h3>1. Tìm mentor</h3>
                <p>Create an account, sign up to be a mentor or mentee</p>
              </div>

              <img
                className={styles.connector}
                src="/assets/images/path-2-copy1.svg"
                alt="Đường nối"
              />

              <div className={styles.step}>
                <div className={styles.icon}>
                  <i className="fas fa-user-check"></i>
                </div>
                <h3>2. Đăng nhập</h3>
                <p>Once you've found the right matches,</p>
              </div>

              <img
                className={styles.connector}
                src="/assets/images/path-2-copy1.svg"
                alt="Đường nối"
              />

              <div className={styles.step}>
                <div className={styles.icon}>
                  <i className="fas fa-paper-plane"></i>
                </div>
                <h3>3. Gửi yêu cầu mentor</h3>
                <p>Lorem Ipsum is simply dummy simply text</p>
              </div>

              <img
                className={styles.connector}
                src="/assets/images/path-2-copy1.svg"
                alt="Đường nối"
              />

              <div className={styles.step}>
                <div className={styles.icon}>
                  <i className="fas fa-users"></i>
                </div>
                <h3>4. Kết nối</h3>
                <p>Lorem Ipsum is simply dummy simply text</p>
              </div>

              <img
                className={styles.connector}
                src="/assets/images/path-2-copy1.svg"
                alt="Đường nối"
              />

              <div className={styles.step}>
                <div className={styles.icon}>
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3>5. Đặt lịch hẹn</h3>
                <p>Earn TeeTors Points engaging with others</p>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.imageSection}>
                <div className={styles.decorativeSquare}></div>
                <img
                  src="/assets/images/rectangle8.png"
                  alt="Cố vấn"
                  className={styles.advisorImg}
                />
                <div className={styles.decorativeCircle}></div>
              </div>
              <div className={`${styles.textSection} ms-md-4`}>
                <p className={styles.subheading}>VỀ CHÚNG TÔI</p>
                <h2>Book 1:1 Lịch hẹn</h2>
                <p className={styles.boldText}>
                  Cố vấn kỹ thuật số sáng tạo và chuyên nghiệp!
                </p>
                <p className={styles.description}>
                  <em>
                    Lên lịch một phiên ngay lập tức với người cố vấn và làm việc
                    trực tiếp với họ trên Teetors - cho dù đó là để nhận lời
                    khuyên chiến thuật một lần hay nhiều phiên hướng tới mục
                    tiêu dài hạn.
                  </em>
                </p>
                <p className={styles.description}>
                  <em>
                    Lên lịch một phiên ngay lập tức với người cố vấn và làm việc
                    trực tiếp với họ trên Teetors - cho dù đó là để nhận lời
                    khuyên chiến thuật một lần hay nhiều phiên hướng tới mục
                    tiêu dài hạn.
                  </em>
                </p>
                <button className={styles.btn}>KHÁM PHÁ CỐ VẤN</button>
              </div>
            </div>
          </div>
          <div className={styles.new}>
            <section className={styles.newsSection}>
              <div className={styles.animatedShapes}>
                <div className={styles.shape}>
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                  >
                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z" />
                  </svg>
                </div>
                <div className={styles.shape}>
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <div className={styles.shape}>
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                  >
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5V7.5c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
                  </svg>
                </div>
                <div className={styles.shape}>
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                  >
                    <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z" />
                  </svg>
                </div>
              </div>

              <div className={styles.titleWrapper}>
                <h2 className={styles.title}>SỰ KIỆN</h2>
                <div className={styles.titleDecoration}>
                  Những sự kiện nổi bật sắp diễn ra tại Mentoring
                </div>
              </div>

              <div className={styles.newsGrid}>
                {getCurrentNews().map((news) => (
                  <div key={news.id} className={styles.newsCard}>
                    <div className={styles.newsImage}>
                      <img src={news.image} alt={news.title} />
                      <span className={styles.category}>{news.category}</span>
                    </div>
                    <div className={styles.newsContent}>
                      <h3>{news.title}</h3>
                      <p className={styles.date}>{news.date}</p>
                      <p className={styles.description}>{news.description}</p>
                      <button className={styles.readMore}>Đọc thêm</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                <button
                  className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <span>←</span>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <span>→</span>
                </button>
              </div>
            </section>
            <div className={styles.newDecor1}></div>
            <div className={styles.newDecor2}></div>
          </div>
          <div className={styles.mentors}>
            <div className={styles.mentorsHeader}>
              <h2 className={styles.mentorsTitle}>Mentors của chúng tôi</h2>
              <p className={styles.mentorsDescription}>
                Chúng tôi là một cộng đồng gồm hơn 50.000 chuyên gia đầy tham
                vọng, đang tiến xa hơn mỗi ngày.
              </p>
              <a href="#" className={styles.mentorsButton}>
                TÌM HIỂU NGAY
              </a>
            </div>
            <Slider />
          </div>

          <div className={styles.testimonials}>
            <div className={styles.testimonialsHeader}>
              <p className={styles.testimonialsSubtitle}>
                LỜI CHỨNG THỰC CỦA CHÚNG TÔI
              </p>
              <h2 className={styles.testimonialsTitle}>
                Chiến thắng từ khắp nơi trên thế giới
              </h2>
            </div>

            <div className={styles.testimonialsList}>
              <div className={styles.testimonial}>
                <img
                  src="/assets/images/mask2.png"
                  alt="James Danial"
                  className={styles.testimonialAvatar}
                />
                <p className={styles.testimonialName}>Filip Dossaley,</p>
                <p className={styles.testimonialDate}>23 Aug 2022</p>
                <p className={styles.testimonialContent}>
                  Aroa and I talked about career field decisions and my
                  portfolio. I really appreciated his feedback and advice. :)
                </p>
              </div>

              <div className={styles.testimonial}>
                <img
                  src="/assets/images/mask2.png"
                  alt="James Danial"
                  className={styles.testimonialAvatar}
                />
                <p className={styles.testimonialName}>James Danial.</p>
                <p className={styles.testimonialDate}>15 Mar 2022</p>
                <p className={styles.testimonialContent}>
                  Aroa and I talked about career field decisions and my
                  portfolio. I really appreciated his feedback and advice. :)
                </p>
              </div>

              <div className={styles.testimonial}>
                <img
                  src="/assets/images/mask14.png"
                  alt="James Danial"
                  className={styles.testimonialAvatar}
                />
                <p className={styles.testimonialName}>James Danial.</p>
                <p className={styles.testimonialDate}>15 Mar 2022</p>
                <p className={styles.testimonialContent}>
                  Aroa and I talked about career field decisions and my
                  portfolio. I really appreciated his feedback and advice. :)
                </p>
              </div>
            </div>

            <div className={styles.nextStep}>
              <h2 className={styles.nextStepTitle}>
                Chương tiếp theo của bạn sẽ được thực hiện nhờ sự cố vấn.
              </h2>
              <p className={styles.nextStepDescription}>
                Khám phá hơn 4000 cố vấn từ hơn 60 quốc gia để giúp bạn đạt được
                và vượt qua mọi thử thách mà bạn gặp phải.
              </p>
              <a href="#homepage" className={styles.nextStepButton}>
                BẮT ĐẦU
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
