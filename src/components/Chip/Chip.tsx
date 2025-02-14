import React from "react";
import styles from "./Chip.module.scss";
import { ChipBg } from "../icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addChip, allIn } from "../../redux/slices/GameSlice";
interface ChipProps {
    nominal: number;
    w?: number | string;
    color: string;
    index: number;
}

const Chip: React.FC<ChipProps> = ({ nominal, color, index }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const handleClick = () => {
        if (index === 4) {
            dispatch(allIn(user.balance));
        } else {
            dispatch(addChip(nominal));
        }
    };
    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <ChipBg className={styles.svg} color={color} />
            <p className={styles.nominal} style={{fontSize: index === 4 ? "9px" : "10px"}}>{index === 4 ? "All in" : nominal}</p>
        </div>
    );
};

export default Chip;
