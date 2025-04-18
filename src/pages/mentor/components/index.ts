import React from "react";
import Banner from "./Banner/Banner";
import SearchBar from "./SearchBar/SearchBar";

const ListMentors = React.lazy(() => import("./ListMentors/ListMentors"));
export { Banner, ListMentors, SearchBar };
