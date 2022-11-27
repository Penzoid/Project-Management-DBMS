const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "dbms_user",
  password: "dbms_pass",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("use PROJECT_MANAGEMENT_SYSTEM;", function (err, result) {
    if (err) throw err;
    console.log("Connected to mysql database!");
  });
});

module.exports = con;
