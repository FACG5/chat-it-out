const dbConnection = require('./../database/db_connection');

// insert message to database
const addMessage = (object, callback) => {
  const { sender, reciver, message } = object;
  const sql = {
    text: 'INSERT INTO chats (sender,receiver,message) VALUES ($1,$2,$3)',
    values: [sender, reciver, message],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
module.exports = addMessage;
