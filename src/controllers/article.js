const getData = require('../model/database/queries/getData');

exports.get = (req, res) => {


getArticleContent();


}
const getArticleContent = (articleId)=>{
  getData.getArticle(articleId)
  .then((result) => {
    // console.log(result.rows);
    res.render('article', {
      title: 'Article', headerFound: false, footerFound: false,
    });
  });
  .catch((error)=>{res.end(erorr)})


}
