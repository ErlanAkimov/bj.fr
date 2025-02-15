import { createSlice } from "@reduxjs/toolkit";
import { NotificationInterface } from "../../types/types";
export interface AppSliceInterface {
    inGame: boolean;
    depositModal: boolean;
    withdrawModal: boolean;
    notifications: NotificationInterface[];
    showFaq: boolean;
}

const initialState: AppSliceInterface = {
    inGame: false,
    depositModal: false,
    withdrawModal: false,
    notifications: [],
    showFaq: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setInGame: (state, { payload }) => {
            state.inGame = payload;
        },
        setDepositModal: (state, { payload }) => {
            state.depositModal = payload;
        },
        pushNotification: (state, { payload }) => {
            state.notifications.push(payload);
        },
        removeNotification: (state, { payload }) => {
            state.notifications = state.notifications.filter((notification) => notification.notificationId !== payload);
        },

        updateNotificationOrder: (state, action) => {
            state.notifications = action.payload;
        },

        setWithdrawModal: (state, { payload }) => {
            state.withdrawModal = payload;
        },

        setShowFaq: (state, { payload }) => {
            state.showFaq = payload;
        },
    },
});

export const {
    updateNotificationOrder,
    setInGame,
    pushNotification,
    removeNotification,
    setDepositModal,
    setWithdrawModal,
    setShowFaq,
} = appSlice.actions;
export default appSlice.reducer;
