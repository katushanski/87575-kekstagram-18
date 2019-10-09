'use strict';

// константы-параметры фото

var PICTURES_AMOUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
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

// функция-генераторы случайных чисел

var getRandomNumber = function (min, max) { // функция, которая генерирует случайное число в определенном диапазоне (для лайков)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функции создания и модификации объектов

var generateComment = function () { // Я не могу сообразить, нужны ли здесь и в след. функции параметры.
  var userComment = []; // я всё время путаюсь, где я могу употреблять названия переменных по несколько раз. Если бы я здесь написала просто comment, могла ли я в следующей функции использовать это название но в других целях? ведь переменная внутри этой функции останется невидимой, верно?
  for (var k = 0; k < getRandomNumber(1, 2); k++) {
    var commentRandom = COMMENTS[getRandomNumber(0, COMMENTS.length - 1)];
  }
  return userComment.push(commentRandom);
};

var getComments = function () {
  var comments = [];
  for (var j = 0; j < getRandomNumber(1, COMMENTS.length); j++) { // Маша, ты писала, что чтобы определить число комментариев ты предлагаешь ограничиться длиной константы с комментариями и не заморачивать о проверке не повторяются ли они. Я правильно тебя поняла, указав в цикле COMMENTS.length?
    var comment = {
      avatar: '../img/avatar/' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      name: NAMES[getRandomNumber(0, NAMES.length - 1)],
      message: generateComment()
    };
    comments.push(comment);
  }
  return comments;
};

var generatePictures = function (amount) {
  var pictures = [];
  for (var i = 0; i < amount; i++) {
    var picture = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      like: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comment: getComments()
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

var renderPictures = function (picturesFragment) {
  picturesFragment.forEach(function (picture) {
    picturesContainer.appendChild(createPicture(picture));
  });
};

renderPictures(pictures);
