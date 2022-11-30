const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const con = require("../db");
const fetchUser = require("../middlewares/fetchuser");

const JWT_SECRET = "NOT_SO_SECRET";
const router = express.Router();

router.post(
  "/login",
  [
    body("username", "Username must be 4 to 10 characters long.").isLength({
      min: 4,
      max: 10,
    }),
    body("password", "Password must be 8 to 12 characters long.").isLength({
      min: 8,
      max: 12,
    }),
  ],
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { username, password } = req.body;
    const query = `select * from USER where username='${username}' and password='${password}'`;
    con.query(query, function (err, result) {
      if (err) return res.status(501).json({ error: err.sqlMessage });
      if (result.length === 0)
        return res.status(501).json({ error: "Login Credentials Invalid." });

      // Generating Token
      const data = {
        user: { username, type: result[0].type },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      return res.json({ authToken });
    });
  }
);

router.post(
  "/register",
  [
    body("first_name", "First name must be 4 to 10 characters long.").isLength({
      min: 4,
      max: 10,
    }),
    body("last_name", "Last name must be 4 to 10 characters long.").isLength({
      min: 4,
      max: 10,
    }),
    body("username", "Username must be 4 to 10 characters long.").isLength({
      min: 4,
      max: 10,
    }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be 8 to 12 characters long.").isLength({
      min: 8,
      max: 12,
    }),
    body("mobile", "Enter a valid mobile number.").isMobilePhone(),
    body("type", "Enter a valid type.").isLength({ min: 1 }),
  ],
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    let {
      first_name,
      last_name,
      username,
      email,
      password,
      mobile,
      address,
      type,
      subject,
      git_link,
    } = req.body;

    let query = `insert into USER values('${first_name}','${last_name}','${username}',
    '${email}','${password}',CURDATE(),'${mobile}','${address}','${type}')`;
    let query2;

    if (type === "S") {
      if (!git_link) git_link = "";
      query2 = `insert into STUDENT values('${username}','${git_link}')`;
    } else if (type === "T") {
      if (!subject)
        return res.status(400).json({
          error: "Enter a valid subject",
        });
      query2 = `insert into TEACHER values('${username}','${subject}')`;
    } else {
      return res.status(400).json({
        error: "Enter a valid type",
      });
    }

    con.query(query, function (err, result) {
      if (err) return res.status(501).json({ error: err.sqlMessage });
      con.query(query2, (err2, res2) => {
        if (err2) return res.status(501).json({ error: err2.sqlMessage });
        const query3 = `select * from USER where username='${username}'`;
        con.query(query3, (err3, res3) => {
          if (err3) return res.status(501).json({ error: err3.sqlMessage });

          // Generating Token
          const data = {
            user: { username, type: res3[0].type },
          };
          const authToken = jwt.sign(data, JWT_SECRET);

          return res.json({ authToken });
        });
      });
    });
  }
);

router.post("/fetch", fetchUser, async (req, res) => {
  try {
    // Finding User
    const { username, type } = req.user;
    return res.json({ username, type });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete(
  "/",
  fetchUser,
  [
    body("password", "Password must be 8 to 12 characters long.").isLength({
      min: 8,
      max: 12,
    }),
  ],
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { password } = req.body;
    const { username } = req.user;

    con.query(
      `SELECT * FROM USER WHERE username='${username}' AND password='${password}'`,
      (err, result) => {
        if (err) return res.status(501).json({ error: err.sqlMessage });
        if (result.length === 0)
          return res.status(401).json({ error: "Not Authorized" });

        con.query(
          `DELETE FROM STUDENT_IN_TEAM WHERE s_id='${username}'`,
          (err, result) => {
            if (err) return res.status(501).json({ error: err.sqlMessage });
            con.query(
              `DELETE FROM USER WHERE username='${username}'`,
              (err, result) => {
                if (err) return res.status(501).json({ error: err.sqlMessage });
                return res.json("Deleted successfully");
              }
            );
          }
        );
      }
    );
  }
);

module.exports = router;