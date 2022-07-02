const express = require("express");
const ingredRouter = require("./routers");

const app = express();
app.use(express.json());

app.use('/ingredients', ingredRouter);

module.exports = app;