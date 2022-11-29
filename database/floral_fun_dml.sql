/********************************************************
 Entity: COLORS
 The following are defined actions for the COLORS entity.
 ACTIONS: INSERT, READ
 *******************************************************/
-- SELECT all colors
SELECT
  Colors.color_id AS "ID",
  Colors.color AS "Color"
FROM
  Colors
ORDER BY
  ID ASC;

--SELECT a color based on name
SELECT
  Colors.color_id AS "ID",
  Colors.color AS "Color"
FROM
  Colors
WHERE
  Colors.color LIKE CONCAT(
    "%",
    "${String(
      req.query.colors_name
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- Add a new color
INSERT INTO
  Colors (color)
VALUES
  (
    '${String(
    data['
    add
      - color ']
  ).trim()}'
  );

/********************************************************
 Entity: CUSTOMERS
 The following are defined actions for the Customers entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- SELECT all Customers to display.
SELECT
  Customers.customer_id AS "ID",
  Customers.name AS "Name",
  Customers.address AS "Address",
  Customers.email AS "Email",
  Customers.phone AS "Phone Number"
FROM
  Customers
ORDER BY
  ID ASC;

-- SELECT Customer that matches name to display.
SELECT
  Customers.customer_id AS "ID",
  Customers.name AS "Name",
  Customers.address AS "Address",
  Customers.email AS "Email",
  Customers.phone AS "Phone Number"
FROM
  Customers
WHERE
  Customers.name LIKE CONCAT(
    "%",
    "${String(
      req.query.customers_name
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- CREATE Customer, changes depending on NULL value.
INSERT INTO
  Customers (name, address, email, phone)
VALUES
  (
    '${addName}',
    '${addAddress}',
    '${addEmail}',
    '${addPhone}'
  );

INSERT INTO
  Customers (name, address, email)
VALUES
  ('${addName}', '${addAddress}', '${addEmail}');

-- UPDATE Customer, changes depending on NULL value.
UPDATE
  Customers
SET
  Customers.name = '${updateName}',
  Customers.email = '${updateEmail}',
  Customers.phone = '${updatePhone}',
  Customers.address = '${updateAddress}'
WHERE
  Customers.customer_id = $ { customerID };

UPDATE
  Customers
SET
  Customers.name = '${updateName}',
  Customers.email = '${updateEmail}',
  Customers.phone = '${updatePhone}',
  Customers.address = '${updateAddress}'
WHERE
  Customers.customer_id = $ { customerID };

-- DELETE customer on ID
DELETE FROM
  Customers
WHERE
  Customers.customer_id = $ { customerID };

/********************************************************
 Entity: ITEMS
 The following are defined actions for the Items entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- SELECT all Items to display in the Items page with updated FOREIGN KEYS.
SELECT
  Items.item_id AS ID,
  Items.flower_name AS Item,
  Items.scientific_name AS 'Scientific name',
  IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
  Items.stock_quantity AS Stock,
  Items.price AS Price,
  Colors.color AS Color,
  Items.color_id AS 'Color ID',
  Suppliers.name AS Supplier,
  Items.supplier_id AS 'Supplier ID'
FROM
  Items
  LEFT JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
  LEFT JOIN Colors ON Colors.color_id = Items.color_id
ORDER BY
  ID ASC;

-- SELECT Items that match name to display in the Items page with updated FOREIGN KEYS.
SELECT
  Items.item_id AS ID,
  Items.flower_name AS Item,
  Items.scientific_name AS 'Scientific name',
  IF(Items.is_indoor, 'Yes', 'No') AS Indoor,
  Items.stock_quantity AS Stock,
  Items.price AS Price,
  Colors.color AS Color,
  Items.color_id AS 'Color ID',
  Suppliers.name AS Supplier,
  Items.supplier_id AS 'Supplier ID'
FROM
  Items
  LEFT JOIN Suppliers ON Suppliers.supplier_id = Items.supplier_id
  LEFT JOIN Colors ON Colors.color_id = Items.color_id
WHERE
  Items.flower_name LIKE CONCAT(
    "%",
    "${String(
      req.query.items_name
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- DELETE Item that matches ID.
DELETE FROM
  Items
WHERE
  Items.item_id = $ { itemID };

-- UPDATE Item that matches ID, changes depending on NULL value.
UPDATE
  Items
SET
  Items.flower_name = '${updateName}',
  Items.scientific_name = '${updateSciName}',
  Items.is_indoor = $ { updateIndoor },
  Items.stock_quantity = $ { updateStock },
  Items.price = $ { updatePrice },
  Items.supplier_id = $ { updateSupplierID },
  Items.color_id = $ { updateColorID }
WHERE
  Items.item_id = $ { itemID };

UPDATE
  Items
SET
  Items.flower_name = '${updateName}',
  Items.scientific_name = '${updateSciName}',
  Items.is_indoor = $ { updateIndoor },
  Items.stock_quantity = $ { updateStock },
  Items.price = $ { updatePrice },
  Items.supplier_id = NULL,
  Items.color_id = NULL
WHERE
  Items.item_id = $ { itemID };

UPDATE
  Items
SET
  Items.flower_name = '${updateName}',
  Items.scientific_name = '${updateSciName}',
  Items.is_indoor = $ { updateIndoor },
  Items.stock_quantity = $ { updateStock },
  Items.price = $ { updatePrice },
  Items.supplier_id = $ { updateSupplierID },
  Items.color_id = NULL
WHERE
  Items.item_id = $ { itemID };

UPDATE
  Items
SET
  Items.flower_name = '${updateName}',
  Items.scientific_name = '${updateSciName}',
  Items.is_indoor = $ { updateIndoor },
  Items.stock_quantity = $ { updateStock },
  Items.price = $ { updatePrice },
  Items.color_id = $ { updateColorID },
  Items.supplier_id = NULL
WHERE
  Items.item_id = $ { itemID };

-- CREATE Item, changes depending on NULL value.
INSERT INTO
  Items (
    flower_name,
    scientific_name,
    is_indoor,
    stock_quantity,
    price,
    supplier_id,
    color_id
  )
VALUES
  (
    '${addName}',
    '${addSciName}',
    $ { addIndoor },
    $ { addStock },
    $ { addPrice },
    $ { addSupplierID },
    $ { addColorID }
  );

INSERT INTO
  Items (
    flower_name,
    scientific_name,
    is_indoor,
    stock_quantity,
    price
  )
VALUES
  (
    '${addName}',
    '${addSciName}',
    $ { addIndoor },
    $ { addStock },
    $ { addPrice }
  );

INSERT INTO
  Items (
    flower_name,
    scientific_name,
    is_indoor,
    stock_quantity,
    price,
    supplier_id
  )
VALUES
  (
    '${addName}',
    '${addSciName}',
    $ { addIndoor },
    $ { addStock },
    $ { addPrice },
    $ { addSupplierID }
  );

INSERT INTO
  Items (
    flower_name,
    scientific_name,
    is_indoor,
    stock_quantity,
    price,
    color_id
  )
VALUES
  (
    '${addName}',
    '${addSciName}',
    $ { addIndoor },
    $ { addStock },
    $ { addPrice },
    $ { addColorID }
  );

/********************************************************
 Entity: DISCOUNTS
 The following are defined actions for the DISCOUNTS entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- display all Discounts
SELECT
  Discounts.discount_id AS ID,
  Discounts.code AS Code,
  Discounts.percent AS Percent
FROM
  Discounts
ORDER BY
  ID ASC;

-- display discounts matching name
SELECT
  Discounts.discount_id AS ID,
  Discounts.code AS Code,
  Discounts.percent AS Percent
FROM
  Discounts
WHERE
  Discounts.code LIKE CONCAT(
    "%",
    "${String(
      req.query.discounts_name
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- delete a discount
DELETE FROM
  Discounts
WHERE
  Discounts.discount_id = $ { discountID };

-- add a new discount
INSERT INTO
  Discounts (code, percent)
VALUES
  ('${addCode}', $ { addPercent });

--- update a discount matching id
UPDATE
  Discounts
SET
  Discounts.code = '${updateCode}',
  Discounts.percent = $ { updatePercent }
WHERE
  Discounts.discount_id = $ { discountID };

/********************************************************
 Entity: PAYMENT_METHODS
 The following are defined actions for the PAYMENT_METHODS entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- display all payment methods
SELECT
  Payment_Methods.payment_method_id AS ID,
  Payment_Methods.type AS Type
FROM
  Payment_Methods
ORDER BY
  ID ASC;

-- display a payment method on type
SELECT
  Payment_Methods.payment_method_id AS ID,
  Payment_Methods.type AS Type
FROM
  Payment_Methods
WHERE
  Payment_Methods.type LIKE CONCAT(
    "%",
    "${String(
      req.query['payment-methods_name']
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- update a payment method
UPDATE
  Payment_Methods
SET
  type = '${data[' type ']}'
WHERE
  payment_method_id = '${data[' id ']}' -- add a new payment
INSERT INTO
  Payment_Methods (type)
VALUES
  ('${addPaymentMethodType}');

-- delete a payment method
DELETE FROM
  Payment_Methods
WHERE
  Payment_Methods.payment_method_id = $ { paymentMethodID };

/********************************************************
 Entity: SUPPLIERS
 The following are defined actions for the SUPPLIERS entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- display all suppliers
SELECT
  Suppliers.supplier_id AS ID,
  Suppliers.name AS Name,
  Suppliers.address AS Address,
  Suppliers.email AS Email,
  IF(Suppliers.is_local, 'Yes', 'No') AS Local
FROM
  Suppliers
ORDER BY
  ID ASC;

-- display supplier based on name
SELECT
  Suppliers.supplier_id AS ID,
  Suppliers.name AS Name,
  Suppliers.address AS Address,
  Suppliers.email AS Email,
  IF(Suppliers.is_local, 'Yes', 'No') AS Local
FROM
  Suppliers
WHERE
  Suppliers.name LIKE CONCAT(
    "%",
    "${String(
      req.query.suppliers_name
    ).trim()}",
    "%"
  )
ORDER BY
  ID ASC;

-- delete supplier
DELETE FROM
  Suppliers
WHERE
  Suppliers.supplier_id = $ { supplierID };

-- add a new supplier
INSERT INTO
  Suppliers (name, address, email, is_local)
VALUES
  (
    '${addName}',
    '${addAddress}',
    '${addEmail}',
    $ { addLocal }
  );

-- update supplier
UPDATE
  Suppliers
SET
  Suppliers.name = '${updateName}',
  Suppliers.email = '${updateEmail}',
  Suppliers.is_local = '${updateLocal}',
  Suppliers.address = '${updateAddress}'
WHERE
  Suppliers.supplier_id = $ { supplierID };

/********************************************************
 Entity: ORDER_ITEMS
 The following are defined actions for the ORDER_ITEMS entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- display all order items
SELECT
  Order_Items.order_item_id AS ID,
  Orders.order_date AS 'Order Date',
  Orders.order_quantity AS 'Order Quantity',
  Orders.total_sale_price AS 'Total Order Price',
  Order_Items.order_id AS 'Order ID',
  Items.flower_name AS 'Item',
  Order_Items.item_id AS 'Item ID',
  Order_Items.quantity AS 'Order Item Quantity'
FROM
  Order_Items
  LEFT JOIN Orders ON Orders.order_id = Order_Items.order_id
  LEFT JOIN Items ON Items.item_id = Order_Items.item_id
ORDER BY
  ID ASC;

-- display order items of the same order id
SELECT
  Order_Items.order_item_id AS ID,
  Orders.order_date AS 'Order Date',
  Orders.order_quantity AS 'Order Quantity',
  Orders.total_sale_price AS 'Total Order Price',
  Order_Items.order_id AS 'Order ID',
  Items.flower_name AS 'Item',
  Order_Items.item_id AS 'Item ID',
  Order_Items.quantity AS 'Order Item Quantity'
FROM
  Order_Items
  LEFT JOIN Orders ON Orders.order_id = Order_Items.order_id
  LEFT JOIN Items ON Items.item_id = Order_Items.item_id
WHERE
  Order_Items.order_id = $ { parseInt(req.query ['order-items_name']) }
ORDER BY
  ID ASC;

-- delete an order item
DELETE FROM
  Order_Items
WHERE
  Order_Items.order_item_id = $ { orderitemID };

-- insert order item depending on whether null is used
INSERT INTO
  Order_Items (quantity, order_id, item_id)
VALUES
  (
    $ { addQuantity },
    $ { addOrderID },
    $ { addItemID }
  );

INSERT INTO
  Order_Items (quantity)
VALUES
  ($ { addQuantity });

INSERT INTO
  Order_Items (quantity, item_id)
VALUES
  ($ { addQuantity }, $ { addItemID });

INSERT INTO
  Order_Items (quantity, order_id)
VALUES
  ($ { addQuantity }, $ { addOrderID });

-- update order item depending on whether null is used
UPDATE
  Order_Items
SET
  Order_Items.quantity = $ { updateQuantity },
  Order_Items.order_id = $ { updateOrderID },
  Order_Items.item_id = $ { updateItemID }
WHERE
  Order_Items.order_item_id = $ { orderItemID };

UPDATE
  Order_Items
SET
  Order_Items.quantity = $ { updateQuantity },
  Order_Items.order_id = NULL,
  Order_Items.item_id = NULL
WHERE
  Order_Items.order_item_id = $ { orderItemID };

UPDATE
  Order_Items
SET
  Order_Items.quantity = $ { updateQuantity },
  Order_Items.order_id = NULL,
  Order_Items.item_id = $ { updateItemID }
WHERE
  Order_Items.order_item_id = $ { orderItemID };

UPDATE
  Order_Items
SET
  Order_Items.quantity = $ { updateQuantity },
  Order_Items.order_id = $ { updateOrderID },
  Order_Items.item_id = NULL
WHERE
  Order_Items.order_item_id = $ { orderItemID };

/********************************************************
 Entity: ORDERS
 The following are defined actions for the ORDERS entity.
 ACTIONS: INSERT, READ, UPDATE, DELETE
 *******************************************************/
