const db = require("../repositories/AuthorizationDB.js");

function checkCredentials(username, password){
    return true;
}

module.exports = {checkCredentials}