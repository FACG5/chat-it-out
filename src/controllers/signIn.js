exports.get = (req,res) => {
    res.render("sign-in", {
        title: "Sign-in", headerFound: false, footerFound: false, asideFound:false, style: ["signUpIn"]
    });
};