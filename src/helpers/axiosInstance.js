import axios from "axios";
import { constants } from "../context/constants";
import { getUserSlice } from "../context/store/store";

const axiosInstance = axios.create({
    baseURL: constants.API_URL
});

axiosInstance.interceptors.request.use(
    (req) => {
        const token= '';
        if (!token) return;
        req.headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
        return req;
    },
    (err) => err
);

export default axiosInstance;