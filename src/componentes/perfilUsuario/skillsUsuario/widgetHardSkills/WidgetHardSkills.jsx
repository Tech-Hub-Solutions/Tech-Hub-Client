import React from "react";
import styles from "./widgetHardSkills.module.css"

const WidgetHardSkills = (props) => {


    return (
        <p className={styles['palavra']} style={{ backgroundColor: props.background }}>
            {props.hardSkill}
        </p>
    );
}

export default WidgetHardSkills;