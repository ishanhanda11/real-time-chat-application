const Message = require("../models/Message");

function buildSocketError(message) {
  return {
    message
  };
}

function isValidMessagePayload(payload) {
  return (
    payload &&
    typeof payload.sender === "string" &&
    typeof payload.content === "string" &&
    payload.sender.trim() &&
    payload.sender.trim() &&
    payload.content.trim()
  );
}

const onlineUsers = new Map(); // socket.id -> username

function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("user:online", (payload) => {
      if (payload && payload.username) {
        onlineUsers.set(socket.id, payload.username);
        // Send a unique list of online usernames
        io.emit("users:list", Array.from(new Set(onlineUsers.values())));
      }
    });

    socket.on("message:send", async (payload) => {
      try {
        if (!isValidMessagePayload(payload)) {
          socket.emit("error", buildSocketError("Invalid message payload"));
          return;
        }

        const message = await Message.create({
          sender: payload.sender,
          content: payload.content
        });

        io.emit("message:receive", message);
      } catch (error) {
        socket.emit("error", buildSocketError("Failed to process message"));
      }
    });

    socket.on("user:typing", (payload) => {
      if (payload && payload.username) {
        socket.broadcast.emit("user:typing", { username: payload.username });
      }
    });

    socket.on("user:stop_typing", (payload) => {
      if (payload && payload.username) {
        socket.broadcast.emit("user:stop_typing", { username: payload.username });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      const username = onlineUsers.get(socket.id);
      if (username) {
        onlineUsers.delete(socket.id);
        io.emit("users:list", Array.from(new Set(onlineUsers.values())));
      }
    });
  });
}

module.exports = registerSocketHandlers;
