import React, { useEffect } from "react";
import styles from "./DealerHand.module.scss";
import Card from "../Card/Card";
import { useAppSelector } from "../../redux/hooks";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const DealerHand: React.FC = () => {
    const dealer = useAppSelector((state) => state.game.dealer);
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
        const controls = animate(count, dealer.points, { duration: 0.5 });
        return () => controls.stop();
    }, [dealer.points]);
    return (
        <div className={styles.dealerhand}>
            {dealer.points > 0 && (
                <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.points}>
                    {rounded}
                </motion.pre>
            )}
            <div className={styles.cards}>
                {dealer.hand.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}>
                        <Card value={card.value} suit={card.suit} index={index} isDealer={true} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealerHand;
