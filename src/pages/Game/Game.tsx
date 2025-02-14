import React from "react";
import styles from "./Game.module.scss";

import { useAppSelector } from "../../redux/hooks";
import GameOver from "../../components/GameOver/GameOver";
import useGameActions from "../../hooks/useGameActions";
import { AnimatePresence, motion } from "motion/react";
import Chip from "../../components/Chip/Chip";
import GameHands from "./components/GameHands";
import BettingPanel from "./components/BettingPanel";

const Game: React.FC = () => {
    const game = useAppSelector((state) => state.game);
    const inGame = useAppSelector((state) => state.app.inGame);
    const { startNewGame, hit, loading, stand } = useGameActions();

    return (
        <div className={styles.table}>
            <div className={styles.light} />
            {inGame ? <GameHands /> : <BettingPanel />}

            {inGame && (
                <div className={styles.gameButtons}>
                    <button className={styles.button} style={{ opacity: loading ? 0.5 : 1 }} onClick={hit}>
                        hit
                    </button>
                    <button className={styles.button} style={{ opacity: loading ? 0.5 : 1 }} onClick={stand}>
                        Stand
                    </button>
                </div>
            )}
            <AnimatePresence>
                {!inGame && (
                    <motion.div className={styles.startWrapper}>
                        <div className={styles.chipsList}>
                            {game.chips.map((chip, index: number) => (
                                <motion.div
                                    key={chip.nominal}
                                    whileTap={{ scale: 0.8 }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Chip index={index} nominal={chip.nominal} color={chip.color} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileTap={{ scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.15 }}
                            className={styles.startbtn}
                            onClick={startNewGame}
                        >
                            Start
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <GameOver />
        </div>
    );
};

export default Game;
