import React from "react";
import styles from "./boxSoftSkills.module.css"
import WidgetSoftSkill from "../widgetSoftSkill/WidgetSoftSkill";

const BoxSoftSkills = () => {

    const skills = ['Responsabilidade', 'Confiança', 'Comprometimento', 'Inovação', 'Comunicação', 'Paciência'];
    const listSkills = skills.map((skill) =>
        <WidgetSoftSkill key={skill} softSkill={skill} />
    );

    return (
        <>
            <h1 className={styles['titulo']}>Soft Skills</h1>
            <div className={styles['boxSkills']}>
                {listSkills}
            </div>
        </>
    );
}

export default BoxSoftSkills;