import React from "react";
import styles from "./Homepage.module.scss";

import slotsImage from "/slots.webp";
import { motion } from "motion/react";

import Banner from "../../components/Banner/Banner";
import { tgPaddingTop } from "../../main";

const Homepage: React.FC = () => {
    return (
        <div className={styles.wrapper} style={tgPaddingTop}>
            <Banner />
            <div className={styles.content}>
                <div className={`${styles.section} ${styles.farm}`}>
                    <div className={styles.title}>Play to earn</div>
                    <div className={styles.text}>
                        Play and earn <i className={styles.b21}>B21</i> points. For each <i>TON</i> won you will receive
                        x10 points, and for each lost you will receive 1 unit
                    </div>
                    <div className={styles.token}>B21</div>
                </div>

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
