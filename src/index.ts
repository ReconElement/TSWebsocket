import { WebSocket } from 'ws';
import {WebSocketServer} from 'ws';
import {v4 as uuidv4} from 'uuid';
type client = {
    id: String,
    connection: WebSocket;
}
let clients: client[] = [];
const wss = new WebSocketServer({port: 8080});
wss.on('connection',function connection(ws){
    const userId = uuidv4();
    console.log(`Recieved a new connection `);
    ws.on('error',console.error);
    let user: client = {
        id: userId,
        connection: ws
    }
    clients.push(user);
    console.log(user.id + "  "+ user.connection);
    ws.on('message', function message(data){
        console.log(`recieved: ${data}`);
        wss.clients.forEach(function(client){
            if(client!==ws && client.readyState===WebSocket.OPEN){
                client.send(data.toString());
                console.log(`Sent to everyone: ${data}`);
            }
        })
    });
    ws.send("Connection on on port 8080");
});
