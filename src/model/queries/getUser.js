const dbConnection = require('./../database/db_connection');

const getUsers = (object, callback) => {
  const sql = {
    text: 'select * from users  where user_name=$1',
    values: [object.username],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) { callback(err); } else { callback(null, result); }
  });
};

module.exports = getUsers;
