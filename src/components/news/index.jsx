import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./news.module.scss";
import NewsItem from "./item";

const News = ({
  news,
  totalPages,
  handlePageChange,
  getPageFromQuery,
  onUpvote,
  onHide,
}) => {
  let location = useLocation();

  return (
    <div className={styles.newsWrapper}>
      <div className={styles.newsHeader}>
        <div className="txt-center">Comments</div>
        <div className="txt-center">Votes Count</div>
        <div className="txt-center">Upvote</div>
        <div>News Details</div>
      </div>

      {news.map((newsItem) => (
        <NewsItem
          {...newsItem}
          key={newsItem.objectID}
          onUpvote={onUpvote}
          onHide={onHide}
        />
      ))}

      <div className={`${styles.pagination} p-v-lg`}>
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
    </div>
  );
};

export default News;
