import classNames from "classnames/bind";
import styles from "./styles/searchBlogs.module.scss";

import { useState } from "react";
import { hanndleApiGetBlogSearch } from "../../../../apis/blog";
import { Blog } from "../../../../types";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const SearchBlogs = ({
  setSearchResults,
}: {
  setSearchResults: React.Dispatch<React.SetStateAction<Blog[]>>;
}) => {
  const [searchItem, setSearchItem] = useState("");

  // CALL API GET DATA
  const handleSearch = async () => {
    setSearchResults([]);
    const response = await hanndleApiGetBlogSearch(searchItem);
    if (response?.status === 200 && response.data.length > 0) {
      setSearchResults(response.data);
    } else {
      toast.error("Không tìm thấy tin tức nào liên quan!");
    }
  };

  return (
    <>
      <div className={cx("search-box")}>
        <h3 className={cx("title")}>Tìm kiếm</h3>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button className={cx("btn")} onClick={handleSearch}>
            <i className="fas fa-search text-white" />
          </button>
        </div>
      </div>
    </>
  );
};
export default SearchBlogs;
