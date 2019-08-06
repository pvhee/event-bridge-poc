'use strict';

const aws = require('aws-sdk');

module.exports.produce = async event => {
  const eventBridge = new aws.EventBridge({
    region: 'eu-west-1',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  eventBridge.putEvents({
    Entries: [
      {
        EventBusName: 'sample-event-bus',
        Source: 'comicrelief.grants',
        DetailType: 'GrantAdd',
        Detail: '{ "grant_id": "12345" }',
      },
    ]
  }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
    return null;
  });
};

module.exports.consume = async event => {
  console.log(event);
  return null;
};
