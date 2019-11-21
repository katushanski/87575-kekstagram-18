'use strict';

(function () {
  /*
  Валидация хэштегов и отправка формы
  */

  var hashtagParams = {
    MIN: 2,
    MAX: 20
  };
  var hashtagsField = document.querySelector('.text__hashtags');
  var commentField = document.querySelector('.text__description');
  var commentMaxLength = 140;

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

  // Валидация комментов
  var checkCommentValidity = function () {
    var commentValue = commentField.value;
    var customValidityMessage = '';
    if (commentValue !== '') {
      if (commentValue.length > commentMaxLength) {
        customValidityMessage = 'Длина комментария не может составлять больше 140 символов';
      } else {
        customValidityMessage = '';
        commentField.style.outline = '';
      }
    }
    commentField.setCustomValidity(customValidityMessage);
  };

  // Добавляю слушатель события на ввод, таким образом при каждом изменении поля ввода будет совершаться проверка
  hashtagsField.addEventListener('input', checkHashValidity);
  commentField.addEventListener('input', checkCommentValidity);

  hashtagsField.addEventListener('invalid', function () {
    hashtagsField.style.outline = '3px solid red';
  });
  commentField.addEventListener('invalid', function () {
    commentField.style.outline = '3px solid red';
  });
})();
