let updateCustomerForm = document.getElementById('update-customer-form')

updateCustomerForm.addEventListener('submit', function (e) {
  e.preventDefault()
  // set up the drop down to fill

  // Get form fields we need to get data from
  let inputFullName = document.getElementById('mySelect')
  let inputHomeworld = document.getElementById('input-homeworld-update')

  // Get the values from the form fields
  let fullNameValue = inputFullName.value
  let homeworldValue = inputHomeworld.value

  // currently the database table for bsg_people does not allow updating values to NULL
  // so we must abort if being bassed NULL for homeworld

  if (isNaN(homeworldValue)) {
    return
  }

  // Put our data we want to send in a javascript object
  let data = {
    fullname: fullNameValue,
    homeworld: homeworldValue,
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', '/put-person-ajax', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      res.redirect('/customers')
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

function customerFill() {
    const customerID = document.getElementById('delete-customer-select').value
    console.log(console.log)
}