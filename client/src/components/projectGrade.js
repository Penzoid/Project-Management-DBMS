import React, { useState } from "react";

export default function ProjectGrade({
  project_id,
  currentProject,
  gradeProject,
}) {
  const [data, setData] = useState({
    grade: "A+",
    remark: "",
    projectId: project_id,
  });
  const handleChange = () => {
    setData({
      grade: document.getElementById("grade").value,
      remark: document.getElementById("remark").value,
      projectId: project_id,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    gradeProject(data);
  };

  return (
    currentProject &&
    // <div className="container">
    //   <h1>{currentProject.project_name}</h1>
    //   <b>description:</b>{" "}
    //   <span style={{ fontSize: "20px" }}>{currentProject.description}</span>
    //   <br></br>
    //   <b>status:</b>{" "}
    //   <span style={{ fontSize: "18px" }}>{currentProject.status}</span>
    //   <br />
    currentProject.status === "SUBMITTED" && (
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="grade" form-label>
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            onChange={handleChange}
            className="form-select"
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="col-md-12">
          <label htmlFor="remark" className="form-label">
            Remarks
          </label>
          <textarea
            value={data.remark}
            onChange={handleChange}
            name="message"
            id="remark"
            type={"text"}
            placeholder="Remark the work done by Student"
            className={`form-control`}
            rows="3"
          />
        </div>
        <button className="btn btn-success" style={{ marginLeft: "10px" }}>
          Grade
        </button>
      </form>
    )
  );
}
