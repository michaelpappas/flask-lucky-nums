/** processForm: handle submission of form:
 *
 * - make API call to server to get num/year
 * - show errors, if errors are returned
 * - else: show results
 **/
const $form = $("form")

async function processForm(evt) {
  evt.preventDefault()

  const formValues = getFormValues(evt);
  resp = await postForm(formValues)
  console.log(resp)
}

/** showErrors: show error messages in DOM. */

function showErrors(errors) {
}

/** showResults: show num and year in the DOM. */

function showResults(num, year) {
}
function getFormValues(evt) {
  const name = evt.target.name.value;
  const year = evt.target.year.value;
  const email = evt.target.email.value;
  const color = evt.target.color.value;
  debugger;
  return {name: name, year: year, email: email, color: color};
}

async function postForm(values){
  response = await axios.post('http://localhost:5001/api/get-lucky-num', values)
  return response.data
}


$("#lucky-form").on("submit", processForm);
