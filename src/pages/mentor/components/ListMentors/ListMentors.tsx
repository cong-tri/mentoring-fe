import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Mentor, Pagination } from "../../../../types";

import classNames from "classnames/bind";
import styles from "./styles/listMentors.module.scss";

const cx = classNames.bind(styles);

const ListMentors = ({
  mentors,
  isLoading,
  pagination,
  currentPage,
  onPageChange,
}: {
  mentors: Mentor[] | undefined;
  isLoading: boolean;
  pagination: Pagination | undefined;
  currentPage: number;
  onPageChange: (selected: number) => void;
}) => {
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={cx("mentor_list")}>
      <h1 className="">DANH SÁCH MENTOR</h1>

      <div className="mt-5">
        {mentors && mentors.length === 0 ? (
          <>
            <div>
              <h1 className="text-center">Không có Mentor nào</h1>
            </div>
          </>
        ) : (
          <>
            <div
              className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4 gy-xl-5 ${cx("list")}`}
            >
              {mentors?.map((item) => {
                return (
                  <div className="col" key={item.USER_ID}>
                    <div className={`card shadow-lg ${cx("list_item")}`}>
                      <div className={cx("list-item-img")}>
                        <img
                          src={item.avatar ?? "/assets/images/mentor1.jpg"}
                          width={"100%"}
                          height={"100%"}
                          alt={`${item.salutation} ${item.lastName} ${item.firstName}`}
                          onClick={() =>
                            navigate(`/mentor/profile/${item.USER_ID}`)
                          }
                        />
                      </div>
                      <div className="card-body">
                        <div className={cx("list-item-title")}>
                          <h5 className="m-0">{`${item.salutation} ${item.lastName} ${item.firstName}`}</h5>
                        </div>

                        <div className={cx("list-item-content")}>
                          <p className="card-text">{`${item.salutation} ${item.lastName} ${item.firstName}`}</p>
                        </div>

                        <div className="text-center">
                          <i className="fa-solid fa-star fs-4 text-warning"></i>
                          <i className="fa-solid fa-star fs-4 text-warning"></i>
                          <i className="fa-solid fa-star fs-4 text-warning"></i>
                          <i className="fa-solid fa-star fs-4 text-warning"></i>
                          <i className="fa-solid fa-star fs-4 text-warning"></i>
                        </div>

                        <div className="hstack gap-3 mt-3">
                          <div className="d-flex">
                            <i className="fa-solid fa-user-tie"></i>
                            <h6 className="mb-0 ms-2 text-primary">
                              {item.totalCompletedMentees} Mentee
                            </h6>
                          </div>
                          <div className="ms-auto">
                            <div className="d-flex">
                              <i className="fa-solid fa-heart"></i>
                              <h6 className="mb-0 ms-2 text-primary">100</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          className="shadow-lg"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Kết nối Mentor
                        </button>
                      </div>
                    </div>
                  </div>
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
            {/* <ModalRegisterMentor /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ListMentors;
