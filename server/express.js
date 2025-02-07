import express from "express";

const app = express();
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

export default app;
