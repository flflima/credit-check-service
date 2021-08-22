const { STATUS_TOPIC } = require('./constants');
const { consumer, producer } = require('./kafka');
const { approveCredit } = require('./providers/approve-credit');

consumer.on('message', async (message) => {
  if (message) {
    const customer = JSON.parse(message.value);

    const response = await approveCredit({
      name: customer.name,
      cpf: customer.cpf,
    });

    producer.send(
      [
        {
          topic: STATUS_TOPIC,
          messages: `{ "name": "${customer.name}", "cpf": "${customer.cpf}", "status": "${response.status}" }`,
        },
      ],
      (error, data) => {
        console.log(data);
        console.error(error);
      },
    );
  }
});
