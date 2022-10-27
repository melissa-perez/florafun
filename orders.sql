-- Create new order
INSERT INTO
  `Orders` (order_date, order_quantity, total_sale_price)
VALUES
  (
    :order_dateInput,
    :order_quantityInput,
    :total_sale_priceInput
  ) -- View table uppon clicking Orders page
SELECT
  *
FROM
  Orders -- Update order
UPDATE
  `Orders`
SET
  order_date = :order_dateInput,
  order_quantity = :order_quantityInput,
  total_sale_price = :total_sale_priceInput
WHERE
  id = :order_ID_from_the_update_form -- Delete order
DELETE FROM
  Orders
WHERE
  id = :order_ID_selected_from_browse_order_page -- Create new order_item
INSERT INTO
  `Order_Items` (quantity)
VALUES(:quantityInput)

-- View table uppon clicking Order_Items page
SELECT * FROM Order_Items

-- Update order_item
UPDATE `Order_Items`
SET quantity = :quantityInput
WHERE id= :order_item_ID_from_the_update_form

-- Delete order
DELETE FROM Order_Items WHERE id = :order_item_ID_selected_from_browse_order_item_page

