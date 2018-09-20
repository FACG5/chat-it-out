const addSUggestDB = require('./../model/queries/addSUggestDB');
exports.post = (req, res) => {
    let objData = req.body;
    addSUggestDB(objData);
}