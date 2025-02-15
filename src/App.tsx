import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import { api } from "./axios";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/slices/UserSlice";

// pages
import Game from "./pages/Game/Game";
import Homepage from "./pages/Homepage/Homepage";
import Tasks from "./pages/Tasks/Tasks";
import History from "./pages/History/History";
import Wallet from "./pages/Wallet/Wallet";

// components
import Nav from "./components/Nav/Nav";
import Notifications from "./components/Notifications/Notifications";
import DepositModal from "./components/DepositModal/DepositModal";

// hooks
import { useFindMyGame } from "./hooks/useFindMyGame";
import WithdrawModal from "./components/WithdrawModal/WithdrawModal";
import useWs from "./hooks/useWs";
import FaqStories from "./components/FaqStories/FaqStories";


const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get("tgWebAppStartParam");

    useEffect(() => {
        let point = ref ? `/auth/user?ref=${ref}` : "/auth/user";
        api.get(point).then((res) => {
            dispatch(setUser(res.data));
        });
    }, []);

    useFindMyGame();
    useWs();

    return (
        <div className={styles.app}>
            <FaqStories />

            <Notifications />
            <DepositModal />
            <WithdrawModal />
            <Routes>
                <Route path={"/game"} element={<Game />} />
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/tasks"} element={<Tasks />} />
                <Route path={"/history"} element={<History />} />
                <Route path={"/wallet"} element={<Wallet />} />
            </Routes>
            <Nav />
        </div>
    );
};

export default App;
