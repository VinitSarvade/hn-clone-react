import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NODE_API_URL,
});

export const getNews = async (options) => {
  const params = {
    page: options.page && options.page > 0 ? options.page : 0,
    tags: "story",
  };
  const response = await apiClient.get("/search", { params });
  return response.data;
};

export const getSource = () => {
  return axios.CancelToken.source();
};
