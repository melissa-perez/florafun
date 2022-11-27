function deleteDiscount() {
  const discountID = document.getElementById('delete-discount-select').value
  if (!discountID) return

  let data = {
    id: discountID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/delete-discount-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/discounts'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
