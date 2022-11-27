const updatePaymentMethodForm = document.getElementById(
  'update-payment-method-form'
)

updatePaymentMethodForm.addEventListener('submit', function (e) {
  const methodID = document.getElementById('update-payment-method-select').value
  const newType = document.getElementById('update-type')

  const newTypeValue = newType.value

  let data = {
    id: methodID,
    type: newTypeValue,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-payment-method-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/payment-methods'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function typeFill(data) {
  const typeID = document.getElementById('update-payment-method-select').value
  if (!typeID) {
    document.getElementById('update-type').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == typeID) {
      document.getElementById('update-type').value = data[i].Type
      return
    }
  }
}
