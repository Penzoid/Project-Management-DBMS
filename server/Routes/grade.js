const express = require("express");
const { uuid } = require("uuidv4");
const { body, validationResult } = require("express-validator");
const con = require("../db");
const fetchuser = require("../middlewares/fetchuser");

const router = express.Router();

router.get("/", async (req, res) => {
  con.query("call PTG()", (err, result) => {
    if (err) return res.status(501).json({ error: err.sqlMessage });
    let ansList = Array.from(result).slice(0, result.length - 1);
    let finalList = [];
    ansList.forEach(el => {
      finalList.push(el[0]);
    });
    return res.json(finalList);
  })
});

router.post(
  "/",
  [
    body("projectId", "Project ID is invalid").isUUID(),
    body("grade", "Grade is invalid").isLength({ min: 1 }),
  ],
  fetchuser,
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    let { projectId, grade, remark } = req.body;
    if (!remark) remark = "";

    const { username, type } = req.user;
    if (type !== "T")
      return res.status(401).json({
        error: "Not authorized",
      });

    con.query(
      `SELECT * FROM PROJECT WHERE project_id='${projectId}' AND status='SUBMITTED'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0)
          return res.status(400).json({ error: "Project not found" });

        let query = `INSERT INTO GRADE VALUES('${projectId}','${grade}','${remark}','${username}');`;
        query += `UPDATE PROJECT SET status='GRADED' WHERE project_id='${projectId}'`;
        // console.log(query);

        con.query(query, (err, result) => {
          if (err) return res.status(501).json({ error: err.sqlMessage });
          const query2 = `select * from GRADE NATURAL JOIN PROJECT where project_id='${projectId}'`;
          con.query(query2, (err2, res2) => {
            if (err2) return res.status(501).json({ error: err2.sqlMessage });
            if (res2.length === 0)
              return res.status(501).json({ error: "No project found" });
            return res.json(res2[0]);
          });
        });
      }
    );
  }
);

module.exports = router;
