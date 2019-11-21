'use strict';

/*
Отображение фотографий других пользователей, лайков и комментариев
*/

var likes = {
  MIN: 15,
  MAX: 200
};
var avatarIndex = {
  MIN: 1,
  MAX: 6
};
var PICTURES_AMOUNT = 25;
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.',
  'Не обижайте всех словами......',
  'Вот это тачка!'
];

// нахожу шаблон и элемент, который буду клонировать
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
// нахожу все миниатюры изображений
// var bigPictureThumbnails = document.querySelectorAll('.picture');
// нахожу секцию с полноразмерными фото
var bigPicture = document.querySelector('.big-picture');
// Х-кнопка закрытия полноразмерного фото
var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
// список, куда буду вставлять комменты
var commentsContainer = bigPicture.querySelector('.social__comments');
// шаблон коммента
var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');


// Генерирую строку, состоящую из одного или двух комментариев
var generateComment = function () {
  var comment = '';
  var commentsNumber = window.util.getRandomNumber(1, 2);
  for (var i = 0; i < commentsNumber; i++) {
    var commentRandom = COMMENTS[window.util.getRandomNumber(0, COMMENTS.length - 1)];
    comment += commentRandom;
  }
  return comment;
};

// Создаю массив с полноценными комментариями, состоящих из текста и параметров пользователя (аватар, имя)
var renderComments = function () {
  var comments = [];
  var amount = window.util.getRandomNumber(1, COMMENTS.length - 1);
  for (var j = 0; j < amount; j++) {
    var comment = {
      avatar: 'img/avatar-' + window.util.getRandomNumber(avatarIndex.MIN, avatarIndex.MAX) + '.svg',
      name: NAMES[window.util.getRandomNumber(0, NAMES.length - 1)],
      message: generateComment()
    };
    comments.push(comment);
  }
  return comments;
};

// Создаю функцию для создания массива с другими фотографиями
var generatePictures = function (amount) {
  var pictures = [];
  for (var k = 0; k < amount; k++) {
    var picture = {
      url: 'photos/' + (k + 1) + '.jpg',
      description: DESCRIPTIONS[window.util.getRandomNumber(0, DESCRIPTIONS.length - 1)],
      like: window.util.getRandomNumber(likes.MIN, likes.MAX),
      comments: renderComments()
    };
    pictures.push(picture);
  }
  return pictures;
};

// Создаю массив с другими фотографиями
var userPictures = generatePictures(PICTURES_AMOUNT);

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
    openBigPicture(picture);
  });
  return pictureElement;
};

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

bigPictureCloseButton.addEventListener('click', hideBigPicture);

// Прячу блок счётчика комментариев и блок загрузки новых комментариев
var hideComments = function () {
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};

// Создаю фрагмент с фотографиями, добавляю в него картинки и всё разом - в DOM
var renderPictures = function (picturesFragment) {
  var fragment = document.createDocumentFragment();

  picturesFragment.forEach(function (picture) {
    fragment.appendChild(createPicture(picture));
  });

  window.uploadPicture.picturesContainer.appendChild(fragment);
};

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

renderPictures(userPictures);
