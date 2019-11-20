'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var submitButton = uploadForm.querySelector('.img-upload__submit');

  // Добавляю слушатель события на кнопку "Опубликовать"
  var onSubmitButtonClick = function () {
    window.validation.hashtagsField.addEventListener('invalid', function () {
      window.validation.hashtagsField.style.outline = '3px solid red';
    });
    window.validation.commentField.addEventListener('invalid', function () {
      window.validation.commentField.style.outline = '3px solid red';
    });
  };

  // Добавляю слушатель события на кнопку "Опубликовать"
  submitButton.addEventListener('click', onSubmitButtonClick);
})();
