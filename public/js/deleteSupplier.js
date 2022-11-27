function deleteSupplier() {
  const supplierID = document.getElementById('delete-supplier-select').value
  if (!supplierID) return

  let data = {
    id: supplierID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-supplier-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/suppliers'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
