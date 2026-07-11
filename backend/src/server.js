const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const env = require("./config/env");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.clientOrigin
  }
});

app.set("io", io);

server.listen(env.port, () => {
  console.log(`Backend listening on port ${env.port}`);
});
