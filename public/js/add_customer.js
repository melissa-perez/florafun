let addCustomerForm = document.getElementById('add-customer-form-ajax')

// Modify the objects we need
addCustomerForm.addEventListener('submit', function (e) {
  e.preventDefault()
  // Get form fields we need to get data from
  let inputName = document.getElementById('input-name')
  let inputAddress = document.getElementById('input-address')
  let inputEmail = document.getElementById('input-email')
  let inputPhone = document.getElementById('input-phone')
  // Get the values from the form fields
  let nameValue = inputName.value
  let addressValue = inputAddress.value
  let emailValue = inputEmail.value
  let phoneValue = inputPhone.value

  // Put our data we want to send in a javascript object
  let data = {
    name: nameValue,
    address: addressValue,
    email: emailValue,
    phone: phoneValue,
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest()
  xhttp.open('POST', '/add-customer-ajax', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response)

      // Clear the input fields for another transaction
      inputName.value = ''
      inputAddress.value = ''
      inputEmail.value = ''
      inputPhone.value = ''
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data))
})

// Creates a single row from an Object representing a single record from
addRowToTable = (data) => {
  console.log(`In add row to table${data}`)
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById('customers-table')

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data)
  let newRow = parsedData[parsedData.length - 1]
  console.log(newRow)
  let row = document.createElement('tr')

  let idCell = document.createElement('td')
  let nameCell = document.createElement('td')
  let addressCell = document.createElement('td')
  let emailCell = document.createElement('td')
  let phoneCell = document.createElement('td')

  // Fill the cells with correct data
  idCell.innerText = newRow.ID
  nameCell.innerText = newRow.Name
  addressCell.innerText = newRow.Address
  emailCell.innerText = newRow.Email
  phoneCell.innerText = newRow['Phone Number']
  console.log(newRow['Phone Number'])
  // Add the cells to the row
  row.appendChild(idCell)
  row.appendChild(nameCell)
  row.appendChild(addressCell)
  row.appendChild(emailCell)
  row.appendChild(phoneCell)

  // Add the row to the table
  currentTable.appendChild(row)
}
