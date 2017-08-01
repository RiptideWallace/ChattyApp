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
// sharedContent, which is the substance of every message sent, starts as an empty string
let sharedContent = '';
//Function the determines that clientCount is equal to the amount of users online
let clientCount = {
  count: wss.clients.size,
  type: 'clientCount'
}
//Function for when data is sent back to the client
function broadcast(data) {
  for (let client of wss.clients) {
    client.send(JSON.stringify(data));
  }
}

const colors =['red', 'blue', 'green', 'magenta'];
//Give the user a colour for their username based on the amount of colours
//available and the amoutn of users online
function setUserColor() {
  let index = clientCount.count % colors.length;
  return colors[index]
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
   //On connection:
      //The client count is set to the amount of people online, which goes up by one when a person connects
      //That connecting user is assigned a colour for their username
      //The amount of users online is broadcast and sent to the client-side
  clientCount.count = wss.clients.size;
  const thisUsersColor = setUserColor();
  broadcast(clientCount);

  ws.on('message', (clientData) => {
    const data = JSON.parse(clientData);
    switch(data.type) {
    //If the data that is recieved from the client is a message
         //Type is established to correspond with the client-side
         //An ID is assigned to that message
         //The color of the username is connected to the message
         //The message is broadcast and sent back to the client-side
    case 'postMessage':
      data.type = 'incomingMessage';
      data.id = uuid();
      data.color = thisUsersColor;
      sharedContent = data;
      broadcast(sharedContent);
    break;
    //If the data that is recieved from the client is a notification:
            //Type is established to correspond with the client-side
            //An ID is assigned to that notification
            //The notification is broadcast and sent back to the client-side 
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
    //When a user disconnects, the user count is updated based on how many more people are still connected
    clientCount.count = wss.clients.size;
    broadcast(clientCount);
  });
});




