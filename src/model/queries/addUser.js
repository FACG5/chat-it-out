const db_connection = require('./../database/db_connection');

const addUser = (userObject, callback) => {
  const sql = {
    text: 'insert into users (user_name,user_email,user_password,permission)values($1,$2,$3,$4)',
    values: [userObject.username, userObject.email, userObject.password, 'patient'],
  };
  db_connection.query(sql, (err, result) => {
    if (err) {callback(err);}
    else {callback(null, result);}
  });
};

module.exports = addUser;
