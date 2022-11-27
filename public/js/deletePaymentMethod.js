function deletePaymentMethod() {
  const methodID = document.getElementById('delete-payment-method-select').value
  if (!methodID) return
  let data = {
    id: methodID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-payment-method-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/payment-methods'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
