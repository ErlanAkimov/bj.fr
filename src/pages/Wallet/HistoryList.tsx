import React from "react";
import { OrderType } from "../../types/cardType";
import styles from "./HistoryList.module.scss";
import { DownloadIcon, UploadIcon } from "../../components/icons";
interface HistoryListProps {
    list: OrderType[];
}

const HistoryList: React.FC<HistoryListProps> = ({ list }) => {
    return (
        <div className={styles.historyList}>
            {list.length > 0 ? list.map((order) => <OrderItem key={order.orderId} order={order} />) : <EmptyItem />}
        </div>
    );
};

export default HistoryList;

function OrderItem({ order }: { order: OrderType }) {
    return (
        <div className={styles.orderItem}>
            <div className={styles.lside}>
                <div className={styles.icon}>{order.type === "deposit" ? <DownloadIcon className={styles.downloadIcon} /> : <UploadIcon className={styles.uploadIcon} />}</div>

                <div className={styles.info} style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.2)" }}>
                    <p className={styles.blockTitle}>Date:</p>
                    <p className={styles.value}>{new Date(order.createdAt).toLocaleString("ru-RU")}</p>
                </div>

                <div className={styles.info} style={{marginLeft: 20}}>
                    <p className={styles.blockTitle}>Status:</p>
                    <p className={styles.value} style={{ color: order.status === "complete" ? "green" : "#fffeb5" }}>
                        {order.status}
                    </p>
                </div>
            </div>
            <div className={styles.value}>
                <p style={{color: ['fraud', 'timeout'].includes(order.status) ? 'red' : ''}}>{order.amount.toFixed(2)}</p>
            </div>
        </div>
    );
}

function EmptyItem() {
    return (
        <div className={styles.emptyItem}>
            <h3 className={styles.text}>You have no transactions yet</h3>
        </div>
    );
}
