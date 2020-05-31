import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import News from "../../components/news";
import DataContext from "../app/data-context";
import { getNews, getSource } from "../../services/api";
import {
  getUpvotes,
  getHiddenItems,
  setUpvotes,
  setHiddenItem,
} from "../../services/localStorage";

const NewsContainer = () => {
  const getInitialState = (dataProviderValue) => {
    if (dataProviderValue) {
      return dataProviderValue;
    }
    if (window.__INIT_DATA) {
      const data = window.__INIT_DATA;
      delete window.__INIT_DATA;
      return data;
    }
    return {};
  };
  const contextValue = useContext(DataContext);
  const initialState = getInitialState(contextValue);

  const [news, setNews] = useState(initialState.hits || []);
  const [totalPages, setTotalPages] = useState(initialState.totalPages);
  const [loading, setLoading] = useState(!initialState.hits);

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
        setLoading(true);
        const response = await getNews({
          page: options.page,
          cancelToken: options.cancelToken,
        });
        setNews(enrichWithLocalData(response.hits));
        setTotalPages(response.nbPages);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    },
    [enrichWithLocalData]
  );

  useEffect(() => {
    const page = getPageFromQuery(location.search);
    if (page !== initialState.page) {
      const source = getSource();
      fetchNews({
        page,
        cancelToken: source.token,
      });

      return () => {
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNews, location]);

  const getStoredItemUpVotes = (id) => {
    const upvotes = getUpvotes();
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
    const upvotes = getUpvotes();
    setUpvotes(id, upvotes && upvotes[id] ? upvotes[id] + 1 : 1);

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
      (newsItem) => !hiddenItems.includes(newsItem.objectID)
    );
    setNews(newsWithoutHiddenItems);
  };

  return (
    <div className="container">
      <News
        handlePageChange={handlePageChange}
        news={news}
        totalPages={totalPages}
        getPageFromQuery={getPageFromQuery}
        onUpvote={onUpvote}
        onHide={onHide}
        loading={loading}
      />
    </div>
  );
};

NewsContainer.getStaticProps = async (req) => {
  return await getNews({
    page: req.query && req.query.page ? req.query.page - 1 : null,
  });
};

export default NewsContainer;