-- displays all orders
SELECT
  Orders.order_id AS ID,
  Orders.order_date AS 'Order Date',
  Orders.order_quantity AS 'Order Quantity',
  Orders.total_sale_price AS 'Total Order Price',
  Customers.name AS 'Customer Name',
  Customers.email AS 'Customer Email',
  Orders.customer_id AS 'Customer ID',
  Payment_Methods.type AS 'Payment Type',
  Orders.payment_method_id AS 'Payment Method ID',
  Discounts.code AS 'Discount Applied',
  Orders.discount_id AS 'Discount ID'
FROM
  Orders
  LEFT JOIN Customers ON Customers.customer_id = Orders.customer_id
  LEFT JOIN Payment_Methods ON Payment_Methods.payment_method_id = Orders.payment_method_id
  LEFT JOIN Discounts ON Discounts.discount_id = Orders.discount_id
ORDER BY
  ID ASC;

-- display order based on id
SELECT
  Orders.order_id AS ID,
  Orders.order_date AS 'Order Date',
  Orders.order_quantity AS 'Order Quantity',
  Orders.total_sale_price AS 'Total Order Price',
  Customers.name AS 'Customer Name',
  Customers.email AS 'Customer Email',
  Orders.customer_id AS 'Customer ID',
  Payment_Methods.type AS 'Payment Type',
  Orders.payment_method_id AS 'Payment Method ID',
  Discounts.code AS 'Discount Applied',
  Orders.discount_id AS 'Discount ID'
