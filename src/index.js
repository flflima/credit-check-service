const { consumer } = require('./kafka');

consumer.on('message', (message) => {
  if (message) {
    const customer = JSON.parse(message.value);
    console.log(customer.name);
    console.log(customer.cpf);
  }
});
