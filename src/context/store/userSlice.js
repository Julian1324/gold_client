export const userSlice = (set, get) => ({
    userName: '',
    headers: {},
    wallet: 50000,
    lastMovement: {},
    updateUserName: (currentUserName) => set((state) => ({ ...state, userName: currentUserName })),
    updateHeaders: (currentToken) => set((state) => (
        {
            ...state,
            headers:
                currentToken ? { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' } : {}
        }
    )),
    updateWallet: (newWallet) => set((state) => ({ ...state, wallet: newWallet })),
    updateLastMovement: (newLastMovemet) => set((state) => ({ ...state, lastMovement: newLastMovemet })),
    getWallet: () => get().wallet,
    getLastMovement: () => get().lastMovement
});