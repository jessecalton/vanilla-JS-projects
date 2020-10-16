const form = document.getElementById('form');
// Could also use querySelector

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  // 1. Outline the input in red (change the CSS class)
  // 2. Get the `input` variable's parent element to change the class.
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  // Same thing as the showError, just with `success`
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Regex check on email string
function isValidEmail() {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

// Get field name (for error messages)
function getFieldName(input) {
  // The JS way of capitalizing the first letter.
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listener for submitting form
form.addEventListener('submit', function(e) {
  // Listen for a submit, and do the event
  e.preventDefault();
  checkRequired([username, email, password, password2]);
})
