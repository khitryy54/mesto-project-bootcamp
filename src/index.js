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
//const cardDeletionPopup = document.querySelector('.popup_type_card-deletion')
const bigImagePopup = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const newPlaceForm = newPlacePopup.querySelector('.popup__form');
const newPlaceNameInput = newPlaceForm.querySelector('.popup__input_type_place');
const newPlaceLinkInput = newPlaceForm.querySelector('.popup__input_type_link');
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__button');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileAboutInput = editProfileForm.querySelector('.popup__input_type_about');
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profilePictureEditButton = document.querySelector('.profile__picture-edit-button');
const profilePictureEditForm = profilePictureEditPopup.querySelector('.popup__form');
const profilePictureLinkInput = profilePictureEditForm.querySelector('.popup__input_type_link');
const profilePictureSubmitButton = profilePictureEditForm.querySelector('.popup__button');
const profilePicture = document.querySelector('.profile__picture');
let myID = '';

getUserInfo()
  .then((userInfo) => {
    console.log(userInfo);
    myID = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profilePicture.setAttribute('src', userInfo.avatar);
  })
  .catch((err) => {
    console.log(err);
  })

getInitialCards()
  .then((initialCards) => {
    console.log(initialCards);
    initialCards.reverse().forEach((item) => {
      const newElement = createElement(item, myID, elementTemplate, handleImageClick, deleteCard, addLike, removeLike);
      addElement(newElement);
    })
  })
  .catch((err) => {
    console.log(err);
  }); 

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ]; 

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

profilePictureEditButton.addEventListener('click', () => {
  resetError(profilePictureEditForm, validationConfig);
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
      console.log(newCardObject);
      const newCard = createElement(newCardObject, myID, elementTemplate, handleImageClick, deleteCard, addLike, removeLike);
      addElement(newCard);
      closePopup(newPlacePopup);
      newPlaceForm.reset();
      newPlaceSubmitButton.textContent = "Сохраненить";
    })
    .catch((err) => {
      console.log(err);
      newPlaceSubmitButton.textContent = "Сохраненить";
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
      editProfileSubmitButton.textContent = "Сохраненить";
    })
    .catch((err) => {
      console.log(err);
      editProfileSubmitButton.textContent = "Сохраненить";
    })
}

function handleEditProfilePicture(event) {
  event.preventDefault();
  profilePictureSubmitButton.textContent = "Сохранение...";
  editProfilePicture(profilePictureLinkInput.value)
    .then((userInfo) => {
      profilePicture.setAttribute('src', userInfo.avatar);
      closePopup(profilePictureEditPopup);
      profilePictureSubmitButton.textContent = "Сохраненить";
    })
    .catch((err) => {
      console.log(err);
      profilePictureSubmitButton.textContent = "Сохраненить";
    })
}

function handleImageClick(name, link) {
  const popupImage = bigImagePopup.querySelector('.popup__image');
  const popupImageCaption = bigImagePopup.querySelector('.popup__image-caption');
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageCaption.textContent = name;
  openPopup(bigImagePopup);
}

function addElement(item) {
  elementsBlock.prepend(item);
}

enableValidation(validationConfig);













