'use strict';

(function () {
  /*
  Отображение полноразмерных фотографий других пользователей
  */

  // нахожу секцию с полноразмерными фото
  var bigPicture = document.querySelector('.big-picture');
  // Х-кнопка закрытия полноразмерного фото
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  // список, куда буду вставлять комменты
  var commentsContainer = bigPicture.querySelector('.social__comments');

  var showBigPicture = function () {
    bigPicture.classList.remove('hidden');
  };

  var hideBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  var onBicPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideBigPicture();
    }
  };

  // Заполняю полноразмерное фото информацией про адрес изображения, к-во лайков, комментариев, добавляю описание.
  var openBigPicture = function (picture) {
    var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
    bigPictureImage.src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.like;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(window.picture.getComments(picture.comments));
    showBigPicture();
    window.picture.hideComments();
    document.addEventListener('keydown', onBicPictureEscPress);
  };
  bigPictureCloseButton.addEventListener('click', hideBigPicture);

  window.picture.renderPictures(window.picture.userPictures);

  window.preview = {
    bigPicture: bigPicture,
    openBigPicture: openBigPicture
  };
})();
