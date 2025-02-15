import { createSlice } from "@reduxjs/toolkit";
import { GameType, OrderType } from "../../types/types";

export interface HistorySliceInterface {
    games: GameType[] | null;
    orders: OrderType[] | null;
}

const initialState: HistorySliceInterface = {
    games: null,
    orders: null,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.games = action.payload;
        },
        pushHistory: (state, action) => {
            if (state.games === null) return;

            state.games.unshift(action.payload);
            if (state.games.length > 20) {
                state.games.pop();
            }
        },
        setOrders: (state, action) => {
            state.orders = action.payload.reverse();
        },
        pushOrder: (state, action) => {
            if (state.orders === null) return;

            state.orders.unshift(action.payload);
            if (state.orders.length > 20) {
                state.orders.pop();
            }
        },
        updateOrder: (state, action) => {
            if (state.orders === null) return;

            const order = state.orders.find((order) => order.orderId === action.payload.orderId);
            if (order) {
                order.status = action.payload.status;
            }
        }
    },
});

export const { setHistory, pushHistory, setOrders, pushOrder, updateOrder } = historySlice.actions;

export default historySlice.reducer;
