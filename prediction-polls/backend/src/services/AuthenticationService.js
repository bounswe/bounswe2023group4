const db = require("../repositories/authDB.js");

function checkCredentials(username, password){
    return db.checkCredentials(username,password);
}

function signUp(username, password){
    db.createMember(username,password);
}


module.exports = {checkCredentials,signUp}