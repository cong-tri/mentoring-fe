import { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./styles/searchBar.module.scss";
import { listCheck } from "../../../../constants/constant";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const SearchBar = ({
  setSearch,
  setIsSearchSubmitted,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const searchValue = inputRef.current.value.trim();

      if (searchValue) {
        setSearch(searchValue);
        setIsSearchSubmitted(true);
        inputRef.current.value = ""; // Clear the input
      } else {
        setSearch("");
        setIsSearchSubmitted(false);
        toast.error("Vui lòng nhập một giá trị hợp lệ.", {
          autoClose: 3000,
        });
      }
    }
  };
  return (
    <div className={cx("mentor_searchBar")}>
      <div className="row justify-content-between gx-0 gx-md-3">
        <form onSubmit={handleSearchSubmit}>
          <div className="row gy-3">
            <div className="col-12 col-md-10">
              <input
                className="form-control"
                type="text"
                placeholder="Nhập tên mentor"
                aria-label="Nhập tên mentor"
                ref={inputRef}
              />
            </div>
            <div className="col-6 col-md-1">
              <button
                className="btn btn-light w-100 h-100 d-flex justify-content-center align-items-center"
                type="submit"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="col-6 col-md-1">
              <button
                className="btn btn-light w-100 h-100 d-flex justify-content-center align-items-center"
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
        </form>
      </div>

      <div className="collapse mt-5" id="collapseExample">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-3 gy-lg">
          {listCheck.map((item, index) => {
            return (
              <div
                className="col accordion"
                id="accordionPanelsStayOpenExample"
                key={index}
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${item.id}`}
                      aria-expanded="true"
                      aria-controls={item.id}
                    >
                      {item.name}
                    </button>
                  </h2>
                  <div id={item.id} className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <div>
                        {item.children?.map((child, inx) => {
                          return (
                            <div className="form-check" key={inx}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={child.id}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={child.id}
                              >
                                {child.name}
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
