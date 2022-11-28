const updateOrderItemForm = document.getElementById('update-order-item-form')

updateOrderItemForm.addEventListener('submit', function () {
  const orderItemID = document.getElementById('update-order-item-select').value
  const newQuantity = document.getElementById('update-quantity')
  const newOrderID = document.getElementById('update-order-select').value
  const newItemID = document.getElementById('update-item-select').value
  const newQuantityValue = parseInt(newQuantity.value)
  const newOrderIDValue = parseInt(newOrderID)
  const newItemIDValue = parseInt(newItemID)

  let data = {
    id: orderItemID,
    quantity: newQuantityValue,
    orderid: newOrderIDValue,
    itemid: newItemIDValue,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-order-item-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/order-items'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function orderItemFill(data) {
  const orderItemID = document.getElementById('update-order-item-select').value
  if (!orderItemID) {
    document.getElementById('update-quantity').value = ''
    document.getElementById('update-item-select').value = ''
    document.getElementById('update-order-select').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == orderItemID) {
      document.getElementById('update-quantity').value =
        data[i]['Order Item Quantity']
      if (!data[i]['Order ID'])
        document.getElementById('update-order-select').value = ''
      else
        document.getElementById('update-order-select').value =
          data[i]['Order ID']
      if (!data[i]['Item ID'])
        document.getElementById('update-item-select').value = ''
      else
        document.getElementById('update-item-select').value = data[i]['Item ID']
      return
    }
  }
}
