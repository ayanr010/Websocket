# WebSocket Server Project

This project implements a WebSocket server in Node.js, which authenticates clients using an API key and manages data transmission between the server and clients. The server calculates and returns the maximum of all received data when a specific command is received.

## Features

- Validates clients based on an API key to ensure secure data transmission.
- Receives and temporarily stores numerical data from clients.
- Computes and returns the maximum of all received numerical data upon receiving a -1 data command.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed. This project uses Node.js version 14.x or higher.


### Check Node.js version
```
node --version
```
### Check npm version
```
npm --version
```


### Install Dependencies
```
npm install
```

### Start the server
```
npm start
```

### Deployment
Deployment is done manually through render CI/CD in next versions

### Communicating with deployed WebSocket
Run the "client.js" file after substituting the API keys 