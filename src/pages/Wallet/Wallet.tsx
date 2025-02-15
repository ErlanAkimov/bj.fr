import React, { useEffect } from "react";
import styles from "./Wallet.module.scss";
import { wa } from "../../main";
import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useMotionValue, useTransform, animate, motion } from "motion/react";
import { setDepositModal, setWithdrawModal } from "../../redux/slices/appSlice";
import { api } from "../../axios";
import { setOrders } from "../../redux/slices/historySlice";
import OrderSkeleton from "./OrderSkeleton";
import HistoryList from "./HistoryList";
const Wallet: React.FC = () => {
    const wallet = useTonWallet();
    const [tc] = useTonConnectUI();
    const user = useAppSelector((state) => state.user);
    const count = useMotionValue(0);
    const balance = useTransform(() => count.get().toFixed(2));
    const dispatch = useAppDispatch();
    const wAddress = useTonAddress();
    const history = useAppSelector((state) => state.history);

    useEffect(() => {
        const controls = animate(count, user.balance, { duration: 0.5 });
        return () => controls.stop();
    }, [user.balance]);

    const handleOpenDepositModal = () => {
        dispatch(setDepositModal(true));
    };

    const share = () => {
        window.Telegram.WebApp.openTelegramLink(
            `https://t.me/share/url?url=https://t.me/b21_project_bot?start=${
                window.Telegram.WebApp.initDataUnsafe.user.id
            }`
        );
    };

    const handleWithdraw = () => {
        dispatch(setWithdrawModal(true));
    };

    useEffect(() => {
        if (history.orders === null) {
            api.get("/auth/history/orders?limit=30&skip=0").then((res) => {
                dispatch(setOrders(res.data));
            });
        }

        console.log(history.orders)
    }, []);

    return (
        <div className={styles.walletPage}>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <div className={styles.leftside}>
                        <div className={styles.avatar}>
                            <img src={wa.initDataUnsafe?.user?.photo_url} alt="avatar" />
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{wa.initDataUnsafe.user.id}</h3>
                            <p className={styles.wallet}>
                                {wallet ? wAddress.slice(0, 2) + "..." + wAddress.slice(-4) : "wallet not connected"}
                            </p>
                        </div>
                    </div>

                    <div className={styles.balance}>
                        <p className={styles.balanceText}>Balance:</p>
                        <motion.pre className={styles.balanceAmount}>{balance}</motion.pre>
                    </div>
                </div>

                <div className={styles.buttons}>
                    {wallet ? (
                        <>
                            <button onClick={handleOpenDepositModal}>Deposit</button>
                            <button onClick={handleWithdraw}>Withdraw</button>
                        </>
                    ) : (
                        <button onClick={() => tc.openModal()}>Connect wallet</button>
                    )}
                </div>
            </div>

            <div className={`${styles.content} ${styles.ref}`} onClick={share}>
                <div className={styles.link}>https://t.me/b21_project_bot</div>
                <button className={styles.share}>Invite Frens</button>
            </div>

            <div className={styles.ordersBlock}>
                <h3 className={styles.title}>Transactions history:</h3>

                <div className={styles.ordersList}>
                    {history.orders === null ? <OrderSkeleton /> : <HistoryList list={history.orders} />}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
