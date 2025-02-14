import { useEffect } from "react";
import { wa } from "../main";
import { useAppDispatch } from "../redux/hooks";
import { updateBalance } from "../redux/slices/UserSlice";
import { pushNotification } from "../redux/slices/appSlice";
import { updateOrder } from "../redux/slices/historySlice";

export default function useWs() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const ws = new WebSocket(`https://${import.meta.env.VITE_DOMAIN}/wss`);

        ws.onopen = () => {
            const message = {
                type: "auth",
                payload: {
                    content: wa.initData,
                },
            };
            ws.send(JSON.stringify(message));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "incrementBalance") {
                dispatch(updateBalance({ currency: message.payload.currency, value: message.payload.balance }));
            }
            
            if (message.type === "updateDepositOrder") {
                dispatch(updateOrder(message.payload.order));
            
                dispatch(pushNotification({
                    notificationId: message.payload.order.orderId,
                    title: "Success!",
                    description: `Your deposit was successfully processed ${message.payload.order.amount} ${message.payload.order.currency.toUpperCase()} was added to your balance.`,
                    icon: "good",
                }));
            }

            if (message.type === "updateWithdrawOrder") {
                const order = message.payload.order;

                dispatch(updateOrder(message.payload.order));
                if (order.status === "complete") {
                    dispatch(
                        pushNotification({
                            notificationId: order.orderId,
                            title: "Withdraw request completed",
                            description: `Withdraw request successfully completed, ${order.amount} ${order.currency.toUpperCase()} was sent.`,
                            icon: "good",
                        })
                    );
                }
            }
        };

        ws.onclose = () => {
            console.log("wss connection was closed");
        };
    }, []);
}
