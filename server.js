const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.API_KEY; // Set this in your environment variables

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

let dataReceived = [];

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const { data, key } = JSON.parse(message);
      // Authenticate API key
      if (key !== API_KEY) {
        ws.send(JSON.stringify({ error: 'Invalid API key' }));
        return;
      }

      // Handle data
      if (data === -1) {
        const max = Math.max(...dataReceived);
        ws.send(JSON.stringify({ data_received: dataReceived, max }));
        dataReceived = []; // Reset after sending response
        //questions to ask:
        // -- Do we need to reset the data after receiving -1?
        //BONUS
        // -- Scope for deleting a number? Should we return next max?
      } else {
        dataReceived.push(data);
      }
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });
});

//To change with actual URL
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
