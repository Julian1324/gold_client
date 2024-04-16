import { constants } from "../context/constants";
import axiosInstance from "./axiosInstance";

export const signUpUser = async ({ name, email, password }) => {
    try {
        const response = await axiosInstance.post(
            `${constants.API_URL + constants.USER_SIGNUP}`,
            { name, email, password }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingRegister: false,
            alertModalShow: true,
        }
    } catch (error) {
        throw error;
    }
}

export const signInUser = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post(
            `${constants.API_URL + constants.USER_SIGNIN}`,
            { email, password }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingLogin: false,
            alertModalShow: true,
        }
    } catch (error) {
        throw error;
    }
}

export const getUser = async ({ headers }) => {
    try {
        const response = await axiosInstance.get(
            `${constants.API_URL + constants.USER_INFO}`,
            { headers }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingReq: false,
        }
    } catch (error) {
        throw error;
    }
}

export const setUser = async ({ name, email, headers }) => {
    try {
        const response = await axiosInstance.post(
            `${constants.API_URL + constants.USER_INFO}`,
            { name, email },
            { headers }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingReq: false,
        }
    } catch (error) {
        throw error;
    }
}

export const setPassword = async ({ currentPassword, newPassword, headers }) => {
    try {
        const response = await axiosInstance.post(
            `${constants.API_URL + constants.USER_SETPASSWORD}`,
            { currentPassword, newPassword },
            { headers }
        );
        if (response.status === 200) return {
            data: response.data,
            loadingReq: false,
        }
    } catch (error) {
        throw error;
    }
}

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(
            `${constants.API_URL + constants.GET_CATEGORIES}`
        );
        if (response.status === 200) return {
            data: response.data,
        }
    } catch (error) {
        throw error;
    }
}

export const getProductsByCategory = async ({ category_id, currentCategoryPage }) => {
    try {
        const response = await axiosInstance.get(
            `${constants.API_URL + constants.GET_PRODUCTS_BY_CATEGORY}?${constants.PARAMS_CATEGORY_ID + category_id}&${constants.PARAMS_PAGE + currentCategoryPage}`,
        )
        if (response.status === 200) return {
            data: response.data,
            loadingReq: false,
        }
    } catch (error) {
        throw error;
    }
}

export const getProduct = async ({ _id }) => {
    try {
        const response = await axiosInstance.get(
            `${constants.API_URL + constants.GET_PRODUCT_BY_ID}?${constants.PARAMS_PRODUCT + _id}`,
        )
        if (response.status === 200) return {
            data: response.data,
            loadingReq: false,
        }
    } catch (error) {
        throw error;
    }
}