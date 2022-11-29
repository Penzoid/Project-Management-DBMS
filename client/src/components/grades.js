import React, { useEffect, useContext } from "react";
import ProjectContext from "../Context/Project/ProjectContext.js"

export default function Grades() {
    const { projectGrades, fetchGrades } = useContext(ProjectContext);

    useEffect(() => {
        fetchGrades();
    }, [])

    return (
        projectGrades &&
        (
            <>
                {projectGrades.map((el, i) => <div key={i}>
                    {el.project}
                </div>)}
            </>
        )
    );
}
