'use strict';

const express = require('express');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const client = new SNSClient({ region: 'ap-northeast-1' });

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
    const { sampleTopic } = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);
    // const topic = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);
    // console.log('topic1 : ' + topic['sampleTopic']);
    const out = await client.send(new PublishCommand({
        Message: 'HELLO',
        TopicArn: sampleTopic,
    }));
    console.log(out);
    res.sendFile(__dirname + '/html/index.html');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);