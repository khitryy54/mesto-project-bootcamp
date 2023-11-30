export function createElement(item, myID, elementTemplate, handleImageClick, deleteCard, addLike, removeLike) {
  const newElement = elementTemplate.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  elementImage.setAttribute("src", item.link);
  elementImage.setAttribute("alt", item.name);
  elementImage.addEventListener('click', () => handleImageClick(item.name, item.link));

  const elementTitle = newElement.querySelector('.element__title');
  elementTitle.textContent = item.name;

  const buttonDelete = newElement.querySelector('.element__trash');
  if (item.owner._id === myID) {
    buttonDelete.addEventListener('click', () => {
      deleteCard(item._id) 
        .then(() => {
          newElement.remove();
        })
        .catch((err) => {
          console.log(err);
        })
    }) 
  } else {
    buttonDelete.remove();
  }

  const buttonLike = newElement.querySelector('.element__heart');
  const likesCounter = newElement.querySelector('.element__likes-counter');
  
  if(item.likes.find((like) => like._id === myID)) {
    buttonLike.classList.add("element__heart_active");
  }
  likesCounter.textContent = item.likes.length;

  buttonLike.addEventListener('click', () => {
    if(item.likes.find((like) => like._id === myID)) {
      removeLike(item._id)
        .then((updatedItem) => {
          item = updatedItem;
          buttonLike.classList.remove("element__heart_active");
          likesCounter.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      addLike(item._id)
        .then((updatedItem) => {
          item = updatedItem;
          buttonLike.classList.add("element__heart_active");
          likesCounter.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })

  return newElement;
}