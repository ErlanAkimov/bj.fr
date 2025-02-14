import React, { useRef, useState } from "react";
import styles from "./SingleTask.module.scss";
import { DoubleDoneIcon } from "../icons";

const SingleTask: React.FC<{ text: string }> = ({ text }) => {
    const [isDone, /* setIsDone */] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.task} ref={ref}>
            <div className={styles.title}>{text}</div>

            <div className={styles.bottom}></div>

            {isDone ? <DoubleDoneIcon className={styles.done} /> : <div className={styles.price}>200 GPU</div>}
        </div>
    );
};

export default SingleTask;
