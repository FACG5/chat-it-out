const dbConnection = require('./../database/db_connection');

const getMessages = (object, callback) => {
  const sql = {
    text: "SELECT * FROM CHATS WHERE (sender = $1 AND receiver = $2) OR (sender = $2 and receiver = $1 )",
    values: [object.username, object.reciver],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
module.exports = getMessages;
