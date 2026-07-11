const cors = require("cors");
const express = require("express");
const env = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const messagesRoutes = require("./routes/messages.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(
  cors({
    origin: env.clientOrigin
  })
);
app.use(express.json());

app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
