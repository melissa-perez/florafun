function deleteOrder() {
  const orderID = document.getElementById('delete-order-select').value
  if (!orderID) return

  let data = {
    id: orderID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-order-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/orders'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
