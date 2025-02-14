import React, { useEffect } from "react";
import styles from "./History.module.scss";
import { api } from "../../axios";
import { tgPaddingTop, wa } from "../../main";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setHistory } from "../../redux/slices/historySlice";
import { BattleIcon } from "../../components/icons";
import { Link } from "react-router-dom";

const History: React.FC = () => {
    const history = useAppSelector((state) => state.history);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (history.games === null) {
            api.get(`/auth/history/games?userId=${wa.initDataUnsafe.user.id}`).then((res) => {
                dispatch(setHistory(res.data));
            });
        }
    }, [history]);

    return (
        <div className={styles.wrapper} style={tgPaddingTop}>
            <h3 className={styles.title}>Join to game pass</h3>
            <div className={styles.stats}>
                <Link to={"/wallet"} className={styles.statItem}>
                    <p className={styles.divs}>
                        <span className={styles.passValue}>10%</span> dividends
                    </p>
                    <p className={styles.tag}>Public</p>
                    <p className={styles.text}>
                        Receive 10% of the profits from <span>Daytona</span>. Dividends are credited monthly.
                    </p>
                    <div className={styles.soon}>soon</div>
                </Link>
                <Link to={"/wallet"} className={styles.statItem}>
                    <p className={styles.cash}>
                        <span className={styles.passValue}>10%</span> cashback
                    </p>

                    <p className={styles.tag}>Personal</p>
                    <p className={styles.text}>Receive 10% cashback from your unsuccessful games.</p>

                    <div className={styles.soon}>soon</div>
                </Link>
            </div>
            <div className={styles.historyTitle}>
                <h1 className={styles.title}>Games history</h1>
                <p className={styles.text}>last 20 games</p>
            </div>
            <div className={styles.historyList}>
                {
                    history.games === null && <div className={styles.loading}></div>
                }
                {history.games !== null && history.games.length > 0 ? (
                    history.games.map((i) => (
                        <div className={styles.item} key={i.gameId}>
                            <p className={styles.date}>
                                {new Date(i.gameStart)
                                    .toLocaleString("ru-RU", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    .replace(":", ":")}
                            </p>
                            <p className={styles.gameType}>Black Jack</p>

                            <div className={styles.result}>
                                <p className={styles.userId}>
                                    <span>{i.player.points}</span>
                                </p>
                                <BattleIcon className={styles.battleIcon} />{" "}
                                <p className={styles.member}>
                                    <span>{i.dealer.points}</span>
                                </p>
                            </div>
                            {i.winner === "nobody" ? (
                                <div className={styles.value} style={{ color: "white" }}>
                                    Draw
                                </div>
                            ) : (
                                <div
                                    className={styles.value}
                                    style={{ color: i.winner === "player" ? "rgb(27, 247, 27)" : "rgb(247, 78, 78)" }}
                                >
                                    {i.winner === "player" ? i.bet : i.bet * -1}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={styles.empty}>You never played</div>
                )}
            </div>
        </div>
    );
};

export default History;
