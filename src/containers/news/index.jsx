import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import News from "components/news";
import { getNews, getSource } from "services/api";
import { getUpvotes, getHiddenItems } from "services/localStorage";
import { setHiddenItem } from "../../services/localStorage";

const NewsContainer = () => {
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  let history = useHistory();
  let location = useLocation();

  const enrichWithLocalData = useCallback((news) => {
    const withUpvotesAdded = news.map((newsItem) => {
      newsItem.points += getStoredItemUpVotes(newsItem.objectID);
      return newsItem;
    });
    const withHidenItemRemoved = withUpvotesAdded.filter(
      (newsItem) => !getHiddenItems().includes(newsItem.objectID)
    );
    return withHidenItemRemoved;
  }, []);

  const fetchNews = useCallback(
    async (options) => {
      try {
        const response = await getNews({
          page: options.page,
          cancelToken: options.cancelToken,
        });
        setNews(enrichWithLocalData(response.hits));
        setTotalPages(response.nbPages);
      } catch (err) {
        console.error(err);
      }
    },
    [enrichWithLocalData]
  );

  useEffect(() => {
    const source = getSource();
    fetchNews({
      page: getPageFromQuery(location.search),
      cancelToken: source.token,
    });

    return () => {
      source.cancel();
    };
  }, [fetchNews, location]);

  const getStoredItemUpVotes = (id) => {
    const upvotes = getUpvotes;
    return upvotes && upvotes[id] ? upvotes[id] : 0;
  };

  const getPageFromQuery = (query) => {
    const params = new URLSearchParams(query);
    const page = parseInt(params.get("page")) - 1;
    return page > 0 ? page : 0;
  };

  const handlePageChange = (change) => () => {
    history.push(`?page=${getPageFromQuery(location.search) + 1 + change}`);
  };

  const onUpvote = (id) => {
    const upvotes = JSON.parse(localStorage.getItem("upvotes"));
    localStorage.setItem(
      "upvotes",
      JSON.stringify({
        ...upvotes,
        [id]: upvotes && upvotes[id] ? upvotes[id] + 1 : 1,
      })
    );
    const upVotedNews = news.map((newsItem) => {
      if (newsItem.objectID === id) {
        newsItem.points += 1;
      }
      return newsItem;
    });
    setNews(upVotedNews);
  };

  const onHide = (id) => {
    setHiddenItem(id);
    const hiddenItems = getHiddenItems();
    const newsWithoutHiddenItems = news.filter(
      (newsItem) => !hiddenItems.has(newsItem.objectID)
    );
    setNews(newsWithoutHiddenItems);
  };

  return (
    <News
      handlePageChange={handlePageChange}
      news={news}
      totalPages={totalPages}
      getPageFromQuery={getPageFromQuery}
      onUpvote={onUpvote}
      onHide={onHide}
    />
  );
};

export default NewsContainer;
