'use strict';

(function () {
  /*
  Применение эффекта для изображения
  */

  var effectLevel = document.querySelector('.effect-level');
  // var sliderPin = effectLevel.querySelector('.effect-level__pin'); // ползунок
  var inputEffectLevel = effectLevel.querySelector('.effect-level__value');
  var imagePreview = window.uploadPicture.picturesContainer.querySelector('.img-upload__preview');
  var uploadImage = imagePreview.children[0];
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

  window.photoEffects = {
    onImageClick: onImageClick
  };
})();
