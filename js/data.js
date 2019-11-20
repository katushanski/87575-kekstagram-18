'use strict';

(function () {
  /*
  Генерация данных для вставки в DOM
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

  window.data = {
    userPictures: userPictures,
    generate: generatePictures
  };
})();
