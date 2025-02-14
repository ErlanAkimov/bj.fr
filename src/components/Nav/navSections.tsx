import { ReactNode } from "react";
import { GamesIcon, HistoryIcon, HomeIcon, TasksIcon, WalletIcon } from "../icons";

export type navSectionType = {
    title: string;
    link: string;
    icon: ReactNode;
};

export const navSections: navSectionType[] = [
    {
        title: "Home",
        link: "/",
        icon: <HomeIcon />,
    },
    {
        title: "Tasks",
        link: "/tasks",
        icon: <TasksIcon />,
    },
    {
        title: "Game",
        link: "/game",
        icon: <GamesIcon />,
    },
    {
        title: "History",
        link: "/history",
        icon: <HistoryIcon />,
    },
    {
        title: "Wallet",
        link: "/wallet",
        icon: <WalletIcon />,
    },
];
