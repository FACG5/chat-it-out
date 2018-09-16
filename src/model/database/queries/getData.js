const db = require('../db_connection.js');

exports.getArticles = () => {
  const sql = 'SELECT * FROM articles;';
  return db.query(sql);
};
exports.getArticle = (id) => {
  const sql = 'SELECT * FROM articles WHERE article_id = $1';
  return db.query(sql, [id]);
};


// getArticles()
//    .then((result) => {
//   console.log(result.rows[1].article_body);
// }).catch(error => {
//   console.log(error);
// })
