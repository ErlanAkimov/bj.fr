import React from "react";
import styles from "./Card.module.scss";
import useCardSuitIcon from "../useCardSuitIcon";
import { motion } from "motion/react";
import backImage from "/card-back.webp";
import { CardType } from "../../types/cardType";

type CardProps = CardType & {
    index: number;
    isDealer?: boolean;
};

const Card: React.FC<CardProps> = ({ value, suit, index, isDealer }) => {
    const icon = useCardSuitIcon(suit);

    return (
        <motion.div
            transition={{ type: "spring", damping: 36, stiffness: 500 }}
            initial={{ top: -800 }}
            animate={{ top: isDealer ? index > 2 ? 0 : -40 : index > 2 ? 0 : -40 }}
            className={styles.cardOpen}
        >
            {value === "hidden" ? (
                <img src={backImage} alt="" />
            ) : (
                <>
                    {icon}
                    <div className={styles.data}>
                        <p>{value}</p>
                    </div>
                    <div className={styles.dataReverse}>
                        <p>{value}</p>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default Card;
