function deleteItem() {
  const itemID = document.getElementById('delete-item-select').value
  if (!itemID) return

  let data = {
    id: itemID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-item-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/items'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
