export const cartSlice = (set) => ({
    items: [],
    addItem: (newItem) => set((state) => ({...state, items: [...state.items, newItem] })),
    setItems: (updatedItems) => set((state) => ({...state, items: [...updatedItems] }))
});