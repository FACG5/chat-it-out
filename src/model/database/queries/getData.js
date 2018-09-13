const db = require('../db_connection.js');

exports.getArticles = () => {
  const sql = 'SELECT * FROM articles;';
  return db.query(sql);
};


// getArticles()
//    .then((result) => {
//   console.log(result.rows[1].article_body);
// }).catch(error => {
//   console.log(error);
// })
