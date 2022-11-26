let updateCustomerForm = document.getElementById('update-customer-form')

updateCustomerForm.addEventListener('submit', function (e) {
  e.preventDefault()

  let newName = document.getElementById('update-name')
  let newAddress = document.getElementById('update-address')
  let newEmail = document.getElementById('update-email')
  let newPhone = document.getElementById('update-phone')

  let newNameValue = newName.value
  let newAddressValue = newAddress.value
  let newEmailValue = newEmail.value
  let newPhoneValue = newPhone.value

  let data = {
    name: newNameValue,
    address: newAddressValue,
    email: newEmailValue,
    phone: newPhoneValue,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-customer-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      res.redirect('/customers')
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function customerFill(data) {
  const customerID = document.getElementById('update-customer-select').value
  console.log(customerID)
  console.log(data)
}
