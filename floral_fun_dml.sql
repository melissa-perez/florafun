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
  *
FROM
  Orders;

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
  *
FROM
  Order_Items;

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
  `Colors` (name)
VALUES
  (:colorInput);

-- Create new Customer
INSERT INTO
  `Customers` (name, email, phone, address)
VALUES
  (
    :nameInput,
    :emailInput,
    :phoneInput,
    :addressInput
  );

-- View table upon clicking Customers page
SELECT
  *
FROM
  Customers;

-- Update customer
UPDATE
  `Customers`
SET
  name = :nameInput,
  email = :emailInput,
  phone = :phoneInput,
  address = :addressInput
)
WHERE
  id = :customer_ID_from_the_update_form;

-- Delete customer
DELETE FROM
  Customers
WHERE
  id = :customer_ID_selected_from_browse_customer_page;

-- Create new Item
INSERT INTO
  `Items` (
    flower_name,
    scientific_name,
    is_indoor,
    stock_quantity,
    price
  )
VALUES
  (
    :flowerNameInput,
    :sciNameInput,
    :isIndoorInput,
    :stockQuantityInput,
    :priceInput
  );

-- View table upon clicking Items page
SELECT
  *
FROM
  Items;

-- Update items
UPDATE
  `Items`
SET
  flower_name = :flowerNameInput,
  scientific_name = :sciNameInput,
  is_indoor = :isIndoorInput,
  stock_quantity = :stockQuantityInput,
  price = :priceInput
)
WHERE
  id = :item_ID_from_the_update_form;

-- Delete item
DELETE FROM
  Items
WHERE
  id = :item_ID_selected_from_browse_item_page;