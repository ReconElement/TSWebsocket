"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var ws_2 = require("ws");
var uuid_1 = require("uuid");
var clients = [];
var wss = new ws_2.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    var userId = (0, uuid_1.v4)();
    console.log("Recieved a new connection ");
    ws.on('error', console.error);
    var user = {
        id: userId,
        connection: ws
    };
    clients.push(user);
    console.log(user.id + "  " + user.connection);
    ws.on('message', function message(data) {
        console.log("recieved: ".concat(data));
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data.toString());
                console.log("Sent to everyone: ".concat(data));
            }
        });
    });
    ws.send("Connection on on port 8080");
});
