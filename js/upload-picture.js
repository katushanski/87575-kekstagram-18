'use strict';

(function () {
  /*
  Загрузка изображения, открытие и закрытие формы редактирования
  */
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadTextFieldset = document.querySelector('.img-upload__text');
  var inputPhotoUpload = document.querySelector('#upload-file');
  var closeUploadButton = document.querySelector('.img-upload__cancel');

  var onEditWindowEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeUpload();
    }
  };

  var openUpload = function (evt) {
    evt.preventDefault();
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEditWindowEscPress);
    window.effects.init();
  };

  var closeUpload = function () {
    uploadOverlay.classList.add('hidden');
    inputPhotoUpload.value = '';
    window.effects.reset();
  };

  inputPhotoUpload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload(evt);
  });

  uploadTextFieldset.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEditWindowEscPress);
  });

  uploadTextFieldset.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEditWindowEscPress);
  });

  closeUploadButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeUpload();
  });
})();
