const WebSocket = require('ws');

// Replace with your server's address
const ws = new WebSocket('ws://localhost:5500');

ws.on('open', function open() {
    console.log('Connected to the server.');

    // Send a message with a valid key. Replace 000d32 with your actual API key.
    ws.send(JSON.stringify({ data: 42, key: '000d32' }));
    ws.send(JSON.stringify({ data: 21, key: '000d32' }));
    ws.send(JSON.stringify({ data: 51, key: '000d32' }));
    ws.send(JSON.stringify({ data: -9, key: '000d32' }));
    ws.send(JSON.stringify({ data: -1, key: '000d32' }));
});

ws.on('message', function incoming(data) {
    console.log('Received:', data.toString());
});

ws.on('close', function close() {
    console.log('Disconnected from the server.');
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});