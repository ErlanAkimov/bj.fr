import React from "react";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import bj from "/bj.webp";
import slotsImage from "/slots.webp";
import { BattleIcon } from "../../components/icons";
import { useAppSelector } from "../../redux/hooks";
import { motion } from "motion/react";

import Banner from "../../components/Banner/Banner";
import { tgPaddingTop } from "../../main";

const Homepage: React.FC = () => {
    const game = useAppSelector((state) => state.game);
    return (
        <div className={styles.wrapper} style={tgPaddingTop}>
            <Banner />
            <div className={styles.content}>
                <Link to="/game">
                    <div className={styles.section}>
                        <h3 className={styles.title}>Black Jack</h3>
                        <p className={styles.text}>classic</p>

                        <img src={bj} className={styles.blackJackImage} alt="" />

                        {game.gameId && game.player.points > 0 && game.dealer.points > 0 && (
                            <div className={styles.currentGame}>
                                <p>{game.player.points}</p>
                                <BattleIcon className={styles.battleIcon} />
                                <p>{game.dealer.points}</p>

                                {game.result && (
                                    <div className={styles.smile}>{game.result.winner === "player" ? "🥳" : "🤬"}</div>
                                )}
                            </div>
                        )}
                    </div>
                </Link>

                <div className={styles.sections}>
                    <motion.div className={styles.slots} whileTap={{ scale: 0.9 }}>
                        <h3 className={styles.title}>Slots</h3>
                        <div className={styles.text}>soon</div>
                        <img src={slotsImage} className={styles.slotsImage} alt="" />
                    </motion.div>
                    <motion.div className={styles.tournaments} whileTap={{ scale: 0.9 }}>
                        <h3 className={styles.title}>Tournaments</h3>
                        <div className={styles.text}>soon</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
