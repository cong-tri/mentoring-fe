import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { handleFormatDateTime } from "../../../../lib";
import { Event, Pagination } from "../../../../types";

import classNames from "classnames/bind";
import styles from "./styles/listEvent.module.scss";

const cx = classNames.bind(styles);

const ListEvent = ({
  events,
  isLoading,
  pagination,
  currentPage,
  onPageChange,
}: {
  events: Event[] | undefined;
  isLoading: boolean;
  pagination: Pagination | undefined;
  currentPage: number;
  onPageChange: (selected: number) => void;
}) => {
  // for state list Event
  const [listEvents, setListEvents] = useState<Event[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (events && events.length > 0) {
      setListEvents(
        // sort base on the lastest date
        [...events].sort((a, b) => {
          return (
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
        })
      );
    } else {
      setListEvents([]);
    }
  }, [events]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={cx("content_list_event")}>
        {/*get one row from array list event*/}
        {listEvents?.slice(0, 1).map((item) => {
          return (
            <>
              <div
                className={cx("list_event_first_item", "card", "shadow-lg")}
                onClick={() => navigate(`/event/details${item.slug}`)}
                key={item.EVENT_ID}
              >
                <img
                  src="https://cdn.prod.website-files.com/6769617aecf082b10bb149ff/67763d8a2775bee07438e7a5_Events.png"
                  // {`${import.meta.env.VITE_MENTORING_ADMIN_API}${item.thumbnail}`}
                  className="card-img-top position-relative"
                  alt={`${item.title}-${item.subTitle}`}
                />
                <div className={cx("date")}>
                  <h1>30</h1>
                  <h1>JAN</h1>
                </div>
                <div className={cx("card-body", "content")}>
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text">{item.description}</p>
                  <h5>Đơn vị: {item.position}</h5>
                  <h5>Địa điểm: {item.location}</h5>
                  <h5>
                    Diễn ra: {handleFormatDateTime(item.startTime)} -{" "}
                    {handleFormatDateTime(item.endTime)}
                  </h5>
                  <div className="hstack gap-3 my-3">
                    <div className="">
                      <h5>Thời gian: 15:00 PM</h5>
                    </div>
                    <div className="ms-auto">
                      <h5>
                        Số người tham gia: {item.totalParticipants}/
                        {item.maxParticipants}
                      </h5>
                    </div>
                  </div>
                  <button className="shadow-lg">Đăng ký tham gia</button>
                </div>
              </div>
            </>
          );
        })}

        <div className="row row-cols-1 row-cols-md-2 gy-4 mb-5">
          {/*get the array copy from the first item of list event*/}
          {listEvents.slice(1)?.map((item) => {
            return (
              <>
                <div
                  className="col"
                  onClick={() => navigate(`/event/details${item.slug}`)}
                  key={item.EVENT_ID}
                >
                  <div className={`${cx("list_event_item")} card shadow-lg`}>
                    <img
                      src="https://cdn.prod.website-files.com/6769617aecf082b10bb149ff/67763d8a2775bee07438e7a5_Events.png"
                      className="card-img-top position-relative"
                      alt={`${item.title}-${item.subTitle}`}
                    />
                    <div className={cx("date")}>
                      <h5>15</h5>
                      <h5>JAN</h5>
                    </div>
                    <div className="card-body p-3">
                      <h4 className="card-title">{item.title}</h4>
                      <p className="card-text">{item.description}</p>
                      <p>Đơn vị: {item.position}</p>
                      <p>Địa điểm: {item.location}</p>
                      <div className="hstack gap-3 my-2">
                        <div>
                          <p>Thời gian: 15:00 PM</p>
                        </div>
                        <div className="ms-auto">
                          <p>
                            Số người tham gia: {item.totalParticipants}/
                            {item.maxParticipants}
                          </p>
                        </div>
                      </div>
                      <button className="shadow-lg">Đăng ký tham gia</button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {/* Pagination */}
        {pagination && (
          <ReactPaginate
            nextLabel="Sau >"
            previousLabel="< Trước"
            breakLabel={"..."}
            pageCount={pagination.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(selected) => onPageChange(selected.selected + 1)}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        )}
      </div>
    </>
  );
};

export default ListEvent;
