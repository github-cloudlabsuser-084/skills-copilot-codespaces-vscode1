// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');

// Import custom modules
const config = require('./config');
const db = require('./db');
const logger = require('./logger');
const routes = require('./routes');

// Create app
const app = express();

// Set up app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set up routes
app.use('/api', routes);

// Start server
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.crt')),
};
http.createServer(app).listen(config.port, () => {
  logger.info(`Server started on port ${config.port} (HTTP)`);
});
https.createServer(options, app).listen(config.httpsPort, () => {
  logger.info(`Server started on port ${config.httpsPort} (HTTPS)`);
});