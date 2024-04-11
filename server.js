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
        console.log("Computing maximum and resetting")
        const max = Math.max(...dataReceived);
        ws.send(JSON.stringify({ data_received: dataReceived, max }));
        dataReceived = []; // Reset after sending response
      } else {
        if (Number.isInteger(data)) {
          console.log("Saving Data", data)
          dataReceived.push(data);
        } else {
          console.log("Skipping non-integer data:", data);
        }
      }
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
      console.error("Error:", error);
    }
  });
});


server.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
