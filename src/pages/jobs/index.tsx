import { Helmet } from "react-helmet";

import {
  Banner,
  ListJobs,
  OffCanvasSearch,
  SearchBar,
  SearchFilter,
} from "./components";

import classNames from "classnames/bind";
import styles from "./styles/style.module.scss";

const cx = classNames.bind(styles);

const JobsPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Việc Làm</title>
      </Helmet>

      <section className={cx("jobs")}>
        <Banner />
        <div className="container">
          <SearchBar />
          <div className={cx("jobs-content")}>
            <h4 className="mb-4 text-center text-lg-start">
              Tin tuyển dụng việc làm nhanh 24h tại Mentoring
            </h4>
            <div className="row gy-3">
              <div className="col-lg-4 d-none d-lg-block">
                <div
                  className={cx(
                    "jobs_content_filter",
                    "shadow-lg",
                    "rounded-4",
                    "p-4"
                  )}
                >
                  <SearchFilter />
                </div>
              </div>
              <div className="col-lg-8">
                <ListJobs />
              </div>
            </div>
          </div>

          <button
            className={`${cx("jobs-search-mobile")} d-block d-lg-none shadow-lg`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <OffCanvasSearch />
        </div>
      </section>
    </>
  );
};

export default JobsPage;
