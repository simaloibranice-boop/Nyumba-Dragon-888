import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api"
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        console.log("🐉 Dragon API Request");
        console.log("URL:", config.url);
        console.log("Token exists:", !!token);

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;

            console.log(
                "Authorization:",
                config.headers.Authorization.substring(0, 30) + "..."
            );
        } else {
            console.log("No token found.");
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
