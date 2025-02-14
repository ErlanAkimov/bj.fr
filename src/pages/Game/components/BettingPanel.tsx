import React from "react";
import styles from "../Game.module.scss";
import { motion } from "motion/react";
import { CloseIcon } from "../../../components/icons";
import GameBalance from "../../../components/GameBalance/GameBalance";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearBet } from "../../../redux/slices/GameSlice";

const BettingPanel: React.FC = () => {
    const game = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();
    const clearMyBet = () => {
        dispatch(clearBet());
    };

    return (
        <div className={styles.bet}>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className={styles.betPlace}>
                <div className={styles.yourBet}>
                    <h3 className={styles.title}>Place your bet</h3>
                    <p className={styles.betValue}>{game.bet.toFixed(2)}</p>
                </div>

                <motion.div whileTap={{ scale: 0.9 }} className={styles.clearbet} onClick={clearMyBet}>
                    <p className={styles.title}>Clear bet</p>
                    <CloseIcon />
                </motion.div>
            </motion.div>
            <GameBalance />
        </div>
    );
};

export default BettingPanel;
