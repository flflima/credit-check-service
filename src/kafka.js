const kafka = require('kafka-node');
const { PENDING_TOPIC } = require('./constants');

require('dotenv').config();

// kafka client
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL });

const topicsToCreate = [
  {
    topic: PENDING_TOPIC,
    partitions: 1,
    replicationFactor: 1,
  },
];

client.createTopics(topicsToCreate, (error, result) => {
  console.error(error);
  console.log(result);
});

exports.consumer = new kafka.Consumer(client, [{ topic: PENDING_TOPIC }], {
  autoCommit: true,
});

exports.producer = new kafka.Producer(client);
