import React from "react";
import styles from "./GameOver.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearGame } from "../../redux/slices/GameSlice";
import { api } from "../../axios";  
import { setInGame } from "../../redux/slices/appSlice";

const GameOver: React.FC = () => {
    const game = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();

    const close = () => {
        api.get("/auth/flush-my-game")
        dispatch(setInGame(false));
		dispatch(clearGame(""))
    };

    return (
        <div className={game.result ? styles.wrapperOuterOpen : styles.wrapperOuter} onClick={close}>
            <div className={styles.overlay} onClick={close}></div>
            <h1 className={styles.title}>
                {game.result ? (game.result.winner === "player" ? "Congratulations! You WIN!" : game.result.winner === "nobody" ? "It's a draw!" : "Dealer wins!") : null}
            </h1>
        </div>
    );
};

export default GameOver;
