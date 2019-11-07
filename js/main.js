'use strict';
var picturesContainer = document.querySelector('.pictures');
var openUploadButton = picturesContainer.querySelector('.img-upload__control');
var inputPhotoUpload = picturesContainer.querySelector('#upload-file');
var closeUploadButton = picturesContainer.querySelector('.img-upload__cancel'); // Маша, лучше искать по id, если есть возможность? Или по классу норм?
var imagePreview = picturesContainer.querySelector('.img-upload__preview');
var defaultImage = imagePreview.children[0];
var escKeyCode = 27;

// Загрузка изображения, открытие и закрытие формы редактирования
var onPopupEscPress = function (evt) {
  if (evt.target === hashtagsField) { // Маша, почему, если я делаю эту проверку в конце этой функции, а не в начале как сейчас, то Esc все равно закрывает форму, если фокус на поле хештегов?
    return;
  } else if (evt.target === commentsField) {
    return;
  }
  if (isEscEvent(evt)) {
    closeUpload();
  }
};

var isEscEvent = function (evt) {
  return evt.keyCode === escKeyCode;
};

var openUpload = function (evt) {
  evt.preventDefault();
  picturesContainer.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeUpload = function () {
  picturesContainer.querySelector('.img-upload__overlay').classList.add('hidden');
  inputPhotoUpload.value = '';
};

openUploadButton.addEventListener('click', function () {
  inputPhotoUpload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload(evt);
    onImageClick();
  });
});

closeUploadButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeUpload();
});

// Применение эффекта для изображения
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

var effectClassCheck = function () {
  if (defaultImage.classList.length === 2) {
    defaultImage.classList.remove(defaultImage.classList[0]);
  }
};

var onImageClick = function () {
  effectsList.addEventListener('click', function (evt) {
    var targetImage = evt.target;
    var effectRadio = targetImage.closest('input');
    if (effectRadio) {
      inputEffectLevel.value = effectRange.MAX;
      defaultImage.classList.add(filters[effectRadio.value].CLASS);
    } else {
      return;
    }
    effectClassCheck();
  });
};

/* Валидация хэштегов и отправка формы */
var uploadForm = document.querySelector('.img-upload__form');
var submitButton = uploadForm.querySelector('.img-upload__submit');
var hashtagsField = document.querySelector('.text__hashtags');
var hashtagValue = hashtagsField.value || '';
var hashtagList = hashtagValue.split(' ');
var hashtagParams = {
  MIN: 2,
  MAX: 20
};
var hashtagIsValid = true;
var commentsField = document.querySelector('.text__description');

// Функция находит два одинаковых элемента в массиве хэштегов
var checkDuplicates = function (hashtags, hashtag) {
  var duplicates = 0;
  for (var i = 0; i < hashtagList.length; i++) {
    if (hashtags[i].toLowerCase() === hashtag.toLowerCase()) {
      duplicates++;
    }
  }
  return duplicates;
};
// Функция валидации хэштегов
var checkHashValidity = function () {
  hashtagsField.addEventListener('invalid', function (evt) {
    evt.preventDefault();
    hashtagIsValid = true;
    if (hashtagList.length <= 5) {
      for (var i = 0; i < hashtagList.length; i++) {
        if (hashtagList[i].length < hashtagParams.MIN && hashtagList[i].charAt(0) === '#') {
          hashtagsField.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
          hashtagIsValid = false;
          hashtagsField.style.outline = '3px solid red';
          return;
        } else if (hashtagList[i].charAt(0) === '#') {
          hashtagsField.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
          hashtagIsValid = false;
          hashtagsField.style.outline = '3px solid red';
          return;
        } else if (checkDuplicates(hashtagList, hashtagList[i]) > 1) {
          hashtagsField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          hashtagIsValid = false;
          hashtagsField.style.outline = '3px solid red';
        } else if (hashtagList[i].length > hashtagParams.MAX) {
          hashtagsField.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку;');
          hashtagIsValid = false;
          hashtagsField.style.outline = '3px solid red';
          return;
        } else {
          hashtagsField.setCustomValidity('');
        }
      }
    } else {
      hashtagsField.setCustomValidity('Нельзя указать больше пяти хэш-тегов;');
      hashtagIsValid = false;
      hashtagsField.style.outline = '3px solid red';
      return;
    }
  });
  return hashtagIsValid;
};

var onSubmitClick = function () {
  uploadForm.addEventListener('submit', function (evt) {
    if (!checkHashValidity()) { // Маша, мне тут по критериям нужно использовать тернарный оператор или он не используется в таких случаях?
      evt.preventDefault();
      hashtagsField.style.outline = '3px solid red';
    } else {
      hashtagsField.style.outline = '';
    }
  });
};

submitButton.addEventListener('click', onSubmitClick);

// Отображение фотографий других пользователей, лайков и комментариев

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
/* bigPicture.classList.remove('hidden'); */

// прячу блок счётчика комментариев и блок загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
