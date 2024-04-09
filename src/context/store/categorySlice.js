export const categorySlice = (set) => ({
    categories: [],
    updateCategories: (newCategories) => set((state) => ({ ...state, categories: newCategories })),
});