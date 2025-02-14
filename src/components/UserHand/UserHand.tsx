"use client";

import React, { useEffect } from "react";
import styles from "./UserHand.module.scss";
import Card from "../Card/Card";
import { useAppSelector } from "../../redux/hooks";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import blackJackImage from "/blackJackIcon.webp";

const UserHand: React.FC = () => {
    const player = useAppSelector((state) => state.game.player);
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
        const controls = animate(count, player.points, { duration: 0.5 });
        return () => controls.stop();
    }, [player.points]);

    return (
        <div className={styles.userhand}>
            {player.points > 0 && (
                <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.points}>
                    {rounded}
                </motion.pre>
            )}
            {player.points === 21 && (
                <motion.div initial={{ scale: 2 }} animate={{ scale: 1 }} className={styles.bjImage}>
                    <img src={blackJackImage} alt="" />
                </motion.div>
            )}
            <div className={styles.cards}>
                {player.hand.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}>
                        <Card value={card.value} index={index} suit={card.suit} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserHand;
