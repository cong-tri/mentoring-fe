import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./styles/recentBlogs.module.scss";
import { useEffect, useRef, useState } from "react";
import { handleApiGetBlogWithPaginate } from "../../../../apis/blog";
import { Blog } from "../../../../types";
import ReactPaginate from "react-paginate";
import { Loader } from "../../../../components";

const cx = classNames.bind(styles);

const RecentBlogs = ({ searchResults }: { searchResults: Blog[] }) => {
  const [loading, setLoading] = useState(false);
  const [listBlogs, setListBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const LIMIT_USER = 8;

  //CACHE AVOID API CALLBACK
  const cacheBlogs = useRef<{ [key: number]: Blog[] }>({});

  //FUNCTION GET LIST BLOG WITH PAGINATE
  const fetchBlogsWithPaginate = async (page: number) => {
    if (cacheBlogs.current[page]) {
      setListBlogs(cacheBlogs.current[page]);
      return;
    }
    // LOADING PAGE
    setLoading(true);

    // CALL API GET DATA LIST BLOG
    const response = await handleApiGetBlogWithPaginate(page, LIMIT_USER);
    if (response?.status === 200 && response.success) {
      const { data } = response;

      // FILTER "active" USER LIST IF API RETURN STATUS PEDING
      const activeBlogs = data;

      // GET LATEST BLOGS
      if (activeBlogs.length > 0) {
        setListBlogs(
          [...activeBlogs].sort((a, b) => {
            return (
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
            );
          })
        );
        setPageCount(response.pagination?.totalPages ?? 0);
      } else {
        setListBlogs([]);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // UPDATE LIST USER WITH RESULTS SEARCH
    if (searchResults.length > 0) {
      setListBlogs(searchResults);
    } else {
      fetchBlogsWithPaginate(currentPage);
    }
  }, [searchResults, currentPage]);

  // GET 2 LATEST BLOGS
  const latestBlogs = listBlogs?.slice(0, 2);
  //LIST BLOGS
  const currentBlogs = listBlogs.slice(2);

  // HANDLE CLICK BUTTON WITH PAGINATA
  const handlePageClick = (event: { selected: number }) => {
    const newPage = +event.selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* {currentPage === 1 && ( */}
          <div className="row">
            {latestBlogs?.map((item) => {
              return (
                <div className="col-12 col-md-6" key={item.BLOGS_ID}>
                  <div className={cx("blogs-item-related")}>
                    <Link to={`/blog/details${item.slug}`}>
                      <img
                        className={cx("blogs-item-related-image")}
                        src="https://wpocean.com/html/tf/bloggar/assets/images/blog/img-10.jpg"
                        // {`${import.meta.env.VITE_MENTORING_ADMIN_API}${item.thumbnail}`}
                        alt={item.title}
                      />
                    </Link>
                    <div className={cx("blogs-info")}>
                      <span className={cx("blog-category")}>
                        Phát triển cá nhân
                      </span>
                      <Link to={`/blog/details${item.slug}`}>
                        <p className={cx("title")}>{item.title}</p>
                      </Link>

                      <div className={cx("blogs-date")}>
                        <div className={cx("date-item")}>
                          <i className="fa-solid fa-calendar-days" />
                        </div>
                        <div className={cx("date-item")}>
                          {new Date(item.createdDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </div>
                      <span className="float-end"> 1.5k lượt xem </span>
                      <p className="mt-2">
                        Giới thiệu ngắn gọn về bài viết Lorem ipsum dolor sit
                        Lorem. with Lorem
                        <Link
                          to={`/blog/details${item.slug}`}
                          className={cx("date-item")}
                        >
                          xem thêm
                        </Link>
                      </p>
                      <div className={cx("blog-footer")}>
                        <div className={cx("blog-author")}>
                          <img
                            className={cx("blog-author-image")}
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            alt="Trần Đức"
                            loading="lazy"
                          />
                          <span className="ms-2">Trần Đức</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* )} */}
          <div className="row">
            {currentBlogs?.map((item) => {
              return (
                <div className="col-12 col-md-4" key={item.BLOGS_ID}>
                  <div className={cx("blogs-item-related")}>
                    <Link to={`/blog/details${item.slug}`}>
                      <img
                        className={cx("blogs-item-related-image")}
                        src="https://wpocean.com/html/tf/bloggar/assets/images/blog/img-10.jpg"
                        alt={item.title}
                      />
                    </Link>
                    <div className={cx("blogs-info")}>
                      <span className={cx("blog-category")}>
                        Phát triển cá nhân
                      </span>
                      <Link to={`/blog/details${item.slug}`}>
                        <p className={cx("title")}>{item.title}</p>
                      </Link>
                      <div className={cx("blogs-date")}>
                        <div className={cx("date-item")}>
                          <i className="fa-solid fa-calendar-days" />
                        </div>
                        <div className={cx("date-item")}>
                          {new Date(item.createdDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </div>
                      <span className="float-end"> 1.5k lượt xem </span>
                      <p className="mt-2">
                        Giới thiệu ngắn gọn về bài viết Lorem ipsum dolor sit
                        Lorem. with Lorem
                        <Link
                          to={`/blog/details${item.slug}`}
                          className={cx("date-item")}
                        >
                          xem thêm
                        </Link>
                      </p>
                      <div className={cx("blog-footer")}>
                        <div className={cx("blog-author")}>
                          <img
                            className={cx("blog-author-image")}
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            alt="Trần Đức"
                            loading="lazy"
                          />
                          <span className="ms-2">Trần Đức</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center">
            <ReactPaginate
              pageCount={pageCount}
              nextLabel="Sau >"
              previousLabel="< Trước"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={currentPage - 1}
            />
          </div>
        </>
      )}
    </>
  );
};

export default RecentBlogs;
