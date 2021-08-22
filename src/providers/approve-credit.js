const { default: axios } = require('axios');

exports.approveCredit = async (customer) => {
  console.log(customer);
  return axios
    .post('http://localhost:3100/approve', customer)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err.message);
      throw Error(err.message || 'An error occurred!');
    });
};
