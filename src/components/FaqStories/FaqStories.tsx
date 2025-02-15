import React from "react";
import styles from "./FaqStories.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CloseIcon } from "../icons";
import { setShowFaq } from "../../redux/slices/appSlice";

const FaqStories: React.FC = () => {
    const showFaq = useAppSelector((state) => state.app.showFaq);
    const dispatch = useAppDispatch();

    return (
        <AnimatePresence>
            {showFaq && (
                <motion.div
                    className={styles.faq}
                    initial={{
                        bottom: -1000,
                    }}
                    animate={{ bottom: 0 }}
                    exit={{ bottom: -1000 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                >
                    <h1 className={styles.title}>
                        How to play?
                        <div className={styles.close} onClick={() => dispatch(setShowFaq(false))}>
                            <CloseIcon />
                        </div>
                    </h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FaqStories;
