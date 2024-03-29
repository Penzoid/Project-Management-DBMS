import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProjectContext from "../Context/Project/ProjectContext.js";

export default function Grades() {
  const { projectGrades, fetchGrades } = useContext(ProjectContext);

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    projectGrades && (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Project</th>
              <th scope="col">Team</th>
              <th scope="col">Grade</th>
              <th scope="col">Remark</th>
              <th scope="col">GradedBy</th>
            </tr>
          </thead>
          <tbody>
            {projectGrades.map((el, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{el.project}</td>
                <td>{el.team}</td>
                <td>{el.grade}</td>
                <td>{el.remark === "" ? "-" : el.remark}</td>
                <td><Link to={"/profile/" + el.gradedBy} style={{ color: "black" }}>{el.gradedBy}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
}
