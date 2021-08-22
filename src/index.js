const { STATUS_TOPIC } = require('./constants');
const { consumer, producer } = require('./kafka');
const { approveCredit } = require('./providers/approve-credit');

consumer.on('message', (message) => {
  if (message) {
    const customer = JSON.parse(message.value);
    console.log(customer.name);
    console.log(customer.cpf);

    const response = approveCredit(message);

    producer.send(
      [
        {
          topic: STATUS_TOPIC,
          messages: `{ "name": "${message.name}", "cpf": "${message.cpf}", "status": ${response.status} }`,
        },
      ],
      (error, data) => {
        console.log(data);
        console.error(error);
      },
    );
  }
});
