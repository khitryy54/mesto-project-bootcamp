import './pages/index.css';
import {enableValidation, resetError} from './components/validation.js';
import {createElement} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';
import {getInitialCards, getUserInfo, editUserInfo, postNewCard, deleteCard, addLike, removeLike, editProfilePicture} from './components/api.js'

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error'
};

const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const elementsBlock = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newPlacePopup = document.querySelector('.popup_type_new-place');
const profilePictureEditPopup = document.querySelector('.popup_type_update-avatar');
const bigImagePopup = document.querySelector('.popup_type_image');
const popupImage = bigImagePopup.querySelector('.popup__image');
const popupImageCaption = bigImagePopup.querySelector('.popup__image-caption');
const addButton = document.querySelector('.profile__add-button');
const newPlaceForm = document.forms["new-place"];
const newPlaceNameInput = newPlaceForm.querySelector('.popup__input_type_place');
const newPlaceLinkInput = newPlaceForm.querySelector('.popup__input_type_link');
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__button');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileAboutInput = editProfileForm.querySelector('.popup__input_type_about');
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profilePictureEditButton = document.querySelector('.profile__picture-edit-button');
const profilePictureEditForm = document.forms["avatar-link"];
const profilePictureLinkInput = profilePictureEditForm.querySelector('.popup__input_type_link');
const profilePictureSubmitButton = profilePictureEditForm.querySelector('.popup__button');
const profilePicture = document.querySelector('.profile__picture');
let myID = '';

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    myID = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profilePicture.setAttribute('src', userInfo.avatar);
    initialCards.reverse().forEach((item) => {
      const newElement = createElement(item, myID, elementTemplate, handleImageClick, deleteCard, addLike, removeLike);
      addElement(newElement);
    })
  })
  .catch(console.error); 

addButton.addEventListener('click', () => {
  openPopup(newPlacePopup);
});

editButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileAboutInput.value = profileDescription.textContent;
  resetError(editProfileForm, validationConfig);
  openPopup(editProfilePopup);
});

profilePictureEditButton.addEventListener('click', () => {
  openPopup(profilePictureEditPopup);
});

popups.forEach(function(item) {
  item.querySelector('.popup__close-button').addEventListener('click', () => closePopup(item));
  item.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(item);
    }
  })
})

editProfileForm.addEventListener('submit', handleEditProfileForm);
newPlaceForm.addEventListener('submit', handleSubmitNewPlace);
profilePictureEditForm.addEventListener('submit', handleEditProfilePicture);

function handleSubmitNewPlace(event) {
  event.preventDefault();
  newPlaceSubmitButton.textContent = "Сохранение...";
  postNewCard(newPlaceNameInput.value, newPlaceLinkInput.value)
    .then((newCardObject) => {
      const newCard = createElement(newCardObject, myID, elementTemplate, handleImageClick, deleteCard, addLike, removeLike);
      addElement(newCard);
      closePopup(newPlacePopup);
      newPlaceForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      newPlaceSubmitButton.textContent = "Сохранить";
    })
}

function handleEditProfileForm(event) {
  event.preventDefault();
  editProfileSubmitButton.textContent = "Сохранение...";
  editUserInfo(editProfileNameInput.value, editProfileAboutInput.value)
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closePopup(editProfilePopup);
    })
    .catch(console.error)
    .finally(() => {
      editProfileSubmitButton.textContent = "Сохранить";
    })
}

function handleEditProfilePicture(event) {
  event.preventDefault();
  profilePictureSubmitButton.textContent = "Сохранение...";
  editProfilePicture(profilePictureLinkInput.value)
    .then((userInfo) => {
      profilePicture.setAttribute('src', userInfo.avatar);
      closePopup(profilePictureEditPopup);
    })
    .catch(console.error)
    .finally(() => {
      profilePictureSubmitButton.textContent = "Сохранить";
    })
}

function handleImageClick(name, link) {
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageCaption.textContent = name;
  openPopup(bigImagePopup);
}

function addElement(item) {
  elementsBlock.prepend(item);
}

enableValidation(validationConfig);













