const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const bigImagePopup = document.querySelector('.popup_type_image');

import {openPopup} from './modal.js'

export function createElement(item) {
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