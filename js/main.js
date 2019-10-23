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
var commentTemplate = document.querySelector('#comment'); // нахожу шаблон

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

var getComments = function () {
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

var userComment = getComments();

var generatePictures = function (amount) {
  var pictures = [];
  for (var k = 0; k < amount; k++) {
    var picture = {
      url: 'photos/' + (k + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      like: getRandomNumber(likes.MIN, likes.MAX),
      comment: getComments() // Маша, почему мне консколь выдаёт ошибку, если я здесь пишу вместо getComments() равноценный ему userComment, который я объявила выше?
    };
    pictures.push(picture);
  }
  return pictures;
};

var pictures = generatePictures(PICTURES_AMOUNT);
var createPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comment.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.like;

  return pictureElement;
};

// создаю фрагмент, добавляю в него картинки и всё разом в DOM

var renderPictures = function (picturesFragment) {
  var fragment = document.createDocumentFragment();

  picturesFragment.forEach(function (picture) {
    fragment.appendChild(createPicture(picture));
  });

  picturesContainer.appendChild(fragment);
};

renderPictures(pictures); // Маша, мне нужно перенести все вызовы функций в конец? чтобы по критериям вначале кода было лишь объявление переменных?

// создаю в DOM элемент нужной мне структуры {
var getComment = function () {
  for (var i = 0; i < userComment.length; i++) {

    var commentElement = commentTemplate.querySelector('li');
    var commentElementImg = commentTemplate.querySelector('img');
    var commentElementText = commentTemplate.querySelector('p');

    commentElementImg.src = userComment[i].avatar;
    commentElementImg.alt = userComment[i].name;
    commentElementText.textContent = userComment[i].message;

    commentElement.appendChild(commentElementImg);
    commentElement.appendChild(commentElementText);
  }
  return commentElement;
};

bigPicture.classList.remove('hidden');

// Маша, ты писала: открытие большой картинки - всё в отдельную функцию - туда передаем конкретную картинку - pictures[0] при вызове. Я правильно переписала?

var openBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.like;
  bigPicture.querySelector('.comments-count').textContent = picture.comment.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

openBigPicture(pictures[0]);

// прячу блок счётчика комментариев и блок загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

// добавляю комментарии в нужный список
bigPicturesContainer.appendChild(getComment());
