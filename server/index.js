const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());

app.use("/auth", require("./Routes/auth"));
app.use("/team", require("./Routes/team"));
app.use("/project", require("./Routes/project"));
app.use("/grade", require("./Routes/grade"));

// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
