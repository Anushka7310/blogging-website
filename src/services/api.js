import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getBlogPostsDetails = () => {
  return axios.get(`${API_URL}/posts`);
};

export const getCommentsForPost = (postId) => {
  return axios.get(`${API_URL}/comments?postId=${postId}`);
};

export const getAuthorInfo = (userId) => {
  return axios.get(`${API_URL}/users?id=${userId}`);
};
