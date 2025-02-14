export type CardType = {
    value: string;
    suit: SuitType;
};

export type SuitType = "hearts" | "spades" | "diamonds" | "clubs";

export interface NotificationInterface {
    title: string;
    icon: "good" | "bad";
    description: string;
    notificationId: string;
}

export type GameType = {
    gameStart: number;
    gameEnd: number | null;
    bet: number;
    currency: "ton" | "usdt" | "tgh";
    gameId: string;
    userId: number;
    status: "in progress" | "finished";
    player: {
        hand: CardType[];
        isBusted: boolean;
        blackJack: boolean;
        points?: number;
    };
    dealer: {
        hand: CardType[];
        isBusted: boolean;
        blackJack: boolean;
        points?: number;
    };
    deck: CardType[];
    winner: string | null;
};

export type OrderType = {
    type: "deposit" | "withdraw";
    createdAt: Date;
    validUntil: number;
    orderId: string;
    amount: number;
    wallet: string;
    userId: number;
    status: "pending" | "complete" | "fraud";
}