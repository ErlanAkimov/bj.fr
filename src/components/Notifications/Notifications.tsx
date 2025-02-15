import React from "react";
import styles from "./Notifications.module.scss";
import { AnimatePresence, Reorder } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CloseIcon } from "../icons";
import { removeNotification, updateNotificationOrder } from "../../redux/slices/appSlice";
import { NotificationInterface } from "../../types/types";

const Notifications: React.FC = () => {
    const notifications = useAppSelector((state) => state.app.notifications);
    const dispatch = useAppDispatch();

    const remove = (notificationId: string) => {
        dispatch(removeNotification(notificationId));
    };

    const handleReorder = (newOrder: NotificationInterface[]) => {
        dispatch(updateNotificationOrder(newOrder));
    };

    return (
        <Reorder.Group onReorder={handleReorder} values={notifications} className={styles.wrapper}>
            <AnimatePresence>
                {notifications.map((item) => (
                    <Reorder.Item
                        value={item}
                        initial={{ scale: 0, top: -1000 }}
                        animate={{ scale: 1, top: 0 }}
                        exit={{ scale: 0, right: -300, top: -300 }}
                        className={styles.item}
                        key={item.notificationId}
                        style={{backgroundColor: item.icon === 'bad' ? "" : "goldenrod"}}
                    >
                        <div className={styles.close} onClick={() => remove(item.notificationId)}>
                            <CloseIcon />
                        </div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.description}>{item.description}</div>
                    </Reorder.Item>
                ))}
            </AnimatePresence>
        </Reorder.Group>
    );
};

export default Notifications;
