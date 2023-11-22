const popups = document.querySelectorAll('.popup');

popups.forEach(function(item) {
  item.querySelector('.popup__close-button').addEventListener('click', () => closePopup(item));
  item.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(item);
    }
  })
})

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}