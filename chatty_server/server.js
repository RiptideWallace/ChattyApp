const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const moment = require('moment');

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

function broadcast(data) {
  for (let client of wss.clients) {
    client.send(JSON.stringify(data));
  }
}

const colors =['red', 'blue', 'green', 'magenta'];

function setUserColor() {
  let index = clientCount.count % colors.length;
  return colors[index]
}

const timestamp = moment();
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  clientCount.count = wss.clients.size;
  const thisUsersColor = setUserColor();
  broadcast(clientCount);

  ws.on('message', (clientData) => {
    const data = JSON.parse(clientData);
    switch(data.type) {

    case 'postMessage':
      data.timestamp = {
        day: timestamp.format('MMM Do'),
        time: timestamp.format('h:mm a')
      }
      data.type = 'incomingMessage';
      data.id = uuid();
      data.color = thisUsersColor;
      sharedContent = data;
      broadcast(sharedContent);
    break;

    case 'postNotification':
      data.type = 'incomingNotification';
      data.id = uuid();
      sharedContent = data;
      broadcast(sharedContent);
    break;

    default:
      throw new Error("Unknow event type" + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientCount.count = wss.clients.size;
    broadcast(clientCount);
  });
});




