const dbConnection = require('./../database/db_connection');

const addSUggestDB = (objdata, callback) => {
  const sql = {
    text: 'insert into suggestions(name, email,subject,content) values($1,$2,$3,$4)',
    values: [objdata.name, objdata.email, objdata.title, objdata.content],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) { callback(err); } else { callback(null, result); }
  });
};
module.exports = addSUggestDB;
