import React, { useEffect } from "react";
import styles from "./GameBalance.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { motion } from "motion/react";
import { shakeBalance } from "../../redux/slices/GameSlice";
import { setDepositModal } from "../../redux/slices/appSlice";

const GameBalance: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const game = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();

    const handleOpenDepositModal = () => {
        dispatch(setDepositModal(true));
    };

    useEffect(() => {
        if (user.balance < game.bet) {
            dispatch(shakeBalance(true));
            setTimeout(() => {
                dispatch(shakeBalance(false));
            }, 500);
        } else {
            dispatch(shakeBalance(false));
        }
    }, [user.balance, game.bet]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.infoPlace}
        >
            <div className={styles.balance}>
                <p className={styles.title}>Your balance</p>
                <motion.p
                    className={`${styles.balanceValue} ${game.shakeBalance ? styles.shake : ""}`}
                    style={{ color: user.balance >= game.bet ? "goldenrod" : "red" }}
                >
                    {user.balance.toFixed(2)} <span> TON</span>
                </motion.p>
            </div>

            <button className={styles.depBtn} onClick={handleOpenDepositModal}>
                Deposit
            </button>
        </motion.div>
    );
};

export default GameBalance;
