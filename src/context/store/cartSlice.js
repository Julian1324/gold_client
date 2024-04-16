export const cartSlice = (set) => ({
    items: [],
    addItem: (newItem) => set((state) => ([ ...state, newItem ])),
    setItems: (updatedItems) => set(() => ([...updatedItems]))
});