const addSuggestion = require('./../model/queries/addSuggestion');
const  validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const vaildation = (object) => {
return (object.name.trim() && object.email.trim() && object.title.trim() && object.content.trim() && validateEmail(object.email.trim()));
};

exports.post = (req, res) => {
  const objdata = req.body;
  if (vaildation(objdata)) {
    addSuggestion(objdata, (err) => {
      if (err) {
        res.send({ result: 'There Are Error , Sorry ' });
      } else {
        res.send({ result: 'Done' });
      }
    });
  } else {
    res.send({ result: ' All Fields Are Required ' });
  }
};
