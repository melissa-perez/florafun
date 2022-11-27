const updateCustomerForm = document.getElementById('update-customer-form')

updateCustomerForm.addEventListener('submit', function (e) {
  const customerID = document.getElementById('update-customer-select').value
  const newName = document.getElementById('update-name')
  const newAddress = document.getElementById('update-address')
  const newEmail = document.getElementById('update-email')
  const newPhone = document.getElementById('update-phone')

  const newNameValue = newName.value
  const newAddressValue = newAddress.value
  const newEmailValue = newEmail.value
  const newPhoneValue = newPhone.value

  let data = {
    id: customerID,
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
      console.log(res)
      res.redirect('/customers')
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function customerFill(data) {
  const customerID = document.getElementById('update-customer-select').value
  if (!customerID) {
    document.getElementById('update-name').value = ''
    document.getElementById('update-email').value = ''
    document.getElementById('update-address').value = ''
    document.getElementById('update-phone').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == customerID) {
      document.getElementById('update-name').value = data[i].Name
      document.getElementById('update-email').value = data[i].Email
      document.getElementById('update-address').value = data[i].Address
      document.getElementById('update-phone').value = data[i]['Phone Number']
      break
    }
  }
}
