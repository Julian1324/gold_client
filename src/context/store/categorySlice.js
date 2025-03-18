export const categorySlice = (set, get) => ({
    categories: [],
    updateCategories: (newCategories) => set((state) => ({ ...state, categories: newCategories })),
    getCategoryImageByID: (categoryID) => get().categories.reduce((acc, category) => {
        if (category._id === categoryID) acc['image'] = category.image;
        return acc;
    }, {}),
    getCategories: () => get().categories
});