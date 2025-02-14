import React, { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import { useNavigate } from "react-router-dom";
import { navSections, navSectionType } from "./navSections";
import { motion } from "motion/react";

const Nav: React.FC = () => {
    const navigate = useNavigate();
    const [currentS, setCurrentS] = useState<navSectionType>();

    useEffect(() => {
        const currentSection = navSections.find((s) => s.link === location.pathname);
        setCurrentS(currentSection);
    }, [location, navigate]);

    const handleLink = (s: navSectionType) => {
        navigate(s.link);
        setCurrentS(s);
    };

    return (
        <div className={styles.nav} >
            {navSections.map((s) => (
                <motion.div
                    key={s.title}
                    onClick={() => handleLink(s)}
                    className={s === currentS ? styles.pickedSection : styles.section}
                >
                    {s === currentS ? (
                        <motion.div className={styles.underline} layoutId="underline" id="underline" />
                    ) : null}
                    <div className={styles.icon}>{s.icon}</div>
                    <p>{s.title}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default Nav;
