import React from "react";
import styles from "./Banner.module.scss";

const Banner: React.FC = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <h3 className={styles.title}>Join to game pass</h3>
                <p className={styles.description}>
                    Welcome to <span>daytona</span> games
                </p>
                <p className={styles.description}>Purchase our NFT to join the <span>Game Pass.</span></p>
                <div className={styles.soon}>SOON</div>
            </div>
        </div>
    );
};

export default Banner;
