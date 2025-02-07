import app from "./express.js";
import config from "../config/config.js";
import mongoose from "mongoose";
import template from "../template.js";

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err);
});
app.get("/", (req, res) => {
  res.status(200).send(template());
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`listening on port ${config.port}`);
});
