-- Create new order
INSERT INTO
  `Discounts` (code, percent)
VALUES(:codeInput, :percentInput)

-- View table uppon clicking Orders page
SELECT * FROM Discounts

-- Update order
UPDATE `Discounts`
SET code = :codeInput, percent= :percentInput
WHERE id= :discount_ID_from_the_update_form

-- Delete order
DELETE FROM Discounts WHERE id = :discount_ID_selected_from_browse_discount_page