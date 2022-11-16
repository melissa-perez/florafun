/*************************************
    SETUP
**************************************/
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
const { cp } = require('fs')
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

/*************************************
  LISTENER
**************************************/
app.listen(process.env.PORT || PORT, function () {
  console.log(
    'Express started on http://localhost:' +
      PORT +
      '; press Ctrl-C to terminate.'
  )
})

/*************************************
  ROUTES
**************************************/

/*************************************
  HOME ROUTE
**************************************/
// Page to render for home
app.get('/', function (req, res) {
  res.render('home.hbs', {
    layout: 'index.hbs',
    pageTitle: 'Floral Fun Database',
  })
})

/*************************************
  SUPPLIERS ROUTES
**************************************/
// Page to render for suppliers READ
app.get('/suppliers', function (req, res) {
  // Declare Query 1
  let query1

  // If there is no query string, we just perform a basic SELECT
  if (req.query.name === undefined) {
    query1 = 'SELECT * FROM Suppliers;'
  }

  // If there is a query string, we assume this is a search, and return desired results
  else {
    query1 = `SELECT * FROM Suppliers WHERE name LIKE "${req.query.name}%"`
  }

  // Query 2 is the same in both cases
  //let query2 = "SELECT * FROM Suppliers;";

  // Run the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the suppliers
    let suppliers = rows

    // Run the second query
    //db.pool.query(query2, (error, rows, fields) => {

    // Save the planets
    //let planets = rows;
    res.render('suppliers.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Suppliers',
      data: suppliers,
    })
  })
})
// Page to render for suppliers CREATE
app.post('/add-supplier-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body

  // Capture NULL values
  //let email = parseInt(data['input-email']);
  //if (isNaN(email))
  //{
  //    email = 'NULL'
  //}

  //let is_local = parseInt(data['input-is_local']);
  //if (isNaN(is_local))
  //{
  //    is_local = 'NULL'
  //}

  // Create the query and run it on the database
  query1 = `INSERT INTO Suppliers (name, address, email, is_local) VALUES ('${data['input-name']}', '${data['input-address']}', '${data['input-email']}', '${data['input-is_local']}')`
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error)
      res.sendStatus(400)
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Suppliers and
    // presents it on the screen
    else {
      res.redirect('/suppliers')
    }
  })
})
// Page to render for suppliers UPDATE
app.post('/update-supplier-form', function (req, res) {
  let data = req.body
  //let supplierID = parseInt(data.id);
  //let deleteSuppliers = `DELETE FROM Suppliers WHERE pid = ?`;
  let updateSuppliers = `UPDATE Suppliers SET name = '${data['input-name']}' , address = '${data['input-address']}' , email = '${data['input-email']}', is_local = '${data['input-is_local']}' WHERE supplier_id = '${data['input-supplier_id']}'`
  // Run the second query
  db.pool.query(updateSuppliers, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/suppliers')
    }
  })
})
// Page to render for suppliers DELETE
app.post('/delete-supplier-form', function (req, res) {
  let data = req.body
  //let supplierID = parseInt(data.id);
  //let deleteSuppliers = `DELETE FROM Suppliers WHERE pid = ?`;
  let deleteSuppliers = `DELETE FROM Suppliers WHERE supplier_id = '${data['input-supplier_id']}'`
  // Run the second query
  db.pool.query(deleteSuppliers, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/suppliers')
    }
  })
})

/*************************************
  COLORS ROUTES
**************************************/

