import React, { useEffect } from "react";
import styles from "./Tasks.module.scss";
import { tgPaddingTop } from "../../main";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { api } from "../../axios";
import { setLoading, setTasks } from "../../redux/slices/taskSlice";
import SingleTask from "../../components/SingleTask/SingleTask";

const Tasks: React.FC = () => {
    const tasks = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!tasks.loading) return;
        api.get("/auth/tasks/get-tasks").then((res) => {
            dispatch(setTasks(res.data));
            dispatch(setLoading(false));
        });
    }, []);

    return (
        <div className={styles.tasks} style={tgPaddingTop}>
            <h1 className={styles.title}>Daily tasks</h1>

            {tasks.loading ? (
                <div className={styles.skeletonList}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} />
                    ))}
                </div>
            ) : (
                <div className={styles.tasklist}>
                    {tasks.daily.map((t) => (
                        <SingleTask key={t.taskId} task={t} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tasks;
