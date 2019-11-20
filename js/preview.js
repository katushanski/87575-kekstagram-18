'use strict';

(function () {
  /*
  Отображение комментов
  */
  // шаблон коммента
  var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

  // Создаю фрагмент с комментариями и добавляю его в DOM
  var getComments = function (comments) { // передали в функцию сгенерированные ранее комментарии
    var fragment = document.createDocumentFragment(); // создали фрагмент
    // используем цикл forEach тк идем по всей длине массива
    comments.forEach(function (comment) {
      // склонировали элемент комментария
      var commentElement = commentTemplate.cloneNode(true);
      // нашли элемент картинки внутри элемента комментария
      var commentImgElement = commentElement.querySelector('img');
      // нашли абзац
      var commentTextElement = commentElement.querySelector('p');
      // используем укороченную запись, тк используем forEach и i не нужен
      commentImgElement.src = comment.avatar;
      commentImgElement.alt = comment.name;
      commentTextElement.textContent = comment.message;
      // добавляем элемент комментария в фрагмент
      fragment.appendChild(commentElement);
    });
    // возвращаем фрагмент со всеми добавленными комментариями
    return fragment;
  };

  // Прячу блок счётчика комментариев и блок загрузки новых комментариев
  var hideComments = function () {
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  };
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
    commentsContainer.appendChild(getComments(picture.comments));
    showBigPicture();
    hideComments();
    document.addEventListener('keydown', onBicPictureEscPress);
  };
  bigPictureCloseButton.addEventListener('click', hideBigPicture);

  window.preview = {
    open: openBigPicture
  };
})();
