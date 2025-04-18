import { useEffect, useState } from "react";
import { useGetEvents } from "../../hooks";

import { Helmet } from "react-helmet";

import { Loader } from "../../components";
import { ListEvent, RecentEvent, Search } from "./components";

import classNames from "classnames/bind";
import styles from "./styles/style.module.scss";

const cx = classNames.bind(styles);

const EventPage = () => {
  // for current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // for value search
  const [search, setSearch] = useState<string>("");

  // for check submit search
  const [isSearchSubmitted, setIsSearchSubmitted] = useState<boolean>(false);

  // function custom hook useGetEvent
  const { data, isLoading, error } = useGetEvents({
    // param query
    page: currentPage,
    search,
    limit: 5,
  });

  useEffect(() => {
    if (isSearchSubmitted && data && data.data.length > 0) {
      setIsSearchSubmitted(false); // Reset the flag after showing toast
    } else if (isSearchSubmitted && data && data.data.length === 0) {
      setSearch(""); // Reset the value search to update the previous data
      setIsSearchSubmitted(false); // Reset the flag after showing toast
    }
  }, [data, isSearchSubmitted]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Mentoring - Sự Kiện</title>
      </Helmet>

      <section className={cx("event")}>
        <div className="container">
          <div className={cx("event_content")}>
            <div className="row justify-content-between gx-5">
              <div className="col-lg-8">
                <ListEvent
                  events={data?.data}
                  isLoading={isLoading}
                  pagination={data?.pagination}
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>

              <div className="col-lg-4 order-first order-lg-last">
                <Search
                  setSearch={setSearch}
                  setIsSearchSubmitted={setIsSearchSubmitted}
                />

                <div className={`${cx("content_category")} shadow-lg`}>
                  <h3>Danh Mục</h3>
                  <h5>Lorem</h5>
                  <h5>Lorem</h5>
                  <h5>Lorem</h5>
                  <h5>Lorem</h5>
                  <h5>Lorem</h5>
                </div>

                <RecentEvent />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventPage;
