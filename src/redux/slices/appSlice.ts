import { createSlice } from "@reduxjs/toolkit";
import { NotificationInterface } from "../../types/cardType";
export interface AppSliceInterface {
    inGame: boolean;
    depositModal: boolean;
    withdrawModal: boolean;
    notifications: NotificationInterface[];
}

const initialState: AppSliceInterface = {
    inGame: false,
    depositModal: false,
    withdrawModal: false,
    notifications: [],
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
    },
});

export const { updateNotificationOrder, setInGame, pushNotification, removeNotification, setDepositModal, setWithdrawModal } =
    appSlice.actions;
export default appSlice.reducer;
