const $form = $("form")
const $nameErr = $("#name-err")
const $emailErr = $("#email-err")
const $yearErr = $("#year-err")
const $colorErr = $("#color-err")
const $results = $("#lucky-results")
/** processForm: handle submission of form:
 *
 * - make API call to server to get num/year
 * - show errors, if errors are returned
 * - else: show results
 **/
async function processForm(evt) {
  evt.preventDefault()

  const formValues = getFormValues(evt);
  resp = await postForm(formValues)
  if(resp.errors){
    showErrors(resp)
  }
  else{
    showResults(resp[0].num, resp[1].year)
  }

}

/** showErrors: show error messages in DOM. */

function showErrors(input){
  if (input.errors){
    for (let error in input.errors){
      if (error === "name"){
        $nameErr.text(input.errors[error])
      }
      if (error === "year"){
        $yearErr.text(input.errors[error])
      }
      if (error === "email"){
        $emailErr.text(input.errors[error])
      }
      if (error === "color"){
        $colorErr.text(input.errors[error])
      }
    }
  }
}

/** showResults: show num and year in the DOM. */

function showResults(num, year) {
  $results.html(`<p>Your lucky number is ${num.num} (${num.fact})</p>
                <p> Your birth year (${year.year}) fact is ${year.fact}</p>`)
}
/** Retrieves form input values and formats them for post */
function getFormValues(evt) {
  const {name, year, email, color} = evt.target;

  return {name: name.value,
          year: year.value,
          email: email.value,
          color: color.value};
}
/** Post request of form values to API */
async function postForm(values){
  response = await axios.post('http://localhost:5001/api/get-lucky-num', values)
  return response.data
}

$("#lucky-form").on("submit", processForm);
