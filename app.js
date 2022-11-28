/*************************************
    SETUP
**************************************/
// Express
const PORT = 3424
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
  COLORS ROUTES
**************************************/

// Page to render for colors READ
app.get('/colors', function (req, res) {
  let searchQuery
  if (req.query.colors_name === undefined) {
    searchQuery = `
    SELECT Colors.color_id AS "ID",
    Colors.color AS "Color"
    FROM Colors
    ORDER BY ID ASC;`
  } else {
    searchQuery = `SELECT Colors.color_id AS "ID",
    Colors.color AS "Color" 
    FROM Colors
    WHERE Colors.color LIKE CONCAT("%", "${String(
      req.query.colors_name
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }
  db.pool.query(searchQuery, function (error, rows, fields) {
    let colors = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.render('colors.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Colors',
        data: colors,
        isDisplayTables: true,
        tableId: 'Colors',
        searchTerm: 'name',
      })
    }
  })
})
// Page to render for colors CREATE
app.post('/add-color-form', function (req, res) {
  let data = req.body
  let insertQuery = `INSERT INTO Colors (color) VALUES ('${String(
    data['add-color']
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
  FROM Customers
  ORDER BY ID ASC;`
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
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }

  db.pool.query(searchQuery, function (error, rows, fields) {
    let customers = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.render('customers.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Customers',
        data: customers,
        dropdownData: customers,
        isDisplayTables: true,
        tableId: 'Customers',
        searchTerm: 'name',
      })
    }
  })
})

// Page to render for customers CREATE
app.post('/add-customer-form', function (req, res) {
  let data = req.body

  const addName = String(data['add-name']).trim()
  const addAddress = String(data['add-address']).trim()
  const addEmail = String(data['add-email']).trim()
  const addPhone = String(data['add-phone']).trim()

  let insertQuery = `INSERT INTO Customers (name, address, email, phone) VALUES ('${addName}', '${addAddress}', '${addEmail}', '${addPhone}');`
  if (!addPhone) {
    insertQuery = `INSERT INTO Customers (name, address, email) VALUES ('${addName}', '${addAddress}', '${addEmail}');`
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

// Page to render for customers DELETE
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

// Page to render for customers UPDATE
app.put('/update-customer-form', function (req, res, next) {
  const data = req.body
  const customerID = parseInt(data.id)

  const updateName = String(data.name).trim()
  const updateAddress = String(data.address).trim()
  const updateEmail = String(data.email).trim()
  const updatePhone = String(data.phone).trim()

  let updateQuery = `UPDATE Customers SET Customers.name = '${updateName}', Customers.email = '${updateEmail}', Customers.phone = '${updatePhone}', Customers.address = '${updateAddress}' WHERE Customers.customer_id = ${customerID};`
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
  let query1 = `SELECT Discounts.discount_id AS ID,
  Discounts.code AS Code,
  Discounts.percent AS Percent FROM Discounts
  ORDER BY ID ASC;`

  if (req.query.discounts_name !== undefined) {
    query1 = `SELECT Discounts.discount_id AS ID,
    Discounts.code AS Code,
    Discounts.percent AS Percent
    FROM Discounts
    WHERE Discounts.code LIKE CONCAT("%", "${String(
      req.query.discounts_name
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }
  db.pool.query(query1, function (error, rows, fields) {
    let discounts = rows
    res.render('discounts.hbs', {
      layout: 'index.hbs',
      pageTitle: 'Discounts',
      data: discounts,
      tableId: 'Discounts',
      searchTerm: 'code',
      isDisplayTables: true,
    })
  })
})

// Page to render for discounts DELETE
app.delete('/delete-discount-form', function (req, res, next) {
  let data = req.body
  let discountID = parseInt(data.id)
  let deleteQuery = `DELETE FROM Discounts WHERE Discounts.discount_id = ${discountID};`
  db.pool.query(deleteQuery, [discountID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

// Page to render for discounts CREATE
app.post('/add-discount-form', function (req, res) {
  let data = req.body

  const addCode = String(data['add-code']).trim()
  const addPercent = parseInt(data['add-percent'])

  let insertQuery = `INSERT INTO Discounts (code, percent) VALUES ('${addCode}', ${addPercent});`

  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/discounts')
    }
  })
})

// Page to render for discounts UPDATE
app.put('/update-discount-form', function (req, res, next) {
  const data = req.body
  const discountID = parseInt(data.id)

  const updateCode = String(data.code).trim()
  const updatePercent = parseInt(data.percent)

  let updateQuery = `UPDATE Discounts SET Discounts.code = '${updateCode}', Discounts.percent = ${updatePercent} WHERE Discounts.discount_id = ${discountID};`

  db.pool.query(updateQuery, [discountID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

/*************************************
  PAYMENT METHODS ROUTES
**************************************/
// Page to render for payment_methods READ
app.get('/payment-methods', function (req, res) {
  let query1 = `SELECT Payment_Methods.payment_method_id AS ID,
  Payment_Methods.type AS Type
  FROM Payment_Methods
  ORDER BY ID ASC;`
  if (req.query['payment-methods_name'] !== undefined) {
    query1 = `SELECT Payment_Methods.payment_method_id AS ID,
    Payment_Methods.type AS Type
    FROM Payment_Methods
    WHERE Payment_Methods.type LIKE CONCAT("%", "${String(
      req.query['payment-methods_name']
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }

  db.pool.query(query1, function (error, rows, fields) {
    let payment_methods = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.render('payment-methods.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Payment Methods',
        data: payment_methods,
        isDisplayTables: true,
        tableId: 'Payment-Methods',
        searchTerm: 'type',
      })
    }
  })
})
// Page to render for payment_methods CREATE
app.post('/add-payment-method-form', function (req, res) {
  let data = req.body
  const addPaymentMethodType = String(data['add-payment-method-type']).trim()

  query1 = `INSERT INTO Payment_Methods (type) VALUES ('${addPaymentMethodType}')`
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/payment-methods')
    }
  })
})
// Page to render for payment_methods UPDATE
app.put('/update-payment-method-form', function (req, res) {
  let data = req.body
  let updatePayment_Methods = `UPDATE Payment_Methods SET type = '${data['type']}' WHERE payment_method_id = '${data['id']}'`
  db.pool.query(updatePayment_Methods, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/payment-methods')
    }
  })
})
// Page to render for payment_methods DELETE
app.delete('/delete-payment-method-form', function (req, res) {
  let data = req.body
  let paymentMethodID = parseInt(data.id)

  let deleteQuery = `DELETE FROM Payment_Methods WHERE Payment_Methods.payment_method_id = ${paymentMethodID};`
  db.pool.query(deleteQuery, [paymentMethodID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
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
  IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
  Items.stock_quantity AS Stock,
  Items.price AS Price,
  Colors.color AS Color,
  Items.color_id AS 'Color ID',
  Suppliers.name AS Supplier,
  Items.supplier_id AS 'Supplier ID'
  FROM Items
  LEFT JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
  LEFT JOIN Colors ON Colors.color_id = Items.color_id
  ORDER BY ID ASC;`
  if (req.query.items_name !== undefined) {
    searchQuery = `SELECT Items.item_id AS ID,
    Items.flower_name AS Item,
    Items.scientific_name AS 'Scientific name',
    IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
    Items.stock_quantity AS Stock,
    Items.price AS Price,
    Colors.color AS Color,
    Items.color_id AS 'Color ID',
    Suppliers.name AS Supplier,
    Items.supplier_id AS 'Supplier ID'
    FROM Items
    LEFT JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
    LEFT JOIN Colors ON Colors.color_id = Items.color_id
    WHERE Items.flower_name LIKE CONCAT("%", "${String(
      req.query.items_name
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }
  db.pool.query(searchQuery, function (error, rows, fields) {
    let items = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      let colorQuery = `SELECT Colors.color_id AS ID,
       Colors.color AS Color
       FROM Colors;`
      db.pool.query(colorQuery, function (error, rows, fields) {
        let colors = rows
        if (error) {
          console.log(error)
          res.sendStatus(400)
        } else {
          let supplierQuery = `SELECT Suppliers.supplier_id AS ID,
          Suppliers.name AS Supplier
          FROM Suppliers;`
          db.pool.query(supplierQuery, function (error, rows, fields) {
            let suppliers = rows
            if (error) {
              console.log(error)
              res.sendStatus(400)
            } else {
              res.render('items.hbs', {
                layout: 'index.hbs',
                pageTitle: 'Items',
                data: items,
                colorsdata: colors,
                suppliersdata: suppliers,
                isDisplayTables: true,
                tableId: 'Items',
                searchTerm: 'name',
              })
            }
          })
        }
      })
    }
  })
})

// Page to render for items DELETE
app.delete('/delete-item-form', function (req, res, next) {
  let data = req.body
  let itemID = parseInt(data.id)
  let deleteQuery = `DELETE FROM Items WHERE Items.item_id = ${itemID};`
  db.pool.query(deleteQuery, [itemID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

// Page to render for items UPDATE
app.put('/update-item-form', function (req, res, next) {
  const data = req.body
  const itemID = parseInt(data.id)

  const updateName = String(data.name).trim()
  const updateSciName = String(data.sciName).trim()
  const updateStock = parseInt(data.stock)
  const updatePrice = parseFloat(data.price)
  const updateColorID = !data.colorid ? '' : parseInt(data.colorid)
  const updateSupplierID = !data.supplierid ? '' : parseInt(data.supplierid)
  const updateIndoor = parseInt(data.indoor)

  let updateQuery = `UPDATE Items SET Items.flower_name = '${updateName}', Items.scientific_name = '${updateSciName}', Items.is_indoor = ${updateIndoor}, Items.stock_quantity = ${updateStock}, Items.price = ${updatePrice}, Items.supplier_id = ${updateSupplierID}, Items.color_id = ${updateColorID} WHERE Items.item_id = ${itemID};`
  if (!updateColorID && !updateSupplierID) {
    updateQuery = `UPDATE Items SET Items.flower_name = '${updateName}', Items.scientific_name = '${updateSciName}', Items.is_indoor = ${updateIndoor}, Items.stock_quantity = ${updateStock}, Items.price = ${updatePrice}, Items.supplier_id = NULL, Items.color_id = NULL WHERE Items.item_id = ${itemID};`
  } else if (!updateColorID) {
    updateQuery = `UPDATE Items SET Items.flower_name = '${updateName}', Items.scientific_name = '${updateSciName}', Items.is_indoor = ${updateIndoor}, Items.stock_quantity = ${updateStock}, Items.price = ${updatePrice}, Items.supplier_id = ${updateSupplierID}, Items.color_id = NULL WHERE Items.item_id = ${itemID};`
  } else if (!updateSupplierID) {
    updateQuery = `UPDATE Items SET Items.flower_name = '${updateName}', Items.scientific_name = '${updateSciName}', Items.is_indoor = ${updateIndoor}, Items.stock_quantity = ${updateStock}, Items.price = ${updatePrice}, Items.color_id = ${updateColorID}, Items.supplier_id = NULL WHERE Items.item_id = ${itemID};`
  }
  db.pool.query(updateQuery, [itemID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

// Page to render for customers CREATE
app.post('/add-item-form', function (req, res) {
  let data = req.body

  const addName = String(data['add-name']).trim()
  const addSciName = String(data['add-sci-name']).trim()
  const addStock = parseInt(data['add-stock'])
  const addPrice = parseFloat(data['add-price'])
  const addColorID = !data['add-color-select']
    ? ''
    : parseInt(data['add-color-select'])
  const addSupplierID = !data['add-supplier-select']
    ? ''
    : parseInt(data['add-supplier-select'])
  const addIndoor = parseInt(data['add-indoor-select'])

  let insertQuery = `INSERT INTO Items (flower_name, scientific_name, is_indoor, stock_quantity, price, supplier_id, color_id) VALUES ('${addName}', '${addSciName}', ${addIndoor}, ${addStock}, ${addPrice}, ${addSupplierID}, ${addColorID});`
  if (!addColorID && !addSupplierID) {
    insertQuery = `INSERT INTO Items (flower_name, scientific_name, is_indoor, stock_quantity, price) VALUES ('${addName}', '${addSciName}', ${addIndoor}, ${addStock}, ${addPrice});`
  } else if (!addColorID) {
    insertQuery = `INSERT INTO Items (flower_name, scientific_name, is_indoor, stock_quantity, price, supplier_id) VALUES ('${addName}', '${addSciName}', ${addIndoor}, ${addStock}, ${addPrice}, ${addSupplierID});`
  } else if (!addSupplierID) {
    insertQuery = `INSERT INTO Items (flower_name, scientific_name, is_indoor, stock_quantity, price, color_id) VALUES ('${addName}', '${addSciName}', ${addIndoor}, ${addStock}, ${addPrice}, ${addColorID});`
  }

  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/items')
    }
  })
})

/*************************************
  SUPPLIERS ROUTES
**************************************/

// Page to render for suppliers READ
app.get('/suppliers', function (req, res) {
  let query1 = `
  SELECT Suppliers.supplier_id AS ID,
  Suppliers.name AS Name,
  Suppliers.address AS Address,
  Suppliers.email AS Email,
  IF(Suppliers.is_local, 'Yes', 'No') AS Local
  FROM Suppliers
  ORDER BY ID ASC;`
  if (req.query.suppliers_name !== undefined) {
    query1 = `SELECT Suppliers.supplier_id AS ID,
    Suppliers.name AS Name,
    Suppliers.address AS Address,
    Suppliers.email AS Email,
    IF(Suppliers.is_local, 'Yes', 'No') AS Local
    FROM Suppliers
    WHERE Suppliers.name LIKE CONCAT("%", "${String(
      req.query.suppliers_name
    ).trim()}", "%")
    ORDER BY ID ASC;`
  }

  db.pool.query(query1, function (error, rows, fields) {
    let suppliers = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.render('suppliers.hbs', {
        layout: 'index.hbs',
        pageTitle: 'Suppliers',
        data: suppliers,
        tableId: 'Suppliers',
        searchTerm: 'name',
        isDisplayTables: true,
      })
    }
  })
})

// Page to render for suppliers DELETE
app.delete('/delete-supplier-form', function (req, res, next) {
  let data = req.body
  let supplierID = parseInt(data.id)
  let deleteQuery = `DELETE FROM Suppliers WHERE Suppliers.supplier_id = ${supplierID};`
  db.pool.query(deleteQuery, [supplierID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

// Page to render for suppliers CREATE
app.post('/add-supplier-form', function (req, res) {
  let data = req.body

  const addName = String(data['add-name']).trim()
  const addAddress = String(data['add-address']).trim()
  const addEmail = String(data['add-email']).trim()
  const addLocal = parseInt(data['add-local-select'])

  let insertQuery = `INSERT INTO Suppliers (name, address, email, is_local) VALUES ('${addName}', '${addAddress}', '${addEmail}', ${addLocal});`

  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/suppliers')
    }
  })
})

// Page to render for suppliers UPDATE
app.put('/update-supplier-form', function (req, res, next) {
  const data = req.body
  const supplierID = parseInt(data.id)

  const updateName = String(data.name).trim()
  const updateAddress = String(data.address).trim()
  const updateEmail = String(data.email).trim()
  const updateLocal = parseInt(data.local)

  let updateQuery = `UPDATE Suppliers SET Suppliers.name = '${updateName}', Suppliers.email = '${updateEmail}', Suppliers.is_local = '${updateLocal}', Suppliers.address = '${updateAddress}' WHERE Suppliers.supplier_id = ${supplierID};`
  db.pool.query(updateQuery, [supplierID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

/*************************************
  ORDER ITEMS ROUTES
**************************************/
// Page to render for order_items READ
app.get('/order-items', function (req, res) {
  let query1 = `
  SELECT Order_Items.order_item_id AS ID,
  Orders.order_date AS 'Order Date',
  Orders.order_quantity AS 'Order Quantity',
  Orders.total_sale_price AS 'Total Order Price',
  Order_Items.order_id AS 'Order ID',
  Items.flower_name AS 'Item',
  Order_Items.item_id AS 'Item ID',
  Order_Items.quantity AS 'Order Item Quantity'
  FROM Order_Items
  LEFT JOIN Orders ON Orders.order_id = Order_Items.order_id
  LEFT JOIN Items ON Items.item_id =  Order_Items.item_id
  ORDER BY ID ASC;`

  if (req.query['order-items_name'] !== undefined) {
    query1 = `
    SELECT Order_Items.order_item_id AS ID,
    Orders.order_date AS 'Order Date',
    Orders.order_quantity AS 'Order Quantity',
    Orders.total_sale_price AS 'Total Order Price',
    Order_Items.order_id AS 'Order ID',
    Items.flower_name AS 'Item',
    Order_Items.item_id AS 'Item ID',
    Order_Items.quantity AS 'Order Item Quantity'
    FROM Order_Items
    LEFT JOIN Orders ON Orders.order_id = Order_Items.order_id
    LEFT JOIN Items ON Items.item_id =  Order_Items.item_id
    WHERE Order_Items.order_id = ${parseInt(req.query['order-items_name'])}
    ORDER BY ID ASC;`
  }

  db.pool.query(query1, function (error, rows, fields) {
    let order_items = rows
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      let orderQuery = `SELECT Orders.order_id AS ID
       FROM Orders;`
      db.pool.query(orderQuery, function (error, rows, fields) {
        let orders = rows
        if (error) {
          console.log(error)
          res.sendStatus(400)
        } else {
          let itemQuery = `SELECT Items.item_id AS ID,
          Items.flower_name AS Item
          FROM Items;`
          db.pool.query(itemQuery, function (error, rows, fields) {
            let items = rows
            if (error) {
              console.log(error)
              res.sendStatus(400)
            } else {
              res.render('order-items.hbs', {
                layout: 'index.hbs',
                pageTitle: 'Order Items',
                data: order_items,
                ordersdata: orders,
                itemsdata: items,
                isDisplayTables: true,
                tableId: 'Order-Items',
                searchTerm: 'ID',
              })
            }
          })
        }
      })
    }
  })
})

// Page to render for order items DELETE
app.delete('/delete-order-item-form', function (req, res, next) {
  let data = req.body
  let orderitemID = parseInt(data.id)
  let deleteQuery = `DELETE FROM Order_Items WHERE Order_Items.order_item_id = ${orderitemID};`
  db.pool.query(deleteQuery, [orderitemID], function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

// Page to render for order items CREATE
app.post('/add-order-item-form', function (req, res) {
  let data = req.body

  const addQuantity = parseInt(data['add-quantity'])

  const addOrderID = !data['add-order-select']
    ? ''
    : parseInt(data['add-order-select'])
  const addItemID = !data['add-item-select']
    ? ''
    : parseInt(data['add-item-select'])

  let insertQuery = `INSERT INTO Order_Items (quantity, order_id, item_id) VALUES (${addQuantity}, ${addOrderID}, ${addItemID});`
  if (!addOrderID && !addItemID) {
    insertQuery = `INSERT INTO Order_Items (quantity) VALUES (${addQuantity});`
  } else if (!addOrderID) {
    insertQuery = `INSERT INTO Order_Items (quantity, item_id) VALUES (${addQuantity}, ${addItemID});`
  } else if (!addItemID) {
    insertQuery = `INSERT INTO Order_Items (quantity, order_id) VALUES (${addQuantity}, ${addOrderID});`
  }

  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      res.redirect('/order-items')
    }
  })
})
