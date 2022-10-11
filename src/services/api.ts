import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "8bf5400285ae16ff4fc0fbfa3949031c",
        language: "pt",
        include_adult: false,
    },
});


