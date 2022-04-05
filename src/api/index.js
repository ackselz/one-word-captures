import axios from "axios";

const url = "https://one-word-captures-backend.herokuapp.com/";

axios.defaults.withCredentials = true;

export const fetchPosts = () => axios.get(`${url}/posts`);
export const fetchPostsBySearch = (searchQuery) =>
  axios.get(`${url}/posts/search?searchQuery=${searchQuery || "none"}`);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likePost`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);

export const signUp = (userData) => axios.post(`${url}/signUp`, userData);
export const signIn = (userData) => axios.post(`${url}/signIn`, userData);
export const signOut = () => axios.post(`${url}/signOut`);
