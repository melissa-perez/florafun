const updateSupplierForm = document.getElementById('update-supplier-form')

updateSupplierForm.addEventListener('submit', function (e) {
  const supplierID = document.getElementById('update-supplier-select').value
  const newName = document.getElementById('update-name')
  const newAddress = document.getElementById('update-address')
  const newEmail = document.getElementById('update-email')
  const newLocal = document.getElementById('update-local')

  const newNameValue = newName.value
  const newAddressValue = newAddress.value
  const newEmailValue = newEmail.value
  const newLocalValue = newLocal.value

  let data = {
    id: supplierID,
    name: newNameValue,
    address: newAddressValue,
    email: newEmailValue,
    local: newLocalValue,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-supplier-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/suppliers'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function supplierFill(data) {
  const supplierID = document.getElementById('update-supplier-select').value
  if (!supplierID) {
    document.getElementById('update-name').value = ''
    document.getElementById('update-email').value = ''
    document.getElementById('update-address').value = ''
    document.getElementById('update-local').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == supplierID) {
      document.getElementById('update-name').value = data[i].Name
      document.getElementById('update-email').value = data[i].Email
      document.getElementById('update-address').value = data[i].Address
      document.getElementById('update-local').value = data[i].Local
      return
    }
  }
}
