'use strict';
var picturesContainer = document.querySelector('.pictures');
var inputPhotoUpload = picturesContainer.querySelector('#upload-file');
var closeUploadButton = picturesContainer.querySelector('.img-upload__cancel'); // Маша, лучше искать по id, если есть возможность? Или по классу норм?
var imagePreview = picturesContainer.querySelector('.img-upload__preview');
var uploadImage = imagePreview.children[0];
var escKeyCode = 27;
var hashtagsField = document.querySelector('.text__hashtags');
// var commentsField = document.querySelector('.text__description');
var uploadTextFieldset = document.querySelector('.img-upload__text');

/*
Загрузка изображения, открытие и закрытие формы редактирования
*/

var onEditWindowEscPress = function (evt) {
  if (isEscEvent(evt)) {
    closeUpload();
  }
};

var isEscEvent = function (evt) {
  return evt.keyCode === escKeyCode;
};

uploadTextFieldset.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onEditWindowEscPress);
});

uploadTextFieldset.addEventListener('focusout', function () {
  document.addEventListener('keydown', onEditWindowEscPress);
});

var openUpload = function (evt) {
  evt.preventDefault();
  picturesContainer.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onEditWindowEscPress);
  effectsList.addEventListener('click', onImageClick);
};

var closeUpload = function () {
  picturesContainer.querySelector('.img-upload__overlay').classList.add('hidden');
  inputPhotoUpload.value = '';
};

inputPhotoUpload.addEventListener('change', function (evt) {
  evt.preventDefault();
  openUpload(evt);
});

closeUploadButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeUpload();
});

/*
Применение эффекта для изображения
*/

var effectLevel = document.querySelector('.effect-level');
// var sliderPin = effectLevel.querySelector('.effect-level__pin'); // ползунок
var inputEffectLevel = effectLevel.querySelector('.effect-level__value');
var effectsList = picturesContainer.querySelector('.effects__list');
var filters = {
  none: {
    CLASS: 'effects__preview--none',
    PROPERTY: 'none'
  },
  chrome: {
    CLASS: 'effects__preview--chrome',
    PROPERTY: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    PROPERTY: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    PROPERTY: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    UNIT: '%'
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    PROPERTY: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    UNIT: 'px'
  },
  heat: {
    CLASS: 'effects__preview--heat',
    PROPERTY: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    UNIT: ''
  }
};

var effectRange = {
  MIN: 0,
  MAX: 100
};

// Добавляю проверку того, где произошёл клик и меняю фильтр
var onImageClick = function (evt) {
  var targetImage = evt.target;
  var effectRadio = targetImage.closest('input');
  if (effectRadio) {
    inputEffectLevel.value = effectRange.MAX;
    uploadImage.className = filters[effectRadio.value].CLASS;
  }
};

/*
Валидация хэштегов и отправка формы
*/

var uploadForm = document.querySelector('.img-upload__form');
var submitButton = uploadForm.querySelector('.img-upload__submit');
var hashtagParams = {
  MIN: 2,
  MAX: 20
};

// Валидация хэштегов
var checkHashValidity = function () {
  var hashtagValue = hashtagsField.value.trim().toLowerCase() || '';
  var hashtags = hashtagValue.split(' ');
  var customValidityMessage = '';
  if (hashtagValue !== '') {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].charAt(0) !== '#') {
        customValidityMessage = 'Хэш-тег должен начинаться с символа # (решётка).';
        break;
      } else if (hashtags[i].length < hashtagParams.MIN && hashtags[i].charAt(0) === '#') {
        customValidityMessage = 'Хеш-тег не может состоять только из одной решётки.';
        break;
      } else if (hashtags.length > 5) {
        customValidityMessage = 'Нельзя указать больше пяти хэш-тегов.';
        break;
      } else if (hashtags.indexOf(hashtags[i]) !== i) { // Нахожу два одинаковых элемента в массиве хэштегов
        customValidityMessage = 'Один и тот же хэш-тег не может быть использован дважды.';
        break;
      } else if (hashtags[i].length > hashtagParams.MAX) {
        customValidityMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';
        break;
      }
    }
  } else {
    customValidityMessage = '';
    hashtagsField.style.outline = '';
  }
  hashtagsField.setCustomValidity(customValidityMessage);
};

// Добавляю слушатель события на ввод, таким образом при каждом изменении поля ввода будет совершаться проверка
hashtagsField.addEventListener('input', checkHashValidity);

// Добавляю слушатель события на кнопку "Опубликовать"
var onSubmitButtonClick = function () {
  hashtagsField.addEventListener('invalid', function () {
    hashtagsField.style.outline = '3px solid red';
  });
};

// Добавляю слушатель события на кнопку "Опубликовать"
submitButton.addEventListener('click', onSubmitButtonClick);

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

// функция, которая генерирует случайное число в определенном диапазоне (для лайков)
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерирую строку, состоящую из одного или двух комментариев
var generateComment = function () {
  var comment = '';
  var commentsNumber = getRandomNumber(1, 2);
  for (var i = 0; i < commentsNumber; i++) {
    var commentRandom = COMMENTS[getRandomNumber(0, COMMENTS.length - 1)];
    comment += commentRandom;
  }
  return comment;
};

// Создаю массив с полноценными комментариями, состоящих из текста и параметров пользователя (аватар, имя)
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

// Создаю функцию для создания массива с другими фотографиями
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

// Создаю массив с другими фотографиями
var userPictures = generatePictures(PICTURES_AMOUNT);

/*
  Добавление возможности просмотра любой фотографии в полноразмерном режиме, реализация открытия и закрытия окна полноразмерного просмотра
*/

var createPicture = function (pictures) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictures.url;
  pictureElement.querySelector('.picture__img').alt = pictures.description;
  pictureElement.querySelector('.picture__comments').textContent = pictures.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = pictures.like;
  pictureElement.addEventListener('click', function () {
    openBigPicture(pictures); // либо сразу openBigPicture(pictures), а внутри нее вызвать все сопутствующие функции
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
  if (isEscEvent(evt)) {
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

  picturesContainer.appendChild(fragment);
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
var openBigPicture = function (pictures) {
  bigPicture.querySelector('.big-picture__img').src = pictures.url;
  bigPicture.querySelector('.likes-count').textContent = pictures.like;
  bigPicture.querySelector('.comments-count').textContent = pictures.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictures.description;
  commentsContainer.appendChild(getComments(pictures.comments));
  showBigPicture();
  hideComments();
  document.addEventListener('keydown', onBicPictureEscPress);
};

renderPictures(userPictures);
