import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import secureLocalStorage from "react-secure-storage";
import { userSlice } from './userSlice.js';
import { constants } from '../constants.js';

const mySlices = {
    userSlice,
};

const initGoldStore = () => {
    const myStore = {};
    Object.entries(mySlices).forEach(([key, value], myIndex) => {
        const storeCreated = create(
            persist(
                (value),
                {
                    name: constants.KEY_STORAGE_BASE + myIndex,
                    storage: createJSONStorage(() => secureLocalStorage)
                }
            )
        )
        Object.assign(myStore, {...myStore, [key]: storeCreated});
    });
    return myStore;
}

const goldStore = initGoldStore();

export const getUserSlice = goldStore.userSlice;
