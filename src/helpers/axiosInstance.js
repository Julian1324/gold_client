import axios from "axios";
import { constants } from "../context/constants";

const axiosInstance = axios.create({
    baseURL: constants.API_URL
});

axiosInstance.interceptors.request.use(
    async (req) => {
        // const response = await axios.get('https://api.ipify.org/?format=json');
        // req.headers.ip = response.data.ip;
        return req;
    },
    (err) => err
);

export default axiosInstance;