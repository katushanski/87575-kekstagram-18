'use strict';

(function () {
  var ESC = 27;

  // функция, которая генерирует случайное число в определенном диапазоне (для лайков)
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    isEscEvent: isEscEvent
  };
})();
