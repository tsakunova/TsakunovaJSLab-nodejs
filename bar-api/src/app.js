const express = require("express");
const ingredRouter = require("./routers");

const app = express();
app.use(express.json());

app.use('/api', ingredRouter);

module.exports = app;