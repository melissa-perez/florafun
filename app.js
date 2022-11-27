/*************************************
    SETUP
**************************************/
// Express
const PORT = 3423
const express = require('express')
const app = express()
const Importer = require('mysql-import')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Database
const db = require('./database/db-connector')
let importer = new Importer({
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_peremeli',
  password: '6989',
  database: 'cs340_peremeli',
})

importer.onProgress((progress) => {
  let percent =
    Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100
  console.log(`${percent}% Completed`)
})

// Handlebars
const { engine } = require('express-handlebars')
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'index.hbs',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require(__dirname + '/public/js/helpers.js'),
  })
)
app.set('view engine', '.hbs')

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
    isDisplayTables: false,
  })
})

/*************************************
  RELOAD ROUTE
  Credit to James Cole
  https://edstem.org/us/courses/28987/discussion/1836410
**************************************/
app.get('/reload', function (req, res) {
  res.render('reload.hbs', {
    layout: 'index.hbs',
    pageTitle: 'Floral Fun Database',
    isDisplayTables: false,
  })
  importer
    .import('./database/sql-scripts/floral_fun_ddl.sql')
    .then(() => {
      let files_imported = importer.getImported()
      console.log(`${files_imported.length} SQL file(s) imported.`)
    })
    .catch((err) => {
      console.error(err)
    })
})
/*************************************
  SUPPLIERS ROUTES
**************************************/
// Page to render for suppliers READ
app.get('/suppliers', function (req, res) {
  let query1
  if (req.query.name === undefined) {
    query1 = 'SELECT * FROM Suppliers;'
  } else {
    query1 = `SELECT * FROM Suppliers WHERE name LIKE "${req.query.name}%"`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let suppliers = rows
    res.render('suppliers.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Suppliers',
      data: suppliers,
      tableId: 'Suppliers',
    })
  })
})
// Page to render for suppliers CREATE
app.post('/add-supplier-form', function (req, res) {
  let data = req.body
  query1 = `INSERT INTO Suppliers (name, address, email, is_local) VALUES ('${data['input-name']}', '${data['input-address']}', '${data['input-email']}', '${data['input-is_local']}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/suppliers')
    }
  })
})
// Page to render for suppliers UPDATE
app.post('/update-supplier-form', function (req, res) {
  let data = req.body
  let updateSuppliers = `UPDATE Suppliers SET name = '${data['input-name']}' , address = '${data['input-address']}' , email = '${data['input-email']}', is_local = '${data['input-is_local']}' WHERE supplier_id = '${data['input-supplier_id']}'`
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
  let deleteSuppliers = `DELETE FROM Suppliers WHERE supplier_id = '${data['input-supplier_id']}'`
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
  if (req.query.colors_name === undefined) {
    searchQuery = `
    SELECT Colors.color_id AS "ID",
    Colors.color AS "Color"
    FROM Colors;`
  } else {
    searchQuery = `SELECT Colors.color_id AS "ID",
    Colors.color AS "Color" 
    FROM Colors
    WHERE Colors.color LIKE CONCAT("%", "${String(
      req.query.colors_name
    ).trim()}", "%");`
  }
  db.pool.query(searchQuery, function (error, rows, fields) {
    let colors = rows
    res.render('colors.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Colors',
      data: colors,
      isDisplayTables: true,
      tableId: 'Colors',
    })
  })
})
// Page to render for colors CREATE
app.post('/add-color-form', function (req, res) {
  let data = req.body
  let insertQuery = `INSERT INTO Colors (color) VALUES ('${String(
    data['input-color']
  ).trim()}');`
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
  CUSTOMERS ROUTES
**************************************/
// Page to render for customers READ
app.get('/customers', function (req, res) {
  let searchQuery = `
  SELECT Customers.customer_id AS "ID",
  Customers.name AS "Name",
  Customers.address AS "Address",
  Customers.email AS "Email",
  Customers.phone AS "Phone Number"
  FROM Customers;`
  if (req.query.customers_name !== undefined) {
    searchQuery = `
    SELECT Customers.customer_id AS "ID",
    Customers.name AS "Name",
    Customers.address AS "Address",
    Customers.email AS "Email",
    Customers.phone AS "Phone Number"
    FROM Customers
    WHERE Customers.name LIKE CONCAT("%", "${String(
      req.query.customers_name
    ).trim()}", "%");`
  }

  db.pool.query(searchQuery, function (error, rows, fields) {
    let customers = rows
    res.render('customers.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Customers',
      data: customers,
      dropdownData: customers,
      isDisplayTables: true,
      tableId: 'Customers',
      deleteKeys: ['ID', 'Name'],
    })
  })
})

// Page to render for customers CREATE
app.post('/add-customer-form', function (req, res) {
  let data = req.body

  let insertQuery = `INSERT INTO Customers (name, address, email, phone) VALUES ('${String(
    data['input-name']
  ).trim()}', '${String(data['input-address']).trim()}', '${String(
    data['input-email']
  ).trim()}', '${String(data['input-phone']).trim()}');`
  if (!data['input-phone']) {
    insertQuery = `INSERT INTO Customers (name, address, email) VALUES ('${String(
      data['input-name']
    ).trim()}', '${String(data['input-address']).trim()}', '${String(
      data['input-email']
    ).trim()}');`
  }
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/customers')
    }
  })
})

