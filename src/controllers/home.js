const data = require('./../model/services');

exports.get = (req, res) => {

    res.render("home", {
        title: "chat it out", headerFound: true, footerFound: true, style: ["home", "footer", "header", "public"],
        javascript: ['home', 'hamburger'], services:data.services
    });

};
