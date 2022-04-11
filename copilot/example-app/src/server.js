'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    const topic = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);
    console.log(topic);
    res.sendFile(__dirname + '/html/index.html');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);