-- Create new order
INSERT INTO
  `Orders` (order_date, order_quantity, total_sale_price)
VALUES
  (
    :order_dateInput,
    :order_quantityInput,
    :total_sale_priceInput
  );

-- View table uppon clicking Orders page
SELECT
  Orders.order_id,
  Orders.order_date,
  Orders.order_quantity,
  Orders.total_sale_price,
  Customers.name,
  Payment_Methods.type,
  Discounts.code
FROM
  `Orders`
  INNER JOIN Customers ON Orders.customer_id = Customers.customer_id
  INNER JOIN Payment_Methods ON Orders.payment_method_id = Payment_Methods.payment_method_id
  INNER JOIN Discounts ON Orders.discount_id = Discounts.discount_id;

-- Update order
UPDATE
  `Orders`
SET
  order_date = :order_dateInput,
  order_quantity = :order_quantityInput,
  total_sale_price = :total_sale_priceInput
WHERE
  id = :order_ID_from_the_update_form;

-- Delete order
DELETE FROM
  Orders
WHERE
  id = :order_ID_selected_from_browse_order_page;

-- Create new order_items
INSERT INTO
  `Order_Items` (quantity, order_id, item_id)
VALUES
  (:quantityInput, :order_idInput, :item_idInput);

-- View table uppon clicking Order_Items page
SELECT
  Order_Items.order_item_id,
  Order_Items.quantity,
  Order_Items.order_id,
  Items.flower_name
FROM
  Order_Items
  INNER JOIN Items ON Order_Items.item_id = Items.item_id;

-- Update order_items
UPDATE
  `Order_Items`
SET
  quantity = :quantityInput,
  order_id = :order_idInput,
  item_id = :item_idInput
WHERE
  id = :order_items_ID_from_the_update_form;

-- Delete order_items
DELETE FROM
  Order_Items
WHERE
  id = :order_items_ID_selected_from_browse_order_page;

-- Create new supplier
INSERT INTO
  `Suppliers` (name, address, email, is_local);

VALUES
  (
    :nameInput,
    :addressInput,
    :emailInput,
    :is_local_from_dropdown_Input
  ) -- View table uppon clicking Suppliers page
SELECT
  *
FROM
  Suppliers;

-- Update supplier
UPDATE
  `Suppliers`
SET
  name = :nameInput,
  address = :addressInput,
  email = :emailInput,
  is_local = :is_local_from_dropdown_Input
WHERE
  id = :supplier_ID_from_the_update_form;

-- Delete supplier
DELETE FROM
  Suppliers
WHERE
  id = :supplier_ID_selected_from_browse_supplier_page;

-- Create new payment_method
INSERT INTO
  `Payment_Methods` (type)
VALUES
  (:typeInput);

-- View table uppon clicking Payment_Methods page
SELECT
  *
FROM
  Payment_Methods;

-- Update payment_method
UPDATE
  `Payment_Methods`
SET
  name = :typeInput
WHERE
  id = :payment_method_ID_from_the_update_form;

-- Delete payment_method
DELETE FROM
  Payment_Methods
WHERE
  id = :payment_method_ID_selected_from_browse_payment_method_page;

-- Create new discount
INSERT INTO
  `Discounts` (code, percent)
VALUES
  (:codeInput, :percentInput);

-- View table uppon clicking Discounts page
SELECT
  *
FROM
  Discounts;

-- Update discount
UPDATE
  `Discounts`
SET
  code = :codeInput,
  percent = :percentInput
WHERE
  id = :discount_ID_from_the_update_form;

-- Delete discount
DELETE FROM
  Discounts
WHERE
  id = :discount_ID_selected_from_browse_discount_page;

/********************************************************
 Entity: Colors
 The following are defined actions for the Colors entity.
 Actions: INSERT, SEARCH
 *******************************************************/
-- SELECT all Colors to display in the Colors page.
SELECT
  *
FROM
  Colors;

-- INSERT a new color into Colors.
INSERT INTO
  Colors (color)
VALUES
  (:colorName);

-- SELECT all Colors relating to search in the Colors page.
SELECT
  *
FROM
  Colors
WHERE
  Colors.color LIKE CONCAT("%", LOWER(:colorName), "%");

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