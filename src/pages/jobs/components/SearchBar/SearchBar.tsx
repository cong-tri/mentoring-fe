import classNames from "classnames/bind";
import styles from "./styles/searchBar.module.scss";
import { listCheck } from "../../../../constants/constant";

const cx = classNames.bind(styles);

const SearchBar = () => {
  return (
    <div className={`${cx("jobs_search")} d-none d-lg-block`}>
      <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 justify-content-between g-3 gy-xxl-0">
        <div className="col-12 col-md-6 col-xxl-5">
          <input
            className="form-control form-control-lg"
            type="search"
            placeholder="Nhập tên công việc"
          />
        </div>
        <div className="col-12 col-md-6 col-xxl-5">
          <select
            className="form-select form-select-lg"
            aria-label="Large select example"
          >
            <option selected>Chọn thành phố</option>
            <option value="1">Thành phố Hồ Chí Minh</option>
            <option value="2">Thành phố Hà Nội</option>
            <option value="3">Thành phố Đà Nẵng</option>
          </select>
        </div>
        <div className="col-6 col-md-6 col-xxl-1">
          <button className="btn btn-lg btn-light w-100">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-6 col-md-6 col-xxl-1">
          <button
            className="btn btn-lg btn-light w-100"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i className="fa-solid fa-sliders"></i>
          </button>
        </div>
      </div>

      <div className="collapse mt-5" id="collapseExample">
        <div className="row row-cols-1 row-cols-lg-4">
          {listCheck.map((index) => {
            return (
              <div
                className="col accordion"
                id="accordionPanelsStayOpenExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${index.id}`}
                      aria-expanded="true"
                      aria-controls={index.id}
                    >
                      {index.name}
                    </button>
                  </h2>
                  <div id={index.id} className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <div>
                        {index.children?.map((index) => {
                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={index.id}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={index.id}
                              >
                                {index.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
