const fs = require('fs');
const path = require('path');
const dbConnection = require('./../database/db_connection');

const getMessages = (username, callback) => {
  let sql = 'DROP TABLE  IF EXISTS archivetitles CASCADE;';
  dbConnection.query(sql, (err) => {
    if (err) {
      callback(ThirthErr);
    } else {
      sql = 'CREATE TABLE archivetitles(id INTEGER NOT NULL,sender varchar(30) NOT NULL,receiver varchar(30) NOT NULL,message varchar(300) NOT NULL);';
      dbConnection.query(sql, (secondErr) => {
        if (secondErr) {
          callback(secondErr);
        } else {
          sql = 'INSERT INTO archivetitles (id, sender, receiver, message) SELECT * FROM chats WHERE id IN (SELECT MAX(id) FROM chats GROUP BY sender, receiver) And sender IN(SELECT sender FROM chats GROUP BY sender, receiver) And receiver IN(SELECT receiver FROM chats GROUP BY sender, receiver);';
          dbConnection.query(sql, (ThirthErr) => {
            if (ThirthErr) {
              callback(ThirthErr);
            } else {
              sql = {
                text: 'select * from archivetitles where sender=$1 or receiver=$1 order by id;',
                values: [username],
              };
              dbConnection.query(sql, (forthErr, result) => {
                if (forthErr) {
                  callback(forthErr);
                } else {
                  callback(null, result);
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = getMessages;
