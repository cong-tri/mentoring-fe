import { useState } from "react";
import { Helmet } from "react-helmet";

import { newsData } from "./data";

import styles from "./aboutpage.module.scss";

const AboutPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const getCurrentNews = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return newsData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <Helmet>
        <title>Mentoring - Về Chúng Tôi</title>
      </Helmet>

      {/* Hero Section with Video */}
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroContent}>
          <h1>Chào mừng đến với trường học của chúng tôi</h1>
          <p>Nơi ươm mầm những tài năng tương lai</p>
          <button className={styles.ctaButton}>Tìm hiểu thêm</button>
        </div>
      </section>

      <section className={styles.container}>
        {/* Floating icons */}
        <div className={styles.floatingIcon}>
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="currentColor"
          >
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z" />
          </svg>
        </div>
        <div className={styles.floatingIcon}>
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="currentColor"
          >
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
          </svg>
        </div>
        <div className={styles.floatingIcon}>
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="currentColor"
          >
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0-3h8v2h-8zm0 6h8v2h-8z" />
          </svg>
        </div>
        <div className={styles.floatingIcon}>
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
          </svg>
        </div>

        <h2 className={styles.title}>
          Chuẩn bị cho học sinh đạt được thành công
        </h2>

        {/* SVG Path Animation */}
        <div className={styles.titleDecoration}>
          <svg viewBox="0 0 500 50" className={styles.decorativeLine}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#45B7D1" />
              </linearGradient>
            </defs>
            <path
              d="M 0 25 Q 125 5, 250 25 T 500 25"
              className={styles.path}
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

        <div className={styles.underline}></div>

        {/* Card 1 - Ảnh bên phải */}
        <div className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.text}>
            <h3>Phát triển những người học tự tin và thành công</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipiscing elit.
              Temporibus ipsa libero, autem iusto tenetur blanditiis earum.
            </p>
            <button className={styles.button}>View More</button>
          </div>
          <img
            src=".\assets\images\rectangle8.png"
            alt="Student"
            className={styles.image}
          />
        </div>

        {/* Card 2 - Ảnh bên trái */}
        <div className={`${styles.card} ${styles.cardLeft}`}>
          <img
            src=".\assets\images\rectangle8.png"
            alt="Student"
            className={styles.image}
          />
          <div className={styles.text}>
            <h3>Tận hưởng việc học với trải nghiệm lớp học độc đáo</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipiscing elit.
              Temporibus ipsa libero, autem iusto tenetur blanditiis earum.
            </p>
            <button className={styles.button}>View More</button>
          </div>
        </div>

        {/* Card 3 - Ảnh bên phải */}
        <div className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.text}>
            <h3>Những giáo viên nhiệt huyết tạo nên sự khác biệt</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipiscing elit.
              Temporibus ipsa libero, autem iusto tenetur blanditiis earum.
            </p>
            <button className={styles.button}>View More</button>
          </div>
          <img
            src=".\assets\images\rectangle8.png"
            alt="Student"
            className={styles.image}
          />
        </div>
      </section>

      {/* Latest News Section */}
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
          <h2 className={styles.title}>Tin Tức Mới Nhất</h2>
          <div className={styles.titleDecoration}>
            <svg viewBox="0 0 500 50" className={styles.decorativeLine}>
              <defs>
                <linearGradient
                  id="titleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#45B7D1" />
                </linearGradient>
              </defs>
              <path
                d="M0,25 C125,15 175,35 250,25 C325,15 375,35 500,25"
                stroke="url(#titleGradient)"
                strokeWidth="3"
                fill="none"
                className={styles.animatedPath}
              />
              <circle
                cx="250"
                cy="25"
                r="4"
                fill="url(#titleGradient)"
                className={styles.dot}
              />
              <circle
                cx="125"
                cy="20"
                r="3"
                fill="url(#titleGradient)"
                className={styles.dot}
              />
              <circle
                cx="375"
                cy="20"
                r="3"
                fill="url(#titleGradient)"
                className={styles.dot}
              />
            </svg>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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

      <section className={styles.whyItWorks}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Why It Works</h2>
          <div className={styles.titleDecoration}>
            <svg viewBox="0 0 500 50" className={styles.decorativeLine}>
              <defs>
                <linearGradient
                  id="whyGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4158D0" />
                  <stop offset="50%" stopColor="#C850C0" />
                  <stop offset="100%" stopColor="#FFCC70" />
                </linearGradient>
              </defs>
              <path
                d="M0,25 C125,15 175,35 250,25 C325,15 375,35 500,25"
                stroke="url(#whyGradient)"
                strokeWidth="3"
                fill="none"
                className={styles.animatedPath}
              />
            </svg>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
            </div>
            <h3>Personalized Learning</h3>
            <p>
              Students practice at their own pace, first filling in gaps in
              their understanding and then accelerating their learning.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3>Trusted Content</h3>
            <p>
              Created by experts, our library of trusted practice content is
              carefully curated and always growing.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <h3>Tools for Teachers</h3>
            <p>
              Teachers can identify gaps in their students' understanding,
              tailor instruction, and meet the needs of every student.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
