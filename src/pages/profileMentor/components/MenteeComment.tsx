import classNames from "classnames/bind";
import styles from "../styles/menteeComment.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

interface MenteeCommentProps {
  testimonialText: string;
  name: string;
  avatar: string;
  rating: number;
}

const MenteeComment = (props: MenteeCommentProps) => {
  const { avatar, name, rating, testimonialText } = props;

  const renderStars = () => {
    const maxStars = 5;
    const stars = [];
    let remainingRating = rating;

    for (let i = 0; i < maxStars; i++) {
      if (remainingRating >= 1) {
        stars.push(
          <svg
            key={i}
            className={cx("star")}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="gold"
          >
            <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.853 1.415 8.263L12 18.896l-7.414 3.897 1.415-8.263L0 9.227l8.332-1.209z" />
          </svg>
        );
        remainingRating -= 1;
      } else if (remainingRating > 0) {
        const fillPercentage = remainingRating * 100;
        stars.push(
          <svg
            key={i}
            className={cx("star")}
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`grad-${i}`}>
                <stop offset={`${fillPercentage}%`} stopColor="gold" />
                <stop offset={`${fillPercentage}%`} stopColor="gray" />
              </linearGradient>
            </defs>
            <path
              d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.853 1.415 8.263L12 18.896l-7.414 3.897 1.415-8.263L0 9.227l8.332-1.209z"
              fill={`url(#grad-${i})`}
            />
          </svg>
        );
        remainingRating = 0;
      } else {
        stars.push(
          <svg
            key={i}
            className={cx("star")}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="gray"
          >
            <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.853 1.415 8.263L12 18.896l-7.414 3.897 1.415-8.263L0 9.227l8.332-1.209z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className={cx("testimonial")}>
      <p>{testimonialText}</p>
      <div className={cx("testimonial-author")}>
        <img src={avatar} alt={`Avatar/${name}`} />
        <div>
          <div>{name}</div>
          <div className={cx("rating-stars")}>{renderStars()}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(MenteeComment);
