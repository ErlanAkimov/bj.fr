import { useEffect } from "react";
import { wa } from "../main";
import { useAppDispatch } from "../redux/hooks";
import { updateBalance } from "../redux/slices/UserSlice";
import { pushNotification } from "../redux/slices/appSlice";
import { updateOrder } from "../redux/slices/historySlice";

export default function useWs() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let ws: WebSocket;
        const connectWebSocket = () => {
            ws = new WebSocket(`wss://games.daytona-project.com/wss`);

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

                    dispatch(
                        pushNotification({
                            notificationId: message.payload.order.orderId,
                            title: "Success!",
                            description: `Your deposit was successfully processed ${
                                message.payload.order.amount
                            } ${message.payload.order.currency.toUpperCase()} was added to your balance.`,
                            icon: "good",
                        })
                    );
                }

                if (message.type === "updateWithdrawOrder") {
                    const order = message.payload.order;

                    dispatch(updateOrder(message.payload.order));
                    if (order.status === "complete") {
                        dispatch(
                            pushNotification({
                                notificationId: order.orderId,
                                title: "Withdraw request completed",
                                description: `Withdraw request successfully completed, ${
                                    order.amount
                                } ${order.currency.toUpperCase()} was sent.`,
                                icon: "good",
                            })
                        );
                    }
                }
            };

            ws.onclose = () => {
                console.log("wss connection was closed, attempting to reconnect...");
                setTimeout(connectWebSocket, 1000);
            };

            // Пинг для поддержания соединения
            const pingInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: "ping" }));
                }
            }, 30000); // Отправлять пинг каждые 30 секунд

            // Очистка интервала при закрытии соединения
            ws.addEventListener("close", () => {
                clearInterval(pingInterval);
            });
        };

        connectWebSocket(); // Инициализация соединения

        return () => {
            ws.close();
        };
    }, []);
}
