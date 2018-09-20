const db_connection = require('./../database/db_connection');
const addSUggestDB = (objdata) => {
    const sql = {
        text: 'insert into suggestions(name, email,subject,content) values($1,$2,$3,$4) RETURNING suggestion_id',
        values: [objdata.name, objdata.email, objdata.title, objdata.content],
    }
    return db_connection.query(sql,(err,result)=>{

    });
};
module.exports = addSUggestDB;
