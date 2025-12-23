import React from "react";
import LatestNewsHome from "./LatestNewsHome";

const LatestNews = ({ activeNews }) => {
  return (
    <div>
      <LatestNewsHome activeNews={activeNews} />
    </div>
  );
};

export default LatestNews;
