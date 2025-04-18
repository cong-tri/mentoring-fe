import { Link } from "react-router-dom";
import styles from "./styles/relantedEvent.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const EventRelated = () => {
  const eventRelated = Array.from({ length: 6 });
  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
        {eventRelated.map(() => {
          return (
            <div className="col d-flex justify-content-center mb-4">
              <div className={cx("card-event-related")}>
                <img
                  src="/assets/images/event-banner.jpg"
                  className="card-img-top"
                  alt="Sự kiện"
                />
                <div className={cx("card-body")}>
                  <h5 className="card-title">Hội Thảo Công Nghệ</h5>
                  <p className="text-muted">📅 Ngày: 20/05/2025</p>
                  <p className="card-text">
                    Sự kiện dành cho những ai đam mê công nghệ AI, Blockchain và
                    IoT.
                  </p>
                  <Link to="/event/details" className="btn btn-primary">
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventRelated;
