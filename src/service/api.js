import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getNews = async (options) => {
  const params = { page: options.page || 0, tags: "front_page" };
  const response = await apiClient.get("/search", { params });
  return response.data;
};

export const getSource = () => {
  return axios.CancelToken.source();
};
