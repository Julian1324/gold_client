export const cartSlice = (set, get) => ({
    items: [],
    addItem: (newItem) => set((state) => {
        const stateItems = [...state.items];
        const objFinded = stateItems.find((item) => item.name === newItem.name);
        if (!stateItems.length || !objFinded) return { ...state, items: [...state.items, newItem] };
        const objUnified = stateItems.reduce((acc, item) => {
            if (item.name === newItem.name) Object.assign(acc, { ...item, quantityToBuy: item.quantityToBuy + newItem.quantityToBuy });
            return acc;
        }, {});
        const updatedItems = stateItems.map((item) => {
            if (item.name === objUnified.name) return { ...objUnified };
            return item;
        });
        return { ...state, items: [...updatedItems] }
    }),
    setItems: (updatedItems) => set((state) => ({ ...state, items: [...updatedItems] })),
    getSubtotal: () => get().items.reduce((acc, item) => {
        acc += (item.price * item.quantityToBuy) - (!!item.discount && item.price * item.quantityToBuy * item.discount / 100);
        return acc;
    }, 0)
});