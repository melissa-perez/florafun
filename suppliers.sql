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