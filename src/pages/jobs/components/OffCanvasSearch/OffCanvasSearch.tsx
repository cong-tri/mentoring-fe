import classNames from "classnames/bind";
import SearchFilter from "../SearchFilter/SearchFilter";
import styles from "./styles/offcanvasSearch.module.scss";

const cx = classNames.bind(styles);

const OffCanvasSearch = () => {
  return (
    <>
      <div
        className={`offcanvas offcanvas-start ${cx("job-offcanvas-search")}`}
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Tìm kiếm công việc
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <SearchFilter />

          <div className="mt-4">
            <form action="">
              <div className="mb-3 mb-md-4">
                <input
                  type="search"
                  placeholder="Nhập tên việc làm"
                  className="form-control"
                />
              </div>

              <div className="mb-3 mb-md-4">
                <select
                  className="form-select form-select"
                  aria-label="Large select example"
                >
                  <option selected>Chọn thành phố</option>
                  <option value="1">Thành phố Hồ Chí Minh</option>
                  <option value="2">Thành phố Hà Nội</option>
                  <option value="3">Thành phố Đà Nẵng</option>
                </select>
              </div>

              <div className="">
                <button className={cx("offcanvas-search-btn")}>Tìm kiếm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvasSearch;
