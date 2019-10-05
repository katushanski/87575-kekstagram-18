'use strict';

var similarPictureTemplate = document.querySelector('#picture') // нахожу шаблон
    .content
    .querySelector('.picture'); // нахожу элемент, в который буду вставлять похожие фото
var picturesContainer = document.querySelector('.pictures'); // Маша, это и является аналогом фрагмента из прошлого задания?

// константы-параметры фото

var PICTURES_AMOUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PICTURE_URLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// функции-генераторы случайных чисел

var getRandomArbitrary = function (min, max) { // функция, которая генерирует случайное число в определенном диапазоне (для лайков)
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomUrl = function (pictureUrls) { // функция, которая генерирует случайное число, которое не повторяется (для ссылок).
  for (var i = pictureUrls; i < pictureUrls.length; i--) { // Маша, я брала пример из интернета отсюда https://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript но все равно не до конца поняла как его имплементировать
    var randomUrlElement = pictureUrls.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
  return randomUrlElement;
};

var getRandomElement = function (elements) { // функция, которая просто вощвращает случайное число (для комментов) как в учебном задании
  return elements[Math.floor(Math.random() * elements.length)]; // Маша, как сделать, чтобы комментов под фото могло быть два?
};

var generatePictures = function (amount) {
  var album = [];
  for (var i = 0; i < amount; i++) {
    var photo = {
      url: 'photos/' + getRandomUrl(PICTURE_URLS) + '.jpg',
      description: '', // строка — описание фотографии
      like: getRandomArbitrary(MIN_LIKES, MAX_LIKES),
      comment: getRandomElement(COMMENTS)
    };
    album.push(photo);
  }
  return album;
};

var pictures = generatePictures (PICTURES_AMOUNT);
var createPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url; // Маша, почему-то линтер ругается на то, что я использую здесь photo. Я предполагаю, что это потому что я объявляла объект внутри функции, и эта функция не видит его. Но в прошлом домашнем задании в файле setup.js я делала аналогично, и всё проканало. Почему?
  pictureElement.querySelector('.picture__comments').textContent = photo.comment;
  pictureElement.querySelector('.picture__likes').textContent = photo.like;

  return pictureElement;
};

var renderAlbum = function (picturesFragment) {
  picturesFragment.forEach(function (picture) {
    picturesContainer.appendChild(createPicture(picture));
  });
};

renderAlbum(pictures);
