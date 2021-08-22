const { default: axios } = require('axios');

exports.approveCredit = async (customer) =>
  axios
    .post('http://localhost:3100/approve', JSON.stringify(customer))
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      throw Error(err.message || 'An error occurred!');
    });
