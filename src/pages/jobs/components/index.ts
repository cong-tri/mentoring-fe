import React from "react";

import Banner from "./Banner/Banner";
import SearchBar from "./SearchBar/SearchBar";
import SearchFilter from "./SearchFilter/SearchFilter";
import OffCanvasSearch from "./OffCanvasSearch/OffCanvasSearch";

const ListJobs = React.lazy(() => import("./ListJobs/ListJobs"));

export { Banner, SearchBar, SearchFilter, ListJobs, OffCanvasSearch };
