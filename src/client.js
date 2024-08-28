const io = require("socket.io-client");

const socket = io("http://localhost:4100");

const username = "TestUser" + Math.floor(Math.random() * 1000);

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("JOIN", { userId: "21hgh1" });
  socket.on("SEND_DIRECT_MESSAGE", (data) => {
    console.log(`${data.username}: ${data.message}`);
  });
});

socket.on("userJoined", (user) => {
  console.log(`${user} joined the chat`);
});

socket.on("userLeft", (user) => {
  console.log(`${user} left the chat`);
});

socket.on("userList", (users) => {
  console.log("Current users:", users);
});

// Simulate sending messages
setInterval(() => {
  const message = `Hello from ${username} at ${new Date().toLocaleTimeString()}`;
  socket.emit("SEND_DIRECT_MESSAGE", message);
}, 200);
