export const sortDepletedProductsLast = (products = []) => {
    return [...products].sort((a, b) => {
        const aDepleted = (a?.quantity ?? 0) <= 0 ? 1 : 0;
        const bDepleted = (b?.quantity ?? 0) <= 0 ? 1 : 0;
        return aDepleted - bDepleted;
    });
};
