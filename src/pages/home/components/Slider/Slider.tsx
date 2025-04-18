import React, { useEffect, useRef, useState } from "react";
import { useMentor } from "../../../../hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import styles from "./Slider.module.scss";

import { Mentor } from "../../../../types";

const Slider: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>();
  const { getMentorRandom } = useMentor();

  const hasFetch = useRef(false);

  useEffect(() => {
    const fetchMentorsRandom = async () => {
      const response = await getMentorRandom();
      if (response?.status === 200 && response?.success) {
        setMentors(response.data);
      }
    };

    if (!hasFetch.current) {
      hasFetch.current = true;
      fetchMentorsRandom();
    }
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.swiperContainer}
      >
        {mentors !== undefined && mentors?.length > 0 ? (
          mentors.map((item, index) => (
            <SwiperSlide key={item.USER_ID || index} className={styles.slide}>
              <img
                src={item.avatar ?? "/assets/images/mentor1.jpg"}
                alt={`${item.firstName} ${item.lastName}`}
                className={styles.image}
              />
              <h3
                className={styles.name}
              >{`${item.firstName} ${item.lastName}`}</h3>
              <p className={styles.role}>{item.email}</p>
            </SwiperSlide>
          ))
        ) : (
          <p>Không có Mentor nào</p>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
