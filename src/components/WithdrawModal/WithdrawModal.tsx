import React, { useEffect, useState } from "react";
import styles from "./WithdrawModal.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { pushNotification, removeNotification, setWithdrawModal } from "../../redux/slices/appSlice";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { api } from "../../axios";
import { pushOrder } from "../../redux/slices/historySlice";
import { updateBalance } from "../../redux/slices/UserSlice";

const WithdrawModal: React.FC = () => {
    const wallet = useTonWallet();
    const dispatch = useAppDispatch();
    const app = useAppSelector((state) => state.app);

    const [tc] = useTonConnectUI();
    const [ton, setTon] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const closeModal = () => {
        dispatch(setWithdrawModal(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.includes(",")) {
            value = value.replace(",", ".");
        }

        // Проверка на наличие только цифр и точки
        if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
            try {
                setTon(value);
            } catch {}
        }
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

        api.post("/auth/withdraw", { amount: ton, wallet: wallet.account.address })
            .then((res) => {
                dispatch(
                    pushNotification({
                        notificationId: new Date().getTime().toString(),
                        title: "Success!",
                        description: "We are processing your transaction, it will be validated in 20-30 seconds",
                        icon: "good",
                    })
                );
                dispatch(updateBalance({ currency: "ton", value: -Number(ton) }));
                dispatch(setWithdrawModal(false));
                dispatch(pushOrder(res.data.order));
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.data.error === "Insufficient balance") {
                    dispatch(
                        pushNotification({
                            notificationId: new Date().getTime().toString(),
                            title: "Error!",
                            description: "Not enough balance to withdraw",
                            icon: "bad",
                        })
                    );
                }

                if (error.response.data.error === "Internal server error") {
                    dispatch(
                        pushNotification({
                            notificationId: new Date().getTime().toString(),
                            title: "Error!",
                            description: "Internal server error",
                            icon: "bad",
                        })
                    );
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        let notificationId = new Date().getTime().toString();
        if (app.withdrawModal) {
            dispatch(
                pushNotification({
                    notificationId,
                    title: "Notification!",
                    description: "Your money will be sent to the connected wallet!",
                    icon: "good",
                })
            );
        }

        return () => {
            dispatch(removeNotification(notificationId));
        };
    }, [app.withdrawModal]);

    return (
        <AnimatePresence>
            {app.withdrawModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.wrapper}
                    onClick={closeModal}
                >
                    <label className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.title}>Withdraw</h3>
                        <div className={styles.input}>
                            <p className={styles.text}>AMOUNT</p>
                            <input inputMode="decimal" value={ton} onChange={handleChange} type="number" />
                        </div>

                        <button className={styles.btn} onClick={handleSendTransaction}>
                            {wallet ? (loading ? "loading..." : "Withdraw") : "Connect Wallet"}
                        </button>
                    </label>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WithdrawModal;
