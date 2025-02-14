import React, { useState } from "react";
import styles from "./DepositModal.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { pushNotification, setDepositModal } from "../../redux/slices/appSlice";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { api } from "../../axios";
import { pushOrder } from "../../redux/slices/historySlice";

const DepositModal: React.FC = () => {
    const wallet = useTonWallet();
    const dispatch = useAppDispatch();
    const app = useAppSelector((state) => state.app);
    const [tc] = useTonConnectUI();
    const [ton, setTon] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const closeModal = () => {
        dispatch(setDepositModal(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = e.target.value;
            // toNano(value).toString();
            setTon(value);
        } catch {}
    };

    const handleSendTransaction = () => {
        if (!wallet) {
            tc.openModal();
            return;
        }

        if (!ton || loading) {
            return;
        }

        setLoading(true);

        const transaction = {
            amount: ton,
            wallet: wallet.account.address,
        };

        api.post("/auth/deposit", transaction).then((res) => {
            tc.sendTransaction(res.data.transaction)
                .then(() => {
                    dispatch(
                        pushNotification({
                            notificationId: res.data.order.orderId,
                            title: "Transaction in process",
                            description: "We are processing your transaction, it will be completed in 1-2 minutes",
                            icon: 'good'
                        })
                    );
                    dispatch(pushOrder(res.data.order));
                    dispatch(setDepositModal(false));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        });
    };

    return (
        <AnimatePresence>
            {app.depositModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.wrapper}
                    onClick={closeModal}
                >
                    <label className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.title}>Deposit</h3>
                        <div className={styles.input}>
                            <p className={styles.text}>TON AMOUNT</p>
                            <input pattern="^\d+(\.\d+)?$" inputMode="decimal" value={ton} onChange={handleChange} type="number" />
                        </div>

                        <button className={styles.btn} onClick={handleSendTransaction}>
                            {wallet ? (loading ? "loading..." : "Deposit") : "Connect Wallet"}
                        </button>
                    </label>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DepositModal;
