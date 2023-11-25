import React from "react";
import styles from "./boxSoftSkills.module.css"
import WidgetSoftSkill from "../widgetSoftSkill/WidgetSoftSkill";

const BoxSoftSkills = (props) => {


    return (
        <>
            <h1 className={styles['titulo']}>Valores</h1>
            <div className={styles['boxSkills']}>
                {props.skills?.map((skill) =>
                    <WidgetSoftSkill key={skill.nome} softSkill={skill.nome} />
                )}
            </div>
        </>
    );
}

export default BoxSoftSkills;