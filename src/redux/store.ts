import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { GameSliceInterface } from "./slices/GameSlice";
import userReducer, { UserSliceInterface } from "./slices/UserSlice";
import appReducer, { AppSliceInterface } from "./slices/appSlice";
import historyReducer, { HistorySliceInterface } from "./slices/historySlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer,
        app: appReducer,
        history: historyReducer,
    },
});

export type RootState = {
    game: GameSliceInterface;
    user: UserSliceInterface;
    app: AppSliceInterface;
    history: HistorySliceInterface;
};

export type AppDispatch = typeof store.dispatch;
export default store;
