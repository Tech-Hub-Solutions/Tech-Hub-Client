import React from "react";
import styles from "./widgetSoftSkill.module.css"

const WidgetSoftSkill = (props) => {
    return (
        <>
            <p className={styles['palavra']}>{props.softSkill}</p>
        </>
    );
}

export default WidgetSoftSkill;