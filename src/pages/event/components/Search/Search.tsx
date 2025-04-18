import React, { useRef } from "react";

import styles from "./styles/search.module.scss";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Search = ({
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
    <div className={`${cx("content_search")} shadow-lg`}>
      <h3>Tìm kiếm</h3>
      <form onSubmit={handleSearchSubmit}>
        <div className="input-group shadow-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên sự kiện"
            aria-label="Search events"
            ref={inputRef}
          />
          <button
            className="btn"
            type="submit"
            id="button-addon2"
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
