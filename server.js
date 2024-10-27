// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from "public" folder
app.use(express.static("public"));

// Connection event listener for when a client connects
io.on("connection", (socket) => {
    console.log("A user connected");

    // Event listener for receiving messages
    socket.on("chat message", (msg) => {
        // Broadcast the message to all connected clients
        io.emit("chat message", msg);
    });

    // Event listener for disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
