exports.get = (req,res) => {
    res.render("sign-up", {
        title: "Sign-up", headerFound: false, footerFound: false, asideFound:false, style: ["signUpIn"],
         javascript: ['sign-up']
    });
};