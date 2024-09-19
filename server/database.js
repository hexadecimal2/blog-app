<<<<<<< HEAD
const mysql = require('mysql2');

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password: "Thisisapassword1",
    database: "blogdb",
    connectionLimit: 30
})



module.exports = pool;





=======
const mysql = require('mysql2');

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password: "Thisisapassword1",
    database: "blogdb",
    connectionLimit: 30
})



module.exports = pool;





>>>>>>> refs/remotes/origin/main
