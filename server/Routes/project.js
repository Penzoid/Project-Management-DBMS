const express = require("express");
const { uuid } = require("uuidv4");
const { body, validationResult } = require("express-validator");
const con = require("../db");
const fetchuser = require("../middlewares/fetchuser");

const router = express.Router();

router.get("/:id", fetchuser, async (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM PROJECT WHERE project_id='${id}'`;

  con.query(query, (err, result) => {
    if (err) return res.status(501).json({ error: err.sqlMessage });
    if (result.length === 0)
      return res.status(501).json({ error: "No project found." });
    const project = result[0];

    let query2;
    if (project.status === "GRADED")
      query2 = `SELECT * FROM GRADE NATURAL JOIN PROJECT`;
    else query2 = `SELECT * FROM PROJECT`;
    query2 += ` WHERE project_id='${id}'`;

    con.query(query2, (err, result) => {
      const { username, type } = req.user;
      if (type === "S") {
        con.query(
          `SELECT * FROM STUDENT_IN_TEAM WHERE s_id='${username}' AND team_id='${project.team_id}'`,
          (err2, res2) => {
            if (err2) return res.status(501).json({ error: err2.sqlMessage });
            if (res2.length === 0)
              return res
                .status(401)
                .json({ error: "Not authorized to visit this page." });
            return res.json(result[0]);
          }
        );
      } else {
        // console.log(result[0] + type);
        return res.json(result[0]);
      }
    });
  });
});

router.get("/all/:teamId", fetchuser, async (req, res) => {
  const { teamId } = req.params;
  const { username, type } = req.user;

  if (type === "T") {
    con.query(
      `SELECT * FROM PROJECT WHERE team_id='${teamId}' and  status='SUBMITTED'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        return res.json(result);
      }
    );
  } else if (type === "S") {
    con.query(
      `SELECT * FROM STUDENT_IN_TEAM WHERE s_id='${username}' AND team_id='${teamId}'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0)
          return res.status(501).json({ error: "Not authorized" });
        con.query(
          `SELECT * FROM PROJECT WHERE team_id='${teamId}'`,
          (err, result) => {
            if (err) return res.status(501).json({ error: err.sqlMessage });
            return res.json(result);
          }
        );
      }
    );
  }
});

router.post(
  "/",
  [
    body("name", "Name must be 4 to 15 characters long").isLength({
      min: 4,
      max: 15,
    }),
    body("teamId", "Team ID is invalid").isUUID(),
  ],
  fetchuser,
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    let { name, description, teamId } = req.body;
    if (!description) description = "";
    const id = uuid();

    const { username } = req.user;
    con.query(
      `SELECT * FROM STUDENT_IN_TEAM WHERE s_id='${username}' AND team_id='${teamId}'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0)
          return res
            .status(401)
            .json({ error: "Not authorized to visit this page." });
      }
    );

    const query = `INSERT INTO PROJECT VALUES('${id}', '${name}','${description}','','CREATED','${teamId}')`;

    con.query(query, (err, result) => {
      if (err) return res.status(501).json({ error: err.sqlMessage });
      const query2 = `select * from PROJECT where project_id='${id}'`;
      con.query(query2, (err2, res2) => {
        if (err2) return res.status(501).json({ error: err2.sqlMessage });
        if (res2.length === 0)
          return res.status(501).json({ error: "No project found" });
        return res.json(res2[0]);
      });
    });
  }
);

router.post(
  "/submit/:id",
  [body("submissionLink", "Submission link is invalid").isLength({ min: 1 })],
  fetchuser,
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { id } = req.params;
    const { submissionLink } = req.body;
    con.query(
      `SELECT * FROM PROJECT WHERE project_id='${id}' AND status='CREATED'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0)
          return res.status(501).json({ error: "No project found." });
        const project = result[0];

        const { username } = req.user;
        con.query(
          `SELECT * FROM STUDENT_IN_TEAM WHERE s_id='${username}' AND team_id='${project.team_id}'`,
          (err, result) => {
            if (err) return res.status(501).json({ error: err.sqlMessage });
            if (result.length === 0)
              return res
                .status(401)
                .json({ error: "Not authorized to visit this page." });
          }
        );

        const query = `UPDATE PROJECT SET sub_link='${submissionLink}',status='SUBMITTED' WHERE project_id='${id}'`;

        con.query(query, (err, result) => {
          if (err) {
            // console.log(query, submissionLink, err);
            return res.status(501).json({ error: err.sqlMessage });
          }
          return res.send("Submitted successfully");
        });
      }
    );
  }
);

module.exports = router;