app.delete('/delete-customer-form', function (req, res, next) {
  let data = req.body
  let customerID = parseInt(data.id)
  let deleteQuery = `DELETE FROM Customers WHERE Customers.customer_id = ${customerID};`
  db.pool.query(deleteQuery, [customerID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

app.put('/update-customer-form', function (req, res, next) {
  const data = req.body
  const customerID = parseInt(data.id)

  const updateName = String(data.name).trim()
  const updateAddress = String(data.address).trim()
  const updateEmail = String(data.email).trim()
  const updatePhone = String(data.phone).trim()

  let updateQuery = `UPDATE Customers SET Customers.name = '${updateName}', Customers.email = '${updateEmail}', Customers.phone = '${updatePhone}', Customers.address = '${updateAddress}' WHERE Customers.customer_id = ${customerID};`

  // might need to fix
  if (!updatePhone) {
    updateQuery = `UPDATE Customers SET Customers.name = '${updateName}', Customers.email = '${updateEmail}', Customers.phone = '${updatePhone}', Customers.address = '${updateAddress}' WHERE Customers.customer_id = ${customerID};`
  }
  db.pool.query(updateQuery, [customerID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

/*************************************
  DISCOUNTS ROUTES
**************************************/
// Page to render for discounts READ
app.get('/discounts', function (req, res) {
  let query1
  if (req.query.code === undefined) {
    query1 = 'SELECT * FROM Discounts;'
  } else {
    query1 = `SELECT * FROM Discounts WHERE code LIKE "${req.query.code}%"`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let discounts = rows
    res.render('discounts.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Discounts',
      data: discounts,
      tableId: 'Discounts',
    })
  })
})
// Page to render for discounts CREATE
app.post('/add-discount-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body
  query1 = `INSERT INTO Discounts (code, percent) VALUES ('${data['input-code']}', '${data['input-percent']}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/discounts')
    }
  })
})
// Page to render for discounts UPDATE
app.post('/update-discount-form', function (req, res) {
  let data = req.body
  let updateDiscounts = `UPDATE Discounts SET code = '${data['input-code']}' , percent = '${data['input-percent']}' WHERE discount_id = '${data['input-discount_id']}'`
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
  let deleteDiscounts = `DELETE FROM Discounts WHERE discount_id = '${data['input-discount_id']}'`
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
  let query1
  if (req.query.type === undefined) {
    query1 = 'SELECT * FROM Payment_Methods;'
  } else {
    query1 = `SELECT * FROM Payment_Methods WHERE type LIKE "${req.query.type}%"`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let payment_methods = rows
    res.render('payment_methods.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Payment Methods',
      data: payment_methods,
      tableId: 'Payment_Methods',
    })
  })
})
// Page to render for payment_methods CREATE
app.post('/add-payment_method-form', function (req, res) {
  let data = req.body
  query1 = `INSERT INTO Payment_Methods (type) VALUES ('${data['input-type']}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/payment_methods')
    }
  })
})
// Page to render for payment_methods UPDATE
app.post('/update-payment_method-form', function (req, res) {
  let data = req.body
  let updatePayment_Methods = `UPDATE Payment_Methods SET type = '${data['input-type']}' WHERE payment_method_id = '${data['input-payment_method_id']}'`
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
  let deletePayment_Methods = `DELETE FROM Payment_Methods WHERE payment_method_id = '${data['input-payment_method_id']}'`
  db.pool.query(deletePayment_Methods, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/payment_methods')
    }
  })
})

