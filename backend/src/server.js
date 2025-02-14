const express = require("express");
const https = require("https");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
app.use(express.static(__dirname))

const server = https.createServer({}, app);
const io = socketio(server);


const PORT = 3000;
server.listen(PORT);
