export const cartSlice = (set, get) => ({
    items: [],
    addItem: (newItem) => set((state) => {
        const updatedItems = [...state.items];
        const arrayFiltered = updatedItems.filter((item) => item.name === newItem.name);
        console.log('arrayFiltered', arrayFiltered);
        if (!arrayFiltered.length) return { ...state, items: [...state.items, newItem] };
        const objectUnified = arrayFiltered.reduce((acc, item) => {
            acc = { ...item, quantityToBuy: (!!acc.quantityToBuy && acc.quantityToBuy) + newItem.quantityToBuy };
            return acc;
        }, {});
        return { ...state, items: [...state.items, objectUnified] }
    }),
    setItems: (updatedItems) => set((state) => ({ ...state, items: [...updatedItems] })),
    getSubtotal: () => get().items.reduce((acc, item) => {
        acc += (item.price * item.quantityToBuy) - (!!item.discount && item.price * item.quantityToBuy * item.discount / 100);
        return acc;
    }, 0)
});