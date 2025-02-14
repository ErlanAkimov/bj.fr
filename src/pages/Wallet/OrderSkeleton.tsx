import React from "react";
import styles from "./Wallet.module.scss";

const skeleton = Array.from({ length: 4 });

const OrderSkeleton: React.FC = () => skeleton.map((_, index) => <div className={styles.orderSkeleton} key={index}></div>);

export default OrderSkeleton;