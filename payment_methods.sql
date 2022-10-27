-- Create new supplier
INSERT INTO
  `Payment_Methods` (type)
VALUES(:typeInput)

-- View table uppon clicking Suppliers page
SELECT * FROM Payment_Methods

-- Update supplier
UPDATE `Payment_Methods`
SET name = :typeInput
WHERE id= :payment_method_ID_from_the_update_form

-- Delete supplier
DELETE FROM Payment_Methods WHERE id = :payment_method_ID_selected_from_browse_payment_method_page