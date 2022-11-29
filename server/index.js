const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/auth", require("./Routes/auth"));
app.use("/team", require("./Routes/team"));
app.use("/project", require("./Routes/project"));
app.use("/grade", require("./Routes/grade"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
