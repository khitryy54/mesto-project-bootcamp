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

const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const elementsBlock = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = popups[0];
const newPlacePopup = popups[1];
const bigImagePopup = popups[2];
const addButton = document.querySelector('.profile__add-button');
const newPlaceForm = newPlacePopup.querySelector('.popup__form');
const newPlaceName = newPlaceForm.querySelector('.popup__input_type_name');
const newPlaceLink = newPlaceForm.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const editProfileName = editProfileForm.querySelector('.popup__input_type_name');
const editProfileAbout = editProfileForm.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


popups.forEach(function(item) {
  item.querySelector('.popup__close-button').addEventListener('click', () => closePopup(item));
})

addButton.addEventListener('click', () => openPopup(newPlacePopup));
editButton.addEventListener('click', () => {
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', handleEditProfileForm);
newPlaceForm.addEventListener('submit', handleSubmitNewPlace);

function handleSubmitNewPlace(event) {
  event.preventDefault();
  const itemObject = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  }
  const newCard = createElement(itemObject);
  addElement(newCard);
  newPlaceForm.reset();
  closePopup(newPlacePopup);
}

function handleEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileAbout.value;
  closePopup(editProfilePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createElement(item) {
  const newElement = elementTemplate.cloneNode(true);
  
  const elementImage = newElement.querySelector('.element__image');
  elementImage.setAttribute("src", item.link);
  elementImage.setAttribute("alt", item.name);
  elementImage.addEventListener('click', () => {
    const popupImage = bigImagePopup.querySelector('.popup__image');
    const popupImageCaption = bigImagePopup.querySelector('.popup__image-caption');
    popupImage.setAttribute('src', item.link);
    popupImage.setAttribute('alt', item.name);
    popupImageCaption.textContent = item.name;
    openPopup(bigImagePopup);
  })

  const elementTitle = newElement.querySelector('.element__title');
  elementTitle.textContent = item.name;

  const buttonDelete = newElement.querySelector('.element__trash');
	buttonDelete.addEventListener('click', () => {
		newElement.remove();
	})

  const buttonLike = newElement.querySelector('.element__heart');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle("element__heart_active");
  })

  return newElement;
}

function addElement(item) {
  elementsBlock.prepend(item);
}

initialCards.reverse().forEach((item) => {
  const newElement = createElement(item);
  addElement(newElement);
})









