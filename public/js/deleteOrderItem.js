function deleteOrderItem() {
  const orderItemID = document.getElementById('delete-order-item-select').value
  if (!orderItemID) return

  let data = {
    id: orderItemID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-order-item-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/order-items'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
