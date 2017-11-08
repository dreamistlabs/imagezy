(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _functions = require('./lib/functions');

var initializeImagezy = function initializeImagezy() {
  // Load configurations.
  var opts = typeof imagezyConfig != "undefined" ? (0, _functions.loadConfigurations)(imagezyConfig) : (0, _functions.loadConfigurations)();

  // Collect all imagezy images.
  var imagezys = document.querySelectorAll('.imagezy-img');
  var imagezyCount = imagezys.length;
  var didScroll = false;

  // Checks the value of didScroll. If it's false, sets it to true.
  var captureScroll = function captureScroll() {
    if (didScroll !== true) {
      didScroll = true;
    }
  };

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  var checkImagezys = function checkImagezys(imagezys) {
    imagezys.forEach(function (imagezy) {
      var threshold = (0, _functions.formatThreshold)(opts.threshold.toString());
      var imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < (0, _functions.setTrigger)(threshold) && imagezy.getAttribute('data-src')) {
        imagezy.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');
        imagezyCount--;
      }
    });
  };

  /*!
   * Checks if the user has scrolled the page. If so, runs checkImagezys.
   * Also checks if there are any imagezys left to reveal. If not, clears interval.
   */
  var checkScroll = setInterval(function () {
    if (didScroll) {
      didScroll = false;
      checkImagezys(imagezys);

      if (imagezyCount === 0) {
        clearInterval(checkScroll);
      }
    }
  }, 100);

  // Wrap each imagezy with a wrapper and onload trigger function.
  imagezys.forEach(function (imagezy) {
    (0, _functions.wrapImage)(imagezy);
    imagezy.onload = function () {
      imagezy.parentNode.classList.remove('loading');
      imagezy.parentNode.style.width = "auto";
      imagezy.parentNode.style.height = "auto";
    };
  });

  // Event listener that sets didScroll=true when the user scrolls the page.
  window.addEventListener('scroll', captureScroll);
};

window.onload = function () {
  initializeImagezy();
};

},{"./lib/functions":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var processOptions = function processOptions(config, opts) {
  for (var option in config) {
    switch (option) {
      case 'fadeColor':
        opts[option] = config[option];
        break;
      case 'threshold':
        opts[option] = config[option];
        break;
      default:
        break;
    }
  }
  return opts;
};

var loadConfigurations = function loadConfigurations(config) {
  var options = {
    fadeColor: 'black',
    threshold: 1
  };

  return config ? processOptions(config, options) : options;
};

var setTrigger = function setTrigger(threshold) {
  if (threshold < 1) {
    return window.innerHeight * (1 - threshold);
  } else {
    return window.innerHeight - threshold;
  }
};

var formatThreshold = function formatThreshold(threshold) {
  if (!threshold) {
    return 0.4;
  };
  return threshold.match(/\%$/) ? parseInt(threshold) / 100 : parseInt(threshold);
};

var wrapImage = function wrapImage(image) {
  var currentParent = image.parentNode;
  var imagezy = image;
  var wrapper = document.createElement('div');
  wrapper.classList.add('imagezy-wrapper', 'loading');

  currentParent.insertBefore(wrapper, imagezy);
  wrapper.appendChild(imagezy);
};

exports.loadConfigurations = loadConfigurations;
exports.setTrigger = setTrigger;
exports.formatThreshold = formatThreshold;
exports.wrapImage = wrapImage;

},{}]},{},[1]);
