const updateOrderForm = document.getElementById('update-order-form')

updateOrderForm.addEventListener('submit', function () {
  const orderID = parseInt(document.getElementById('update-order-select').value)
  const newDate = document.getElementById('update-date')
  const newQuantity = document.getElementById('update-quantity')
  const newTotal = document.getElementById('update-total')
  const newCustomerID = parseInt(
    document.getElementById('update-customer-select').value
  )
  const newDiscountID = parseInt(
    document.getElementById('update-discount-select').value
  )
  const newPaymentID = parseInt(
    document.getElementById('update-payment-select').value
  )

  const newDateValue = newDate.value
  const newQuantityValue = parseInt(newQuantity.value)
  const newTotalValue = parseFloat(newTotal.value)

  let data = {
    id: orderID,
    date: newDateValue,
    quantity: newQuantityValue,
    total: newTotalValue,
    customerid: newCustomerID,
    discountid: newDiscountID,
    paymentid: newPaymentID,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-order-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/orders'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function orderFill(data) {
  const orderID = document.getElementById('update-order-select').value
  if (!orderID) {
    document.getElementById('update-date').value = ''
    document.getElementById('update-quantity').value = ''
    document.getElementById('update-total').value = ''
    document.getElementById('update-customer-select').value = ''
    document.getElementById('update-discount-select').value = ''
    document.getElementById('update-payment-select').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == orderID) {
      const dateToSet = new Date(data[i]['Order Date']).toLocaleDateString('en-CA') // 2020-08-19 (year-month-day) notice the different locale
      document.getElementById('update-date').value = dateToSet
      document.getElementById('update-quantity').value =
        data[i]['Order Quantity']
      document.getElementById('update-total').value =
        data[i]['Total Order Price']
      if (!data[i]['Customer ID'])
        document.getElementById('update-customer-select').value = ''
      else
        document.getElementById('update-customer-select').value =
          data[i]['Customer ID']
      if (!data[i]['Discount ID'])
        document.getElementById('update-discount-select').value = ''
      else
        document.getElementById('update-discount-select').value =
          data[i]['Discount ID']
      if (!data[i]['Payment Method ID'])
        document.getElementById('update-payment-select').value = ''
      else
        document.getElementById('update-payment-select').value =
          data[i]['Payment Method ID']
      return
    }
  }
}
