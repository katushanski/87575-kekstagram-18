'use strict';

(function () {
  /*
  Отображение миниатюр фотографий других пользователей, лайков и комментариев
  */


  // нахожу шаблон и элемент, который буду клонировать
  var similarPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  /*
    Добавление возможности просмотра любой фотографии в полноразмерном режиме, реализация открытия и закрытия окна полноразмерного просмотра
  */

  var createPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.like;
    pictureElement.addEventListener('click', function () {
      window.preview.open(picture);
    });
    return pictureElement;
  };

  // Создаю фрагмент с фотографиями, добавляю в него картинки и всё разом - в DOM
  var renderPictures = function (picturesFragment) {
    var fragment = document.createDocumentFragment();

    picturesFragment.forEach(function (picture) {
      fragment.appendChild(createPicture(picture));
    });

    picturesContainer.appendChild(fragment);
  };

  renderPictures(window.data.userPictures);

  window.pictures = {
    render: renderPictures
  };
})();
