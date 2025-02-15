import React from "react";
import styles from "./Banner.module.scss";

const Banner: React.FC = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <h3 className={styles.title}><i>Join to B21 investors</i></h3>
                <p className={styles.description}>
                    <span>Welcome</span>
                </p>
                <p className={styles.description}>Purchase our NFT to join the <span>B21 Investors.</span> and receive <span style={{color: 'goldenrod'}}>10% profit</span> from our projects</p>
                <div className={styles.soon}>SOON</div>
            </div>
        </div>
    );
};

export default Banner;
