'use strict';

// const express = require('express');
const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');

const queueUrl = process.env.COPILOT_QUEUE_URI;
const client = new SQSClient({ region: 'ap-northeast-1' });

const receiveMessage = async () => {
    try {
        const out = await client.send(new ReceiveMessageCommand({
            QueueUrl: queueUrl,
            WaitTimeSeconds: 10,
        }));
        if(out.Messages == undefined || out.Messages.length == 0) {
            return;
        }
        console.log('--- out ----');
        console.log(JSON.parse(out.Messages[0].Body).Message);

        await client.send(new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: out.Messages[0].ReceiptHandle
        }));
    } catch(err) {
        console.log(err);
    }
};

setInterval(receiveMessage, 10000);
