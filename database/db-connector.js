// ./database/db-connector.js

// Get an instance of mysql we can use in the app
let mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
let pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_peremeli',
    password        : '6989',
    database        : 'cs340_peremeli'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