FROM
  Orders
  LEFT JOIN Customers ON Customers.customer_id = Orders.customer_id
  LEFT JOIN Payment_Methods ON Payment_Methods.payment_method_id = Orders.payment_method_id
  LEFT JOIN Discounts ON Discounts.discount_id = Orders.discount_id
WHERE
  Orders.order_id = $ { parseInt(req.query ['orders_name']) }
ORDER BY
  ID ASC;

-- delete an order on id
DELETE FROM
  Orders
WHERE
  Orders.order_id = $ { orderID };

-- insert new order depending on what is null
INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    customer_id,
    payment_method_id,
    discount_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addCustomerID },
    $ { addPaymentID },
    $ { addDiscountID }
  );

INSERT INTO
  Orders (order_date, order_quantity, total_sale_price)
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice }
  );

INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    customer_id,
    payment_method_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addCustomerID },
    $ { addPaymentID }
  );

INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    customer_id,
    discount_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addCustomerID },
    $ { addDiscountID }
  );

insertQuery =
INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    customer_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addCustomerID }
  );

insertQuery =
INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    payment_method_id,
    discount_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addPaymentID },
    $ { addDiscountID }
  );

INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    payment_method_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addPaymentID }
  );

INSERT INTO
  Orders (
    order_date,
    order_quantity,
    total_sale_price,
    discount_id
  )
