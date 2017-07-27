const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let sharedContent = '';
let clientCount = {
  count: wss.clients.size,
  type: 'clientCount'
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  clientCount.count = wss.clients.size;
  broadcast(clientCount);
  console.log("Active Users:", clientCount.count);

  ws.on('message', (clientData) => {
    const data = JSON.parse(clientData);
    switch(data.type) {

    case 'postMessage':
      data.type = 'incomingMessage';
      data.id = uuid();
      console.log('User', data.username, 'said', data.content);
      sharedContent = data;
      broadcast(sharedContent);
    break;

    case 'postNotification':
      data.type = 'incomingNotification';
      sharedContent = data;
      broadcast(sharedContent);
    break;

    default:
      throw new Error("Unknow event type" + data.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
    clientCount.count = wss.clients.size;
    broadcast(clientCount);
});

function broadcast(data) {
  for (let client of wss.clients) {
    client.send(JSON.stringify(data));
  }
}


