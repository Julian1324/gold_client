export const cartSlice = (set, get) => ({
    items: [],
    showItems: false,
    addItem: (newItem) => set((state) => {
        const stateItems = [...state.items];
        const objFinded = stateItems.find((item) => item.name === newItem.name);
        if (!stateItems.length || !objFinded) return { ...state, items: [...stateItems, newItem] };
        const updatedItems = stateItems.map((item) => {
            if (item.name === newItem.name) return { ...item, quantityToBuy: item.quantityToBuy + newItem.quantityToBuy };
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