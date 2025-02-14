import React from "react";
import styles from "./Tasks.module.scss";
import { tgPaddingTop } from "../../main";
// import SingleTask from "../../components/SingleTask/SingleTask";

// const initialTasks = [
//     { text: "Connect wallet", done: false },
//     { text: "Join to PASS", done: false },
//     { text: "Join the Pass", done: false },
// ];

const Tasks: React.FC = () => {
    return (
        <div className={styles.tasks} style={tgPaddingTop}>
            <h1 className={styles.title}>Tasks</h1>
            {/* <div className={styles.taskslist}>
                {initialTasks.map((task) => (
                    <SingleTask key={task.text} text={task.text} />
                ))}
            </div> */}

            <div className={styles.soon}>
                <p className={styles.title}>{"<Devmode />"}</p>
                <p className={styles.text}>
                    We still working on this page. 
                </p>
            </div>
        </div>
    );
};

export default Tasks;
