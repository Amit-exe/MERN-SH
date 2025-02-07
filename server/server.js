import app from "./express.js";
import config from "../config/config.js";

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.port, (req, res) => {
  console.log(`listening on port ${config.port}`);
});
