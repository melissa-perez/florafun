// ./database/db-connector.js

// Get an instance of mysql we can use in the app
let mysql = require('mysql')
// Database hid credentials   VtoCorleone ON STACK OVERFLOW
// https://stackoverflow.com/questions/57470659/how-to-hide-connection-details-for-mysql-database-in-node-js
// Create a 'connection pool' using the provided credentials
let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

// Export it for use in our applicaiton
module.exports.pool = pool
