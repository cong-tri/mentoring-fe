import React, { useEffect, useState } from "react";
import { useGetAllMentor } from "../../hooks";

import { Helmet } from "react-helmet";

import { Banner, SearchBar } from "./components";
import { Loader } from "../../components";

import classNames from "classnames/bind";
import styles from "./styles/mentor.module.scss";

const ListMentors = React.lazy(
  () => import("./components/ListMentors/ListMentors")
);

const cx = classNames.bind(styles);

const MentorPage = () => {
  // for current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // for value search
  const [search, setSearch] = useState<string>("");
  // for check submit search
  const [isSearchSubmitted, setIsSearchSubmitted] = useState<boolean>(false);

  // function custom hook useGetEvent
  const { data, isLoading, error } = useGetAllMentor({
    // param query
    page: currentPage,
    search,
  });

  useEffect(() => {
    if (data) {
      if (isSearchSubmitted && data.data && data.data.length > 0) {
        setIsSearchSubmitted(false); // Reset the flag after showing toast
      } else if (isSearchSubmitted && data.data && data.data.length === 0) {
        setSearch(""); // Reset the value search to update the previous data
        setIsSearchSubmitted(false); // Reset the flag after showing toast
      }
    }
  }, [data, isSearchSubmitted]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Mentoring - Mentor</title>
      </Helmet>

      <section className={cx("mentor")}>
        <Banner />
        <div className="container">
          <SearchBar
            setSearch={setSearch}
            setIsSearchSubmitted={setIsSearchSubmitted}
          />
          <ListMentors
            mentors={data?.data}
            isLoading={isLoading}
            pagination={data?.pagination}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
};

export default MentorPage;
