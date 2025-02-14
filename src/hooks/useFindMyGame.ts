import { useEffect } from "react";
import { api } from "../axios";
import { finishGame, pushCard, setGameId, updatePoints } from "../redux/slices/GameSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useGameActions from "./useGameActions";
import { setInGame } from "../redux/slices/appSlice";

export const useFindMyGame = () => {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.game);
    const { stand, loading, setLoading } = useGameActions();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        if (game.gameId) return; // Если игра уже началась, не выполняем запрос

        const fetchGame = async () => {
            const res = await api.get("/auth/find-my-game");

            if (!res.data.game) {
                dispatch(setInGame(false));
                return;
            }
            
            dispatch(setGameId(res.data.game.gameId));
            dispatch(setInGame(true));


            // Раздача карт игроку и дилеру
            for (let card of res.data.game.playerHand) {
                dispatch(pushCard({ isPlayer: true, card }));
            }

            for (let card of res.data.game.dealerHand) {
                dispatch(pushCard({ isPlayer: false, card }));
            }

            // Обновление очков
            dispatch(updatePoints({ isPlayer: true, points: res.data.game.playerPoints }));
            dispatch(updatePoints({ isPlayer: false, points: res.data.game.dealerPoints }));

            if (res.data.game.playerPoints === 21) {
                await stand();
            }

            if (res.data.game.winner) {
                dispatch(finishGame(res.data.game.winner));
            }

            setLoading(false);
        };

        fetchGame();
    }, [dispatch, game.gameId]); // Эффект срабатывает только при изменении game.gameId
};
