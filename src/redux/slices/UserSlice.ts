import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceInterface {
    balance: number;
    usdt_balance: number;
    freeBalance: number;
}

const initialState: UserSliceInterface = {
    usdt_balance: 0,
    balance: 0,
    freeBalance: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateBalance: (state, action) => {
            if (action.payload.currency === "ton") {
                state.balance = Number(Number(state.balance + action.payload.value).toFixed(2));
                return;
            } else if (action.payload.currency === "usdt") {
                state.usdt_balance = Number(Number(state.usdt_balance + action.payload.value).toFixed(2));
                return;
            }
        },
        setUser: (_, action) => {
            if (action.payload.user === null) {
                return initialState;
            }
            return { ...action.payload.user };
        },

    },
});

export const { setUser, updateBalance } = userSlice.actions;

export default userSlice.reducer;
