import React, { useEffect } from "react";
import "./common.css";
// import img1 from "../images/1.jpg";
// import img2 from "../images/2.jpg";
// import img3 from "../images/3.jpg";

export default function Home() {
  useEffect(() => {
    const scriptTag = document.createElement("script");

    scriptTag.src = "https://notion2embed.com/v1/m20dcxfp?h1=no";
    scriptTag.async = true;

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <div
      className="container"
      data-bs-ride="false"
      style={{ marginBottom: "-10px", marginTop: "-55px" }}
    >
      {/* <div className="card mb-3 cardhead">
        <img src={img1} className="card-img-top cropped1" alt="..." />
        <div className="card-body">
          <p className="card-text" style={{ fontSize: "25px" }}>
            Welcome to the Student-Teacher Project Evaluation Management System.
          </p>
        </div>
      </div>
      <div className="card mb-3 cardhead">
        <img src={img2} className="card-img-bottom cropped1" alt="..." />
        <div className="card-body">
          <p className="card-text" style={{ fontSize: "25px" }}>
            This is the one stop platform where student can form teams and
            submit their projects and assignments.
          </p>
        </div>
      </div>
      <div className="card mb-3 cardhead">
        <img src={img3} className="card-img-bottom cropped1" alt="..." />
        <div className="card-body">
          <p className="card-text" style={{ fontSize: "25px" }}>
            Teachers can evaluate projects submitted by student and assign
            grades and make appropriate remarks for the same.
          </p>
        </div>
      </div> */}
      <div id="notion2embed" className="cleanslate"></div>
    </div>
  );
}
