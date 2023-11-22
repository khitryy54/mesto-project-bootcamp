//VALIDATION 
function handleInput(inputElement, validationConfig) {
  if (inputElement.validity.valid) {
    hideError(inputElement, validationConfig);
  } else {
    showError(inputElement, inputElement.validationMessage, validationConfig);
  }
}

function showError(inputField, errorMessage, validationConfig) {
  const spanId = 'error-' + inputField.id;
  const spanElement = document.getElementById(spanId);
  spanElement.textContent = errorMessage;
  inputField.classList.add(validationConfig.inputErrorClass);
}

function hideError(inputField, validationConfig) {
  const spanId = 'error-' + inputField.id;
  const spanElement = document.getElementById(spanId);
  spanElement.textContent = '';
  inputField.classList.remove(validationConfig.inputErrorClass);
}

function enableButton(button) {
  button.disabled = false;
}

export function disableButton(button) {
  button.disabled = true;
}

function checkForm(form, button) {
  if(form.checkValidity()) {
    enableButton(button);
  } else {
    disableButton(button);
  }
}

export function resetError(form, validationConfig) {
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  checkForm(form, submitButton);
  inputList.forEach(input => {
    hideError(input, validationConfig);
  });
}

export function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach(form => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    checkForm(form, submitButton);
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        handleInput(input, validationConfig);
        checkForm(form, submitButton);
      });
    })
  })
}