const bcrypt = require('bcryptjs');
const addUserDB = require('./../model/queries/addUser');

// Vaild Username
const vaildUsername = userObj => new RegExp('^[a-zA-Z0-9]{5,}$').test(userObj.username);

// Vaild Email
const vaildEmail = userObj => !new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
  .test(userObj.email);

// Vaild Password
const vaildPassword = userObj => (new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
  .test(userObj.password)
  || new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')
    .test(userObj.password));

// Vaild userObject
const vaildUserObject = userObj => (vaildPassword(userObj) && vaildUsername(userObj) && vaildEmail(userObj));

// hasing password
const hasingPassword = (password, res, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, result) => {
      if (err) { res.send({ Error: 'There Is Error , Sorry ' }); } else { callback(result, res); }
    });
  });
};

// Add User Object to Data Base
const addUser = (userObj, res) => {
  hasingPassword(userObj.password, res, (result, res) => {
    const UserData = Object.assign({}, userObj);
    UserData.password = result;
    addUserDB(UserData, (err) => {
      if (err) {
        if (err.code === '23505') { res.send({ Error: 'The Email Or Username Taken' }); } else {
          res.send({ Error: 'There Is Error' });
        }
      } else {
        res.send({ result: '/signIn' });
      }
    });
  });
};

// Render Sign Up Page
exports.get = (req, res) => {
  res.render('sign-up', {
    title: 'Sign-up',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    style: ['signUpIn'],
    javascript: ['sign-up'],
  });
};

// Handling Sign Up
exports.post = (req, res) => {
  const userObj = req.body;
  if (vaildUserObject(userObj)) {
    addUser(userObj, res);
  } else {
    res.send({ Error: 'There Is Error In Fields' });
  }
};
