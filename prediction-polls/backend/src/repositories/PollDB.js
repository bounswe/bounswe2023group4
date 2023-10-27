const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function getDiscretePolls(){
    const sql = 'SELECT * FROM discrete_polls';
    

    return pool.query(sql).then(([rows]) => {
        console.log("ROWS")
        console.log(rows);
        return rows;
    }, (err) => {
        console.log(err);
        return undefined
    })
}

async function getContinuousPolls(){

}

async function getDiscretePollWithId(){

}

async function getContinuousPollWithId(){

}

async function addDiscretePoll(){

}

async function addContinuousPoll(){

}

async function voteDiscretePoll(){
    
}

async function voteContinuousPoll(){
    
}



module.exports = {getDiscretePolls, getContinuousPolls, getDiscretePollWithId, getContinuousPollWithId, 
    addDiscretePoll,addContinuousPoll, voteDiscretePoll, voteContinuousPoll}
    