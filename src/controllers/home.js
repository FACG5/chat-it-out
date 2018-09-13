exports.get = (req, res) => {
    res.render("home", {
        title: "chat it out", headerFound: true, footerFound: true, style: ["home", "footer", "header"],
        javascript: ['home']
    });
};