import type { WebSocket } from 'ws';
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
        if(data.toString() === 'info'){
            ws.send("WebSocket connected to PORT 8080");
            clients.map((user, id)=>{
                ws.send(`${id} - ${user.id}`);
            })
        }
    });
    ws.send("Connection on on port 8080");
});

