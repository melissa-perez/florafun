function colorFill(data) {
    const customerID = document.getElementById('update-customer-select').value
    if (!customerID) {
      document.getElementById('update-name').value = ''
      document.getElementById('update-email').value = ''
      document.getElementById('update-address').value = ''
      document.getElementById('update-phone').value = ''
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].ID == customerID) {
        document.getElementById('update-name').value = data[i].Name
        document.getElementById('update-email').value = data[i].Email
        document.getElementById('update-address').value = data[i].Address
        document.getElementById('update-phone').value = data[i]['Phone Number']
        break
      }
    }
  }