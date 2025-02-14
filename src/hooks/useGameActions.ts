import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { api } from "../axios";
import { clearHidden, finishGame, pushCard, setGameId, shakeBalance, updatePoints } from "../redux/slices/GameSlice";
import { setInGame } from "../redux/slices/appSlice";
import { updateBalance } from "../redux/slices/UserSlice";
import { pushHistory } from "../redux/slices/historySlice";
export default function useGameActions() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const game = useAppSelector((state) => state.game);
    const user = useAppSelector((state) => state.user);
    const app = useAppSelector((state) => state.app);

    const startNewGame = async () => {
        if (user.balance < game.bet || game.bet === 0) {
            dispatch(shakeBalance(true));
            setTimeout(() => {
                dispatch(shakeBalance(false));
            }, 500);
            return;
        }

        if (app.inGame) return;
        dispatch(setInGame(true));

        setLoading(true);
        try {
            const res = await api.get(`/auth/start-new-game?bet=${game.bet}&currency=${game.currency}`);

            dispatch(setGameId(res.data.game.gameId));
            dispatch(updateBalance({ currency: "ton", value: -1 * game.bet }));

            const playerCards = res.data.game.playerHand;
            const dealerCards = res.data.game.dealerHand;

            [playerCards[0], playerCards[1], dealerCards[0], dealerCards[1]].forEach((card, index) => {
                setTimeout(() => {
                    dispatch(pushCard({ isPlayer: index < 2, card }));
                }, index * 300);
            });

            setTimeout(() => {
                dispatch(updatePoints({ isPlayer: true, points: res.data.playerPoints }));
                dispatch(updatePoints({ isPlayer: false, points: res.data.dealerPoints }));
            }, 1000);

            if (res.data.playerPoints === 21) {
                await stand();
            }
        } catch (error) {
            dispatch(setInGame(false));
            console.error("Ошибка при старте игры:", error);
        }
        setLoading(false);
    };

    const hit = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await api.get("/auth/hit");
            dispatch(pushCard({ isPlayer: true, card: res.data.newCard }));
            dispatch(updatePoints({ isPlayer: true, points: res.data.playerPoints }));

            if (res.data.winner) {
                dispatch(finishGame(res.data.winner));
            }

            if (res.data.playerPoints === 21) {
                await stand();
            }
        } catch (error) {
            console.error("Ошибка при доборе карты:", error);
        } finally {
            setLoading(false);
        }
    };

    const stand = async () => {
        if (loading) return;
        setLoading(true);
        const res = await api.get("/auth/stand");

        for (let card of res.data.newDealerCards) {
            dispatch(clearHidden());
            dispatch(pushCard({ isPlayer: false, card }));
        }

        dispatch(updatePoints({ isPlayer: true, points: res.data.playerPoints }));
        dispatch(updatePoints({ isPlayer: false, points: res.data.dealerPoints }));

        setTimeout(() => {
            if (game.currency === "ton") {
                if (res.data.winner === "player") {
                    dispatch(updateBalance({ currency: "ton", value: game.bet * 2 }));
                } else if (res.data.winner === "nobody") {
                    dispatch(updateBalance({ currency: "tgh", value: game.bet }));
                }
            } else if (game.currency === "usdt") {
                if (res.data.winner === "player") {
                    dispatch(updateBalance({ currency: "usdt", value: game.bet * 2 }));
                } else if (res.data.winner === "nobody") {
                    dispatch(updateBalance({ currency: "tgh", value: game.bet }));
                }
            } else if (game.currency === "tgh") {
                if (res.data.winner === "player") {
                    dispatch(updateBalance({ currency: "tgh", value: game.bet * 2 }));
                } else if (res.data.winner === "nobody") {
                    dispatch(updateBalance({ currency: "tgh", value: game.bet }));
                }
            }
            dispatch(finishGame(res.data.winner));

            dispatch(pushHistory(res.data.game));
        }, res.data.newDealerCards.length * 300);

        setLoading(false);
    };

    return { startNewGame, hit, loading, setLoading, stand };
}
