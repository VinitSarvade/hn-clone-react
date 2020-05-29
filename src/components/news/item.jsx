import React from "react";

import styles from "./news.module.scss";
import { getRelativeTime } from "utils/date";

const NewsItem = ({
  author,
  created_at_i,
  num_comments,
  points,
  title,
  story_text,
  comment_text,
  story_title,
  story_url,
  url,
  objectID,
  onUpvote,
  onHide,
}) => {
  const handleUpvoteClick = () => {
    onUpvote(objectID);
  };

  const handleHideClick = () => {
    onHide(objectID);
  };

  const itemUrl = url || story_url ? new URL(url || story_url) : null;
  const pointsClass =
    points >= 100 ? styles.high : points >= 50 ? styles.mid : "";

  return (
    <div className={styles.newsItem}>
      <div className="txt-center">{num_comments || 0}</div>
      <div className={`txt-center ${pointsClass}`}>{points || "-"}</div>
      <div className="txt-center txt-light">
        <span className="pointer" onClick={handleUpvoteClick}>
          &#9650;
        </span>
      </div>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.title}
        >
          {title || story_title || comment_text || story_text}
        </a>
        {itemUrl && (
          <a
            href={itemUrl.protocol + "//" + itemUrl.host}
            target="_blank"
            className="txt-md txt-light m-l-sm"
            rel="noopener noreferrer"
          >
            ({itemUrl.host.replace("www.", "")})
          </a>
        )}
        <span className="txt-md m-l-sm">
          <span className="txt-light">by</span> {author}
        </span>
        <span className="txt-md txt-light m-l-sm">
          {getRelativeTime(created_at_i * 1000)}
        </span>
        <button
          className={`${styles.hideBtn} txt-md pointer txt-light`}
          onClick={handleHideClick}
        >
          [ <span className="txt-dark">hide</span> ]
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
