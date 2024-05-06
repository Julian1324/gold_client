export const cartSlice = (set, get) => ({
    items: [],
    itemAdded: false,
    setItemAdded: (newItemAdded) => set(state => ({...state, itemAdded: newItemAdded})),
    getItemAdded: () => get().itemAdded,
    addItem: (newItem, currentQuantity) => set((state) => {
        const stateItems = [...state.items];
        const objFinded = stateItems.find((item) => item.name === newItem.name);
        if (!stateItems.length || !objFinded) return { ...state, items: [...stateItems, newItem], itemAdded: true };
        let updatedItemAdded = true;
        const updatedItems = stateItems.map((item) => {
            const sumQuantityToBuy = item.quantityToBuy + newItem.quantityToBuy;
            const objToReturn = {
                ...item,
                quantityToBuy: sumQuantityToBuy >= currentQuantity ? currentQuantity : sumQuantityToBuy
            };
            if(sumQuantityToBuy > currentQuantity) updatedItemAdded = false;
            if (item.name === newItem.name) return objToReturn;
            return item;
        });
        return { ...state, items: [...updatedItems], itemAdded: updatedItemAdded }
    }),
    setItems: (updatedItems) => set((state) => ({ ...state, items: [...updatedItems] })),
    getSubtotal: () => get().items.reduce((acc, item) => {
        acc += (item.price * item.quantityToBuy) - (!!item.discount && item.price * item.quantityToBuy * item.discount / 100);
        return acc;
    }, 0)
});