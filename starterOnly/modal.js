function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const modalSuccess = document.querySelector('.modal_success');

// Form
const form = document.querySelector('form');
const firstnameField = document.querySelector('#first');
const lastnameField = document.querySelector('#last');
const emailField = document.querySelector('#email');
const birthdateField = document.querySelector('#birthdate');
const quantityField = document.querySelector('#quantity');
const conditionsCheckbox = document.querySelector('#checkbox1');
const allBtnRadio = document.querySelectorAll("input[name='location']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
modalClose.addEventListener('click', () => modalbg.style.display = "none");

// Message error
const message = {
  name: 'Minimum 2 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés',
  email: 'Veuillez renseigner une adresse mail valide.',
  birthdate: 'Vous devez avoir plus de 18 ans pour participer',
  quantity: 'Veuillez renseigner un nombre entre 0 et 99',
  city: 'Veuillez sélectionner une ville',
  conditions: `Vous devez accepter les conditions d'utilisation`,
};

// Regex
const regexName = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexQuantity = /^([0-9]{1,2})$/;

// Check input with event listener
firstnameField.addEventListener('input', () => checkInputValue(regexName, firstnameField, message.name)); 
lastnameField.addEventListener('input', () => checkInputValue(regexName, lastnameField, message.name));
emailField.addEventListener('input', () => checkInputValue(regexEmail, emailField, message.email));
birthdateField.addEventListener('input', () => checkIfUserIsYoungerThan18(birthdateField, message.birthdate));
quantityField.addEventListener('input', () => checkInputValue(regexQuantity, quantityField, message.quantity));
conditionsCheckbox.addEventListener('input', () => checkIfConditionsAccepted(conditionsCheckbox, message.conditions));
allBtnRadio.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(allBtnRadio, message.city)));


// Validate form
function validate(e) {
  e.preventDefault();

  // Check if all conditions are valid
  const isConditionsAccepted = checkIfConditionsAccepted(conditionsCheckbox, message.conditions);
  const isCitySelected = checkIfCitySelected(allBtnRadio, message.city);
  const isUserAgeValid = checkIfUserIsYoungerThan18(birthdateField, message.birthdate);
  const isQuantityValid = checkInputValue(regexQuantity, quantityField, message.quantity);
  const isEmailValid = checkInputValue(regexEmail, emailField, message.email);
  const isLastNameValid = checkInputValue(regexName, lastnameField, message.name);
  const isFirstNameValid = checkInputValue(regexName, firstnameField, message.name);

  // If all conditions are valid 
  if (isConditionsAccepted && isCitySelected && isUserAgeValid && isQuantityValid && isEmailValid && isLastNameValid && isFirstNameValid) {
    modalbg.style.display = 'none';
      modalSuccess.style.display = 'flex';
      form.reset();
  } 
};

// Send Form
form.addEventListener('submit', e => validate(e));

// Close Success Modal
document.querySelector('.modal_content button').addEventListener('click', () => modalSuccess.style.display = "none");

// Show error messages
const setErrorMessage = (element, message) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
};

// Hide error message
const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};

// Check input value
function checkInputValue(regex, element, message) {
  if (!regex.test(element.value)) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true; 
};

// Check if conditions are accepted
function checkIfConditionsAccepted(element, message) {
  if(!element.checked) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;  
};

// Check if a city is selected
function checkIfCitySelected(cities, message) {
  const isChecked = Array.from(cities).some(radio => radio.checked);
  if (!isChecked) {
      setErrorMessage(cities[0], message);
      return false;
  };
  hideErrorMessage(cities[0]);
  return true;
};

//Check if user is older than 18
function checkIfUserIsYoungerThan18(element, message) {
  const birthdate = new Date(element.value);
  let difference = Date.now() - birthdate.getTime();
  difference = new Date(difference);
  const userAge = difference.getFullYear() - 1970;

  const currentYear = new Date().getFullYear();
  const birthYear = birthdate.getFullYear();
  
  if (birthYear < currentYear - 100 || birthYear.toString().length !== 4 || userAge < 18) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;
};