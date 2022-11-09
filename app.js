/*
    SETUP
*/

// Express
const path = require('path')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 3421

// Database
const db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars')
const exphbs = require('express-handlebars') // Import express-handlebars
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'index.hbs',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
) // Create an instance of the handlebars engine to process templates
app.use(express.static('public'))
app.set('view engine', '.hbs') // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    LISTENER
*/
app.listen(process.env.PORT || PORT, function () {
  console.log(
    'Express started on http://localhost:' +
      PORT +
      '; press Ctrl-C to terminate.'
  )
})

/*
    ROUTES
*/
// Page to render for home
app.get('/', function (req, res) {
  res.render('home.hbs', {
    layout: 'index.hbs',
    pageTitle: 'Floral Fun Database',
  })
})
