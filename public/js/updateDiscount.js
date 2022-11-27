const updateDiscountForm = document.getElementById('update-discount-form')

updateDiscountForm.addEventListener('submit', function (e) {
  const discountID = document.getElementById('update-discount-select').value
  const newCode = document.getElementById('update-code')
  const newPercent = document.getElementById('update-percent')

  const newCodeValue = newCode.value
  const newPercentValue = parseInt(newPercent.value)

  let data = {
    id: discountID,
    code: newCodeValue,
    percent: newPercentValue,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/update-discount-form', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = '/discounts'
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function discountFill(data) {
  const discountID = document.getElementById('update-discount-select').value
  if (!discountID) {
    document.getElementById('update-code').value = ''
    document.getElementById('update-percent').value = ''
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID == discountID) {
      document.getElementById('update-code').value = data[i].Code
      document.getElementById('update-percent').value = data[i].Percent
      return
    }
  }
}
