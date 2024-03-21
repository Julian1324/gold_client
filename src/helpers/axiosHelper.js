import axios from "axios";
import { constants } from "../context/constants";

export const signUpUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(
            `${constants.API_URL + constants.USER_SIGNUP}`,
            { name, email, password }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingRegister: false,
            alertModalShow: true,
            reset: true
        }
    } catch (error) {
        throw error;
    }
}

export const signInUser = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${constants.API_URL + constants.USER_SIGNIN}`,
            { email, password }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingLogin: false,
            alertModalShow: true,
            reset: true
        }
    } catch (error) {
        throw error;
    }
}