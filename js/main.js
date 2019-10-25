'use strict';

// константы-параметры фото

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


// поиск DOM-элементов

var similarPictureTemplate = document.querySelector('#picture') // нахожу шаблон
    .content
    .querySelector('.picture'); // нахожу элемент, в который буду вставлять похожие фото
var picturesContainer = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture'); // нахожу секцию с большими фото
var bigPicturesContainer = bigPicture.querySelector('.social__comments'); // список, куда буду вставлять комменты
var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

// функция-генераторы случайных чисел

var getRandomNumber = function (min, max) { // функция, которая генерирует случайное число в определенном диапазоне (для лайков)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функции создания и модификации объектов

var generateComment = function () {
  var comment = '';
  var commentsNumber = getRandomNumber(1, 2);
  for (var i = 0; i < commentsNumber; i++) {
    var commentRandom = COMMENTS[getRandomNumber(0, COMMENTS.length - 1)];
    comment += commentRandom;
  }
  return comment;
};

var renderComments = function () {
  var comments = [];
  var amount = getRandomNumber(1, COMMENTS.length);
  for (var j = 0; j < amount; j++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(avatarIndex.MIN, avatarIndex.MAX) + '.svg',
      name: NAMES[getRandomNumber(0, NAMES.length - 1)],
      message: generateComment()
    };
    comments.push(comment);
  }
  return comments;
};

var generatePictures = function (amount) {
  var pictures = [];
  for (var k = 0; k < amount; k++) {
    var picture = {
      url: 'photos/' + (k + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      like: getRandomNumber(likes.MIN, likes.MAX),
      comments: renderComments()
    };
    pictures.push(picture);
  }
  return pictures;
};

var userPictures = generatePictures(PICTURES_AMOUNT);

var createPicture = function (pictures) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictures.url;
  pictureElement.querySelector('.picture__img').alt = pictures.description;
  pictureElement.querySelector('.picture__comments').textContent = pictures.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = pictures.like;

  return pictureElement;
};

// создаю фрагмент с фотографиями, добавляю в него картинки и всё разом в DOM

var renderPictures = function (picturesFragment) {
  var fragment = document.createDocumentFragment();

  picturesFragment.forEach(function (picture) {
    fragment.appendChild(createPicture(picture));
  });

  picturesContainer.appendChild(fragment);
};

// создаю фрагмент с комментариями и добавляю его в DOM
var getComments = function (comments) { // передали в функцию сгенерированные ранее комментарии
  var fragment = document.createDocumentFragment(); // создали фрагмент

  comments.forEach(function (comment) { // используем цикл forEach тк идем по всей длине массива
    var commentElement = commentTemplate.cloneNode(true); // склонировали элемент комментария

    var commentImgElement = commentElement.querySelector('img'); // нашли элемент картинки внутри элемента комментария
    var commentTextElement = commentElement.querySelector('p'); // нашли абзац

    commentImgElement.src = comment.avatar; // используем укороченную запись, тк используем forEach и i не нужен
    commentImgElement.alt = comment.name;
    commentTextElement.textContent = comment.message;

    fragment.appendChild(commentElement); // добавляем элемент комментария в фрагмент
  });
  return fragment; // возвращаем фрагмент со всеми добавленными комментариями
};

var openBigPicture = function (pictures) {
  bigPicture.querySelector('.big-picture__img').src = pictures.url;
  bigPicture.querySelector('.likes-count').textContent = pictures.like;
  bigPicture.querySelector('.comments-count').textContent = pictures.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictures.description;
  bigPicturesContainer.appendChild(getComments(pictures.comments)); // добавляю комментарии в нужный список
};

renderPictures(userPictures);
openBigPicture(userPictures[0]);

// отображаю полноразмерное фото
bigPicture.classList.remove('hidden');

// прячу блок счётчика комментариев и блок загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
