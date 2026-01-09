import { api } from "./axios";


export const getPosts = () => api.get("/posts");
export const getPostById = (id: number | string) => api.get(`/posts/${id}`);
export const createPost = (data: {
    title: string;
    body: string;
    userItd: number;
}) => api.post("/posts/add", data);