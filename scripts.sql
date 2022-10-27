-- Create new order
INSERT INTO
  `Orders` (order_date, order_quantity, total_sale_price)
VALUES(:order_dateInput, :order_quantityInput, :total_sale_priceInput)

-- View table uppon clicking Orders page
SELECT * FROM Orders

-- Update order
UPDATE `Orders`
SET order_date = :order_dateInput, order_quantity= :order_quantityInput, total_sale_price = :total_sale_priceInput
WHERE id= :order_ID_from_the_update_form

-- Delete order
DELETE FROM Orders WHERE id = :order_ID_selected_from_browse_order_page




-- Create new order_items
INSERT INTO
  `Order_Items` (quantity, order_id, item_id)
VALUES(:quantityInput, :order_idInput, :item_idInput)

-- View table uppon clicking Order_Items page
SELECT * FROM Order_Items

-- Update order_items
UPDATE `Order_Items`
SET quantity = :quantityInput, order_id= :order_idInput, item_id = :item_idInput
WHERE id= :order_items_ID_from_the_update_form

-- Delete order_items
DELETE FROM Order_Items WHERE id = :order_items_ID_selected_from_browse_order_page



-- Create new supplier
INSERT INTO
  `Suppliers` (name, address, email, is_local)
VALUES(:nameInput, :addressInput, :emailInput, :is_local_from_dropdown_Input)

-- View table uppon clicking Suppliers page
SELECT * FROM Suppliers

-- Update supplier
UPDATE `Suppliers`
SET name = :nameInput, address= :addressInput, email = :emailInput, is_local= :is_local_from_dropdown_Input
WHERE id= :supplier_ID_from_the_update_form

-- Delete supplier
DELETE FROM Suppliers WHERE id = :supplier_ID_selected_from_browse_supplier_page




-- Create new payment_method
INSERT INTO
  `Payment_Methods` (type)
VALUES(:typeInput)

-- View table uppon clicking Payment_Methods page
SELECT * FROM Payment_Methods

-- Update payment_method
UPDATE `Payment_Methods`
SET name = :typeInput
WHERE id= :payment_method_ID_from_the_update_form

-- Delete payment_method
DELETE FROM Payment_Methods WHERE id = :payment_method_ID_selected_from_browse_payment_method_page




-- Create new discount
INSERT INTO
  `Discounts` (code, percent)
VALUES(:codeInput, :percentInput)

-- View table uppon clicking Discounts page
SELECT * FROM Discounts

-- Update discount
UPDATE `Discounts`
SET code = :codeInput, percent= :percentInput
WHERE id= :discount_ID_from_the_update_form

-- Delete discount
DELETE FROM Discounts WHERE id = :discount_ID_selected_from_browse_discount_page