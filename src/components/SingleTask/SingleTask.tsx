import React, { useEffect, useState } from "react";
import styles from "./SingleTask.module.scss";
import { TaskType } from "../../types/types";
import { api } from "../../axios";
import { useAppDispatch } from "../../redux/hooks";
import { completeTask } from "../../redux/slices/taskSlice";
import calculateRemainingTime from "./calculateRemainingTime";
import { wa } from "../../main";

const SingleTask: React.FC<{ task: TaskType }> = ({ task }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState(task.isComplete ? calculateRemainingTime(task.lastClaim) : `+${task.reward}`);
    const dispatch = useAppDispatch();

    const handleCheckTask = () => {
        if (isLoading || task.isComplete) return;
        setIsLoading(true);
        setText("loading...");

        api.get(`/auth/tasks/check-daily-task?taskId=${task.taskId}`)
            .then((r) => {
                if (task.verificationMethod === "telegram") {
                    dispatch(completeTask({ taskId: task.taskId, lastClaim: r.data.taskData.lastClaim }));
                } else {
                    setTimeout(() => {
                        dispatch(completeTask({ taskId: task.taskId, lastClaim: r.data.taskData.lastClaim }));
                    }, 6000);
                }
            })
            .catch((e) => {
                if (e.response.data.message === "not yet") {
                    setText("it's too early to claim");
                }

                if (e.response.data.message === "not sub") {
                    try {
                        wa.openTelegramLink(task.link);
                    } catch {
                        wa.openLink(task.link);
                    }
                }
                setText(`+${task.reward}`);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (task.isComplete) {
            const interval = setInterval(() => {
                setText(calculateRemainingTime(task.lastClaim));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [task.isComplete]);

    return (
        <div className={styles.task} onClick={handleCheckTask} style={{ order: task.priority }}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.rside}>
                <p className={styles.price} style={{ textAlign: task.isComplete ? "left" : "right" }}>
                    {text}
                </p>
            </div>
        </div>
    );
};

export default SingleTask;
