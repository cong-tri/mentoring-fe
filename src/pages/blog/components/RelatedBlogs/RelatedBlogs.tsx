import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../RecentBlogs/styles/recentBlogs.module.scss";
import { useEffect, useRef, useState } from "react";
import { handleApiGetBlogWithPaginate } from "../../../../apis/blog";
import { Blog } from "../../../../types";
import ReactPaginate from "react-paginate";
import { Loader } from "../../../../components";

const cx = classNames.bind(styles);

const RecentBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [listBlogs, setListBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const LIMIT_USER = 8;

  // CACHE AVOID API CALLBACK
  const cacheBlogs = useRef<{ [key: number]: Blog[] }>({});

  useEffect(() => {
    // FUNCTION GET LIST BLOG WITH PAGINATE
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

        // FILTER "active" BLOGS
        const activeBlogs = data.filter((blog) => blog.status === "active");

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

    fetchBlogsWithPaginate(currentPage);
  }, [currentPage]); // Effect chạy lại khi currentPage thay đổi

  // HANDLE CLICK BUTTON WITH PAGINATE
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row">
            {listBlogs?.map((item) => {
              return (
                <div className="col-12 col-md-4" key={item.BLOGS_ID}>
                  <div className={cx("blogs-item-related")}>
                    <Link to={`/blog/details${item.slug}`}>
                      <img
                        className={cx("blogs-item-related-image")}
                        src="https://wpocean.com/html/tf/bloggar/assets/images/blog/img-10.jpg"
                        alt=""
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
                      <span className="float-end">1.5k lượt xem</span>
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
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              previousLabel="< Trước"
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
