'use strict';

(function () {
  /*
  Загрузка изображения, открытие и закрытие формы редактирования
  */

  var picturesContainer = document.querySelector('.pictures');
  var effectsList = picturesContainer.querySelector('.effects__list');
  var uploadTextFieldset = document.querySelector('.img-upload__text');
  var inputPhotoUpload = picturesContainer.querySelector('#upload-file');
  var closeUploadButton = picturesContainer.querySelector('.img-upload__cancel');

  var onEditWindowEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeUpload();
    }
  };

  var openUpload = function (evt) {
    evt.preventDefault();
    picturesContainer.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', onEditWindowEscPress);
    effectsList.addEventListener('click', window.photoEffects.onImageClick);
  };

  var closeUpload = function () {
    picturesContainer.querySelector('.img-upload__overlay').classList.add('hidden');
    inputPhotoUpload.value = '';
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

  window.uploadPicture = {
    picturesContainer: picturesContainer,
    effectsList: effectsList
  };
})();
