import { createSlice } from "@reduxjs/toolkit";
import { CardType } from "../../types/cardType";

const chips = [
    {
        nominal: 0.01,
        color: "grey",
    },
    {
        nominal: 0.05,
        color: "rgb(47, 47, 214)",
    },
    {
        nominal: 0.1,
        color: "black",
    },
    {
        nominal: 0.5,
        color: "orange",
    },
    {
        nominal: 1,
        color: "red",
    },
];

export interface GameSliceInterface {
    gameId: string;
    gameLoading: boolean;
    currency: "ton" | "usdt" | "tgh";
    chips: {
        nominal: number;
        color: string;
    }[];
    bet: number;

    player: {
        hand: CardType[];
        points: number;
    };
    dealer: {
        hand: CardType[];
        points: number;
    };
    turns: {
        current: "dealer" | "player";
        next: "dealer" | "player";
    };
    result: {
        winner: string;
    } | null;
    winner: string | null;
    shakeBalance: boolean;
}

const initialState: GameSliceInterface = {
    gameId: "",
    gameLoading: true,
    currency: "ton",
    chips,
    bet: 0,
    player: {
        hand: [],

        points: 0,
    },
    dealer: {
        hand: [],
        points: 0,
    },
    turns: {
        current: "player",
        next: "dealer",
    },
    result: null,
    winner: null,
    shakeBalance: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        allIn: (state, action) => {
            state.bet = action.payload;
        },
        addChip: (state, { payload }) => {
            state.bet += payload;
        },
        setGameId: (state, { payload }) => {
            state.gameLoading = false;
            state.gameId = payload;
        },
        pushCard: (state, { payload }) => {
            if (payload.isPlayer) {
                state.player.hand.push(payload.card);
            } else {
                state.dealer.hand.push(payload.card);
            }
        },
        clearBet: (state) => {
            state.bet = 0;
        },
        clearGame: (state, { payload }) => {
            const bet = state.bet;
            if (payload === "loading") {
                return { ...initialState, gameLoading: false, bet };
            }
            return { ...initialState, gameLoading: false, bet };
        },
        updatePoints: (state, { payload }) => {
            if (payload.isPlayer) {
                state.player.points = payload.points;
            } else {
                state.dealer.points = payload.points;
            }
        },
        updateHand: (state, { payload }) => {
            if (payload.isPlayer) {
                state.player.hand = payload.hand;
            } else {
                state.dealer.hand = payload.hand;
            }
        },

        clearHidden: (state) => {
            state.dealer.hand = state.dealer.hand.filter((i) => i.value != "hidden");
        },
        finishGame: (state, { payload }) => {
            state.result = {
                winner: payload,
            };
        },
        shakeBalance: (state, action) => {
            state.shakeBalance = action.payload;
        },
    },
});

export const {
    updatePoints,
    clearHidden,
    pushCard,
    setGameId,
    finishGame,
    clearGame,
    updateHand,
    addChip,
    clearBet,
    allIn,
    shakeBalance,
} = gameSlice.actions;
export default gameSlice.reducer;
