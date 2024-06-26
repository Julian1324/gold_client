export const userSlice = (set, get) => ({
    userName: '',
    headers: {},
    wallet: 50000,
    updateUserName: (currentUserName) => set((state) => ({ ...state, userName: currentUserName })),
    updateHeaders: (currentToken) => set((state) => (
        {
            ...state,
            headers:
                currentToken ? { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' } : {}
        }
    )),
    updateWallet: (newWallet) => set((state) => ({ ...state, wallet: newWallet })),
    getWallet: () => get().wallet
});