VALUES
  (
    '${addDate}',
    '${addOrderQuantity}',
    $ { addTotalSalePrice },
    $ { addDiscountID }
  );

-- update order depending if null is entered
UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = $ { updateCustomerID },
  Orders.discount_id = $ { updateDiscountID },
  Orders.payment_method_id = $ { updatePaymentID }
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = NULL,
  Orders.discount_id = NULL,
  Orders.payment_method_id = NULL
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = $ { updateCustomerID },
  Orders.discount_id = NULL,
  Orders.payment_method_id = $ { updatePaymentID }
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = $ { updateCustomerID },
  Orders.discount_id = $ { updateDiscountID },
  Orders.payment_method_id = NULL
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = $ { updateCustomerID },
  Orders.discount_id = NULL,
  Orders.payment_method_id = NULL
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = NULL,
  Orders.discount_id = $ { updateDiscountID },
  Orders.payment_method_id = $ { updatePaymentID }
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = NULL,
  Orders.discount_id = NULL,
  Orders.payment_method_id = $ { updatePaymentID }
WHERE
  Orders.order_id = $ { orderID };

UPDATE
  Orders
SET
  Orders.order_date = '${updateDate}',
  Orders.order_quantity = $ { updateQuantity },
  Orders.total_sale_price = $ { updateTotal },
  Orders.customer_id = NULL,
  Orders.discount_id = $ { updateDiscountID },
  Orders.payment_method_id = NULL
WHERE
  Orders.order_id = $ { orderID };