const cors = require("cors");
const express = require("express");
const env = require("./config/env");

const app = express();

app.use(
  cors({
    origin: env.clientOrigin
  })
);
app.use(express.json());

module.exports = app;
