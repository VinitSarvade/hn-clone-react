import React from "react";
import { useLocation } from "react-router-dom";

import "./news.scss";
import NewsItem from "./item";
import Loader from "../../components/loader";
import NewsVotesChart from "../../components/votes-chart";

const News = ({
  news,
  totalPages,
  handlePageChange,
  getPageFromQuery,
  onUpvote,
  onHide,
  loading,
}) => {
  let location = useLocation();

  return (
    <div className="news-wrapper">
      <div className="news-header">
        <div className="txt-center">Comments</div>
        <div className="txt-center">Votes Count</div>
        <div className="txt-center">Upvote</div>
        <div>News Details</div>
      </div>

      {loading && <Loader />}

      {!loading && (
        <>
          {news.map((newsItem) => (
            <NewsItem
              {...newsItem}
              key={newsItem.objectID}
              onUpvote={onUpvote}
              onHide={onHide}
            />
          ))}

          <div className="pagination p-v-lg">
            <button
              className={`pointer font-wt-bold p-h-md`}
              onClick={handlePageChange(-1)}
              disabled={getPageFromQuery(location.search) <= 0}
            >
              Prev
            </button>
            <button
              className={`pointer font-wt-bold p-h-md`}
              onClick={handlePageChange(1)}
              disabled={totalPages <= getPageFromQuery(location.search) + 1}
            >
              Next
            </button>
          </div>

          <NewsVotesChart news={news} />
        </>
      )}
    </div>
  );
};

export default News;
