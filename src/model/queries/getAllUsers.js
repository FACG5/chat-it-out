const dbConnection = require('./../database/db_connection');

const allUsers = (permission, callback) => {
  const sql = {
    text: 'SELECT * FROM users WHERE permission = $1',
    values: [permission],
  };

  dbConnection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = allUsers;
