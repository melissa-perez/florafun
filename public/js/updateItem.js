const updateItemForm = document.getElementById('update-item-form')

updateItemForm.addEventListener('submit', function (e) {
  const itemID = document.getElementById('update-item-select').value
  const newName = document.getElementById('update-name')
  const newSciName = document.getElementById('update-sci-name')
  const newStock = document.getElementById('update-stock')
  const newPrice = document.getElementById('update-price')
  const newColorID = document.getElementById('update-color-select').value
  const newSupplierID = document.getElementById('update-supplier-select').value
  const newIndoor = document.getElementById('update-indoor-select').value

  const newNameValue = newName.value
  const newSciNameValue = newSciName.value
  const newStockValue = newStock.value
  const newPriceValue = newPrice.value

  let data = {
    id: itemID,
    name: newNameValue,
    sciName: newSciNameValue,
    stock: newStockValue,
    price: newPriceValue,
    colorid: newColorID,
    supplierid: newSupplierID,
    indoor: newIndoor,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-item-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/items'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function itemFill(data) {
  const itemID = document.getElementById('update-item-select').value
  if (!itemID) {
    document.getElementById('update-name').value = ''
    document.getElementById('update-sci-name').value = ''
    document.getElementById('update-stock').value = ''
    document.getElementById('update-price').value = ''
    document.getElementById('update-indoor-select').value = ''
    document.getElementById('update-color-select').value = ''
    document.getElementById('update-supplier-select').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == itemID) {
      document.getElementById('update-name').value = data[i].Item
      document.getElementById('update-sci-name').value =
        data[i]['Scientific name']
      document.getElementById('update-stock').value = data[i].Stock
      document.getElementById('update-price').value = data[i].Price
      document.getElementById('update-indoor-select').value =
        data[i].Indoor == 'Yes' ? '1' : '0'
      if (!data[i]['Supplier ID'])
        document.getElementById('update-supplier-select').value = ''
      else
        document.getElementById('update-supplier-select').value =
          data[i]['Supplier ID']
      if (!data[i]['Color ID'])
        document.getElementById('update-color-select').value = ''
      else
        document.getElementById('update-color-select').value =
          data[i]['Color ID']
      return
    }
  }
}
