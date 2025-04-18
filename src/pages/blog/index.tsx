import { Helmet } from "react-helmet";

import { Categories, RecentBlogs, SearchBlogs, Tags } from "./components";

import classNames from "classnames/bind";
import styles from "./styles/blog.module.scss";
import { useState } from "react";
import { Blog } from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const BlogPage = () => {
  const [searchResults, setSearchResults] = useState<Blog[]>([]);

  return (
    <>
      <Helmet>
        <title>Mentoring - Tin Tức</title>
      </Helmet>

      <div className="container">
        <div className="row">
          <div className="col-12 d-lg-none ">
            <SearchBlogs setSearchResults={setSearchResults} />
            <Tags />
          </div>
          <div className="d-none d-lg-block">
            <Categories />
          </div>
        </div>
        <h2 className={cx("title", "m-lg-3")}>Bài viết mới nhất</h2>
        <div className={cx("underline")} />
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <RecentBlogs searchResults={searchResults} />
          </div>

          <div
            className="col-lg-3 d-none d-lg-block"
            style={{ position: "sticky", top: "120px", height: "fit-content" }}
          >
            <SearchBlogs setSearchResults={setSearchResults} />
            <Tags />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default BlogPage;