// Page to render for colors READ
app.get('/colors', function (req, res) {
  let searchQuery
  if (req.query.color === undefined) {
    searchQuery = `SELECT * FROM Colors;`
  } else {
    searchQuery = `SELECT * FROM Colors WHERE Colors.color LIKE CONCAT("%", "${req.query.color}", "%");`
  }
  db.pool.query(searchQuery, function (error, rows, fields) {
    let colors = rows
    res.render('colors.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Colors',
      data: colors,
    })
  })
})
// Page to render for colors CREATE
app.post('/add-color-form', function (req, res) {
  let data = req.body

  let insertQuery = `INSERT INTO Colors (color) VALUES ('${data['input-color']}');`
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/colors')
    }
  })
})
/*************************************
  DISCOUNTS ROUTES
**************************************/
// Page to render for discounts READ
app.get('/discounts', function (req, res) {
    // Declare Query 1
    let query1
  
    // If there is no query string, we just perform a basic SELECT
    if (req.query.code === undefined) {
      query1 = 'SELECT * FROM Discounts;'
    }
  
    // If there is a query string, we assume this is a search, and return desired results
    else {
      query1 = `SELECT * FROM Discounts WHERE code LIKE "${req.query.code}%"`
    }
  
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Discounts;";
  
    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {
      // Save the discounts
      let discounts = rows
  
      // Run the second query
      //db.pool.query(query2, (error, rows, fields) => {
  
      // Save the planets
      //let planets = rows;
      res.render('discounts.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Discounts',
        data: discounts,
      })
    })
  })
  // Page to render for discounts CREATE
  app.post('/add-discount-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body
  
    // Capture NULL values
    //let email = parseInt(data['input-email']);
    //if (isNaN(email))
    //{
    //    email = 'NULL'
    //}
  
    //let is_local = parseInt(data['input-is_local']);
    //if (isNaN(is_local))
    //{
    //    is_local = 'NULL'
    //}
  
    // Create the query and run it on the database
    query1 = `INSERT INTO Discounts (code, percent) VALUES ('${data['input-code']}', '${data['input-percent']}')`
    db.pool.query(query1, function (error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400)
      }
  
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Discounts and
      // presents it on the screen
      else {
        res.redirect('/discounts')
      }
    })
  })
  // Page to render for discounts UPDATE
  app.post('/update-discount-form', function (req, res) {
    let data = req.body
    //let discountID = parseInt(data.id);
    //let deleteDiscounts = `DELETE FROM Discounts WHERE pid = ?`;
    let updateDiscounts = `UPDATE Discounts SET code = '${data['input-code']}' , percent = '${data['input-percent']}' WHERE discount_id = '${data['input-discount_id']}'`
    // Run the second query
    db.pool.query(updateDiscounts, function (error, rows, fields) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/discounts')
      }
    })
  })
  // Page to render for discounts DELETE
  app.post('/delete-discount-form', function (req, res) {
    let data = req.body
    //let discountID = parseInt(data.id);
    //let deleteDiscounts = `DELETE FROM Discounts WHERE pid = ?`;
    let deleteDiscounts = `DELETE FROM Discounts WHERE discount_id = '${data['input-discount_id']}'`
    // Run the second query
    db.pool.query(deleteDiscounts, function (error, rows, fields) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/discounts')
      }
    })
  })
  
  /*************************************
  PAYMENT METHODS ROUTES
**************************************/
// Page to render for payment_methods READ
app.get('/payment_methods', function (req, res) {
    // Declare Query 1
    let query1
  
    // If there is no query string, we just perform a basic SELECT
    if (req.query.type === undefined) {
      query1 = 'SELECT * FROM Payment_Methods;'
    }
  
    // If there is a query string, we assume this is a search, and return desired results
    else {
      query1 = `SELECT * FROM Payment_Methods WHERE type LIKE "${req.query.type}%"`
    }
  
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Payment_Methods;";
  
    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {
      // Save the payment_methods
      let payment_methods = rows
  
      // Run the second query
      //db.pool.query(query2, (error, rows, fields) => {
  
      // Save the planets
      //let planets = rows;
      res.render('payment_methods.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Payment_Methods',
        data: payment_methods,
      })
    })
  })
  // Page to render for payment_methods CREATE
  app.post('/add-payment_method-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body
  
    // Capture NULL values
    //let email = parseInt(data['input-email']);
    //if (isNaN(email))
    //{
    //    email = 'NULL'
    //}
  
    //let is_local = parseInt(data['input-is_local']);
    //if (isNaN(is_local))
    //{
    //    is_local = 'NULL'
    //}
  
    // Create the query and run it on the database
    query1 = `INSERT INTO Payment_Methods (type) VALUES ('${data['input-type']}')`
    db.pool.query(query1, function (error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400)
      }
  
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Payment_Methods and
      // presents it on the screen
      else {
        res.redirect('/payment_methods')
      }
    })
  })
  // Page to render for payment_methods UPDATE
  app.post('/update-payment_method-form', function (req, res) {
    let data = req.body
    //let payment_methodID = parseInt(data.id);
    //let deletePayment_Methods = `DELETE FROM Payment_Methods WHERE pid = ?`;
    let updatePayment_Methods = `UPDATE Payment_Methods SET type = '${data['input-type']}' WHERE payment_method_id = '${data['input-payment_method_id']}'`
    // Run the second query
    db.pool.query(updatePayment_Methods, function (error, rows, fields) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/payment_methods')
      }
    })
  })
  // Page to render for payment_methods DELETE
  app.post('/delete-payment_method-form', function (req, res) {
    let data = req.body
    //let payment_methodID = parseInt(data.id);
    //let deletePayment_Methods = `DELETE FROM Payment_Methods WHERE pid = ?`;
    let deletePayment_Methods = `DELETE FROM Payment_Methods WHERE payment_method_id = '${data['input-payment_method_id']}'`
    // Run the second query
    db.pool.query(deletePayment_Methods, function (error, rows, fields) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/payment_methods')
      }
    })
  })
 
