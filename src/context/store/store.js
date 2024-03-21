import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import secureLocalStorage from "react-secure-storage";
import { userSlice, cartSlice } from './userSlice.js';

const mySlices = {
    userSlice,
    cartSlice
};

const initGoldStore = () => {
    const myStore = {};
    Object.entries(mySlices).forEach(([key, value], myIndex) => {
        const storeCreated = create(
            persist(
                (value),
                {
                    name: 'GLDST0' + myIndex,
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
