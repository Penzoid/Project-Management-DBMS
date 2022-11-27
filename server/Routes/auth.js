const express = require("express");
const { body, validationResult } = require("express-validator");
const con = require("../db");

const router = express.Router();

router.post("/login", [
    body("username", "Username must be 4 to 10 characters long.").isLength({ min: 4, max: 10 }),
    body("password", "Password must be 8 to 12 characters long.").isLength({ min: 8, max: 12 })
], async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { username, password } = req.body;
    const query = `select * from USER where username='${username}' and password='${password}'`;
    con.query(query, function (err, result) {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        return res.json(result[0]);
    });
});

router.post("/register", [
    body("first_name", "First name must be 4 to 10 characters long.").isLength({ min: 4, max: 10 }),
    body("last_name", "Last name must be 4 to 10 characters long.").isLength({ min: 4, max: 10 }),
    body("username", "Username must be 4 to 10 characters long.").isLength({ min: 4, max: 10 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be 8 to 12 characters long.").isLength({ min: 8, max: 12 }),
    body("mobile", "Enter a valid mobile number.").isMobilePhone(),
    body("type", "Enter a valid type.").isLength({ min: 1 })
], async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { first_name, last_name, username, email, password,
        mobile, address, type, subject } = req.body;

    let query = `insert into USER values('${first_name}','${last_name}','${username}',
    '${email}','${password}',CURDATE(),'${mobile}','${address}','${type}')`;
    let query2;

    if (type === "S") {
        query2 = `insert into STUDENT values('${username}')`;
    }
    else if (type === "T") {
        if (!subject) return res.status(400).json({
            error: "Enter a valid subject"
        })
        query2 = `insert into TEACHER values('${username}','${subject}')`;
    }
    else {
        return res.status(400).json({
            error: "Enter a valid type"
        })
    }

    con.query(query, function (err, result) {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        con.query(query2, (err2, res2) => {
            if (err2) return res.status(501).json({ error: err2.sqlMessage });
            return res.json(res2);
        })
    });
});

module.exports = router;