import './pages/index.css';
import {enableValidation, disableButton, resetError} from './components/validation.js';
import {createElement} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const elementsBlock = document.querySelector('.elements');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newPlacePopup = document.querySelector('.popup_type_new-place');
const addButton = document.querySelector('.profile__add-button');
const newPlaceForm = newPlacePopup.querySelector('.popup__form');
const newPlaceNameInput = newPlaceForm.querySelector('.popup__input_type_place');
const newPlaceLinkInput = newPlaceForm.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileAboutInput = editProfileForm.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

addButton.addEventListener('click', () => {
  resetError(newPlaceForm, validationConfig);
  openPopup(newPlacePopup);
});

editButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileAboutInput.value = profileDescription.textContent;
  resetError(editProfileForm, validationConfig);
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', handleEditProfileForm);
newPlaceForm.addEventListener('submit', handleSubmitNewPlace);

function handleSubmitNewPlace(event) {
  event.preventDefault();
  newPlaceForm.reset();
  disableButton(event.submitter);
  const itemObject = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value
  }
  const newCard = createElement(itemObject);
  addElement(newCard);
  newPlaceForm.reset();
  closePopup(newPlacePopup);
}

function handleEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileAboutInput.value;
  closePopup(editProfilePopup);
}

function addElement(item) {
  elementsBlock.prepend(item);
}

initialCards.reverse().forEach((item) => {
  const newElement = createElement(item);
  addElement(newElement);
})

enableValidation(validationConfig);











