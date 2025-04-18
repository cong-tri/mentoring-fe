import { useEffect, useState } from "react";

import { Event } from "../../../../types";

import classNames from "classnames/bind";
import styles from "./styles/recentEvent.module.scss";
import { useGetEvents } from "../../../../hooks";

const cx = classNames.bind(styles);

const RecentEvent = () => {
  // for state list Event
  const [listEvents, setListEvents] = useState<Event[]>([]);

  const { data, isLoading } = useGetEvents({
    // param query
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    if (data && data.data.length > 0) {
      setListEvents(
        // sort base on the oldest date
        [...data.data].sort((a, b) => {
          return (
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );
        })
      );
    } else {
      setListEvents([]);
    }
  }, [data]);

  return (
    <div
      className={`${cx("content_event_recent")} d-none d-lg-block shadow-lg`}
    >
      <h3>Sự Kiện Gần Đây</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        listEvents.slice(0, 3).map((item) => {
          return (
            <div
              className="row justify-content-between align-items-center gx-0 mb-4"
              key={item.EVENT_ID}
            >
              <div className="col-md-5">
                <img
                  src="https://cdn.prod.website-files.com/6769617aecf082b10bb149ff/67763d8a2775bee07438e7a5_Events.png"
                  width={"100%"}
                  height={100}
                  alt={item.title}
                  className="rounded-3"
                />
              </div>
              <div className="col-md-6">
                <h5>{item.title}</h5>
                <h6 className="text-secondary">Lorem ABCDEF</h6>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentEvent;
