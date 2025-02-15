import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../types/types";

export interface TaskSliceInterface {
    daily: TaskType[];
    list: TaskType[];
    loading: boolean;
}

const initialState: TaskSliceInterface = {
    daily: [],
    list: [],
    loading: true,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks: (state, { payload }) => {
            for (const task of payload.tasks) {
                if (task.type !== "daily") continue;
                const target = payload.dailyTasks.filter((t: any) => t.taskId === task.taskId);

                if (target[0] && target[0].lastClaim > Date.now() - 1000 * 60 * 60 * 24) {
                    state.daily.push({ ...task, isComplete: true, lastClaim: target[0].lastClaim });
                    continue;
                } else {
                    state.daily.push({ ...task, isComplete: false });
                }
            }
        },
        changeOrder: (state, { payload }) => {
            state.daily = state.daily.map((t) => {
                if (t.taskId === payload.taskId) {
                    return { ...t, priority: payload.priority };
                }
                return t;
            });
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        completeTask: (state, { payload }) => {
            state.daily = state.daily.map((t) => {
                if (t.taskId === payload.taskId) {
                    return { ...t, isComplete: true, lastClaim: payload.lastClaim };
                }
                return t;
            });
        },
    },
});

export const { setTasks, changeOrder, setLoading, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
