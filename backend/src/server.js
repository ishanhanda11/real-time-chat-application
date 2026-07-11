const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDb = require("./config/db");
const env = require("./config/env");
const registerSocketHandlers = require("./sockets");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.clientOrigin
  }
});

app.set("io", io);
registerSocketHandlers(io);

connectDb()
  .then(() => {
    server.listen(env.port, () => {
      console.log(`Backend listening on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
