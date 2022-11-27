const express = require("express");
const { uuid } = require("uuidv4");
const { body, validationResult } = require("express-validator");
const con = require("../db");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM TEAM WHERE team_id='${id}'`;

    con.query(query, (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0) return res.status(501).json({ error: "No team found." });
        return res.json(result[0]);
    })
})

router.post("/", [
    body("name", "Name must be 4 to 20 characters long").isLength({ min: 4, max: 20 }),
], async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, description } = req.body;
    const id = uuid();

    const query = `INSERT INTO TEAM VALUES('${id}', '${name}','${description}')`;

    con.query(query, (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        const query2 = `select * from TEAM where team_id='${id}'`;
        con.query(query2, (err2, res2) => {
            if (err2) return res.status(501).json({ error: err2.sqlMessage });
            if (res2.length === 0) return res.status(501).json({ error: "Login Credentials Invalid." });
            return res.json(res2[0]);
        })
    })
})

router.post("/addStudent", [
    body("teamId", "Team id is invalid").isUUID(),
    body("username", "Username is invalid").isLength({ min: 1 })
], async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { teamId, username } = req.body;

    const query = `INSERT INTO STUDENT_IN_TEAM VALUES('${username}', '${teamId}')`;

    con.query(query, (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        return res.send("Success");
    })
})

module.exports = router;