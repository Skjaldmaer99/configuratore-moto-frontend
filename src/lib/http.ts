import axios from "axios";
import myEnv from "./env";

export const http = axios.create({
    baseURL: myEnv.backendApiUrl
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})