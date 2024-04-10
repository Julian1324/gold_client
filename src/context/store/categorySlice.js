export const categorySlice = (set, get) => ({
    categories: [],
    currentCategoryPage: 1,
    updateCategories: (newCategories) => set((state) => ({ ...state, categories: newCategories })),
    updateCurrentCategoryPage: (newPage) => set((state) => ({ ...state, currentCategoryPage: newPage })),
    getCategoryImageByID: (categoryID) => get().categories.reduce((acc, category) => {
        if (category._id === categoryID) acc['image'] = category.image;
        return acc;
    }, {})
});