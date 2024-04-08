export const userSlice = (set) => ({
    userName: '',
    token: '',
    updateUserName: (currentUserName) => set((state) => ({ ...state, userName: currentUserName })),
    updateToken: (currentToken) => set((state) => ({ ...state, token: currentToken }))
});