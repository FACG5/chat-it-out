const db = require('./../database/db_connection');

exports.getDoctors = () => {
  const sql = "SELECT * FROM users WHERE permission = 'doctor'";
  return db.query(sql);
};