/*************************************
  ORDERS ROUTES
**************************************/
// Page to render for orders READ
app.get('/orders', function (req, res) {
  let query1
  if (req.query.order_id === undefined) {
    query1 = 'SELECT * FROM Orders;'
  } else {
    query1 = `SELECT * FROM Orders WHERE order_id LIKE "${req.query.order_id}%"`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let orders = rows
    res.render('orders.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Orders',
      data: orders,
      tableId: 'Orders',
    })
  })
})
// Page to render for orders CREATE
app.post('/add-order-form', function (req, res) {
  let data = req.body
  query1 = `INSERT INTO Orders (order_date, order_quantity, total_sale_price, customer_id, payment_method_id, discount_id) VALUES ('${data['input-order_date']}', '${data['input-order_quantity']}', '${data['input-total_sale_price']}', '${data['input-customer_id']}', '${data['input-payment_method_id']}', '${data['input-discount_id']}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/orders')
    }
  })
})
// Page to render for orders UPDATE
app.post('/update-order-form', function (req, res) {
  let data = req.body
  let updateOrders = `UPDATE Orders SET order_date = '${data['input-order_date']}' , order_quantity = '${data['input-order_quantity']}' , total_sale_price = '${data['input-total_sale_price']}', customer_id = '${data['input-customer_id']}', payment_method_id = '${data['input-payment_method_id']}', discount_id = '${data['input-discount_id']}' WHERE order_id = '${data['input-order_id']}'`
  db.pool.query(updateOrders, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/orders')
    }
  })
})
// Page to render for orders DELETE
app.post('/delete-order-form', function (req, res) {
  let data = req.body
  let deleteOrders = `DELETE FROM Orders WHERE order_id = '${data['input-order_id']}'`
  db.pool.query(deleteOrders, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/orders')
    }
  })
})

/*************************************
  ITEMS ROUTES
**************************************/
// Page to render for colors READ
app.get('/items', function (req, res) {
  let searchQuery = `SELECT Items.item_id AS ID,
  Items.flower_name AS Item,
  Items.scientific_name AS 'Scientific name',
  Colors.color AS Color,
  IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
  Items.stock_quantity AS Stock, CONCAT('$', Items.price) AS Price,
  Suppliers.name AS Supplier
  FROM Items
  JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
  JOIN Colors ON Colors.color_id = Items.color_id;`
  if (req.query.items_name !== undefined) {
    searchQuery = `SELECT Items.item_id AS ID,
    Items.flower_name AS Item,
    Items.scientific_name AS 'Scientific name',
    Colors.color AS Color,
    IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
    Items.stock_quantity AS Stock, CONCAT('$', Items.price) AS Price,
    Suppliers.name AS Supplier
    FROM Items
    JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
    JOIN Colors ON Colors.color_id = Items.color_id
    WHERE Items.flower_name LIKE CONCAT("%", "${String(
      req.query.items_name
    ).trim()}", "%");`
  }
  db.pool.query(searchQuery, function (error, rows, fields) {
    let items = rows
    res.render('items.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Items',
      data: items,
      isDisplayTables: true,
      tableId: 'Items',
    })
  })
})

/*************************************
  ORDER ITEMS ROUTES
**************************************/
// Page to render for order_items READ
app.get('/order_items', function (req, res) {
  let query1
  if (req.query.order_id === undefined) {
    query1 = 'SELECT * FROM Order_Items;'
  } else {
    query1 = `SELECT * FROM Order_Items WHERE order_id LIKE "${req.query.order_id}%"`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let order_items = rows
    res.render('order_items.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Order Items',
      data: order_items,
      tableId: 'OrderItems',
    })
  })
})
// Page to render for order_items CREATE
app.post('/add-order_item-form', function (req, res) {
  let data = req.body
  query1 = `INSERT INTO Order_Items (quantity, order_id, item_id) VALUES ('${data['input-quantity']}', '${data['input-order_id']}', '${data['input-item_id']}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/order_items')
    }
  })
})
// Page to render for order_items UPDATE
app.post('/update-order_item-form', function (req, res) {
  let data = req.body
  let updateOrder_Items = `UPDATE Order_Items SET quantity = '${data['input-quantity']}' , order_id = '${data['input-order_id']}' , item_id = '${data['input-item_id']}' WHERE order_item_id = '${data['input-order_item_id']}'`
  db.pool.query(updateOrder_Items, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/order_items')
    }
  })
})
// Page to render for order_items DELETE
app.post('/delete-order_item-form', function (req, res) {
  let data = req.body
  let deleteOrder_Items = `DELETE FROM Order_Items WHERE order_item_id = '${data['input-order_item_id']}'`
  db.pool.query(deleteOrder_Items, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/order_items')
    }
  })
})
