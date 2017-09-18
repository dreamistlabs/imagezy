(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _cssRules = require('./lib/cssRules');

var _functions = require('./lib/functions');

var initializeImagezy = function initializeImagezy() {
  /*!
   * Load configurations
   */
  var opts = (0, _functions.loadConfigurations)(imagezyConfig);

  /*!
   * Create and append a new stylesheet to <head>
   */
  var style = document.createElement("style");
  document.head.appendChild(style);
  var sheet = style.sheet;

  /*!
   * Collect all imagezy images
   */
  var imagezys = document.querySelectorAll('.imagezy-img');
  var imagezyCount = imagezys.length;
  var didScroll = false;

  /*!
   * Inject Imagezy CSS
   */
  _cssRules.css.forEach(function (rule) {
    sheet.insertRule(rule, sheet.cssRules.length);
  });

  sheet.insertRule('div.imagezy-wrapper:after {background-color: ' + opts.fadeColor + '}', sheet.cssRules.length);

  /*!
   * Checks the value of didScroll. If it's false, sets it to true.
   */
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

  /*!
   * Wrap each imagezy with a wrapper and onload trigger function
   */
  imagezys.forEach(function (imagezy) {
    (0, _functions.wrapImage)(imagezy);
    imagezy.onload = function () {
      imagezy.parentNode.classList.add('reveal');
    };
  });

  /*!
   * Event listener that sets didScroll=true when the user scrolls the page.
   */
  window.addEventListener('scroll', captureScroll);
};

window.onload = function () {
  initializeImagezy();
};
},{"./lib/cssRules":2,"./lib/functions":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var css = ["div.imagezy-wrapper {\n  position: relative;\n  display: inline-block;\n  width: 700px;\n  height: 400px;\n}", "div.imagezy-wrapper:before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #D8D8D8;\n  background-image: url(\"data:image/svg+xml;utf8,<svg width='20px' height='46px' viewBox='0 0 20 46' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(0.000000, 1.000000)' stroke='#C8C8C8'><path d='M0.92,15.776 L4.696,15.776 L14.808,14.24 L14.808,40.736 L18.584,40.736 L18.584,44 L0.92,44 L0.92,40.736 L4.696,40.736 L4.696,18.976 L0.92,18.976 L0.92,15.776 Z M4.696,5.792 C4.696,3.999991 5.079996,2.666671 5.848,1.792 C6.616004,0.917329 7.917324,0.48 9.752,0.48 C11.67201,0.48 12.994663,0.917329 13.72,1.792 C14.445337,2.666671 14.808,3.999991 14.808,5.792 C14.808,7.6266758 14.413337,8.9599958 13.624,9.792 C12.834663,10.6240042 11.544009,11.04 9.752,11.04 C7.917324,11.04 6.616004,10.6240042 5.848,9.792 C5.079996,8.9599958 4.696,7.6266758 4.696,5.792 Z' id='imagezy-logo'></path></g></g></svg>\");\n  background-repeat: no-repeat;\n  background-size: 5%;\n  background-position: center;\n  opacity: 1;\n  transition: opacity .2s, z-index .2s linear .5s;\n  z-index: 5;\n}", "div.imagezy-wrapper:after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  opacity: 1;\n  transition: all 2s;\n}", "img.imagezy-img {\n  height: 100%;\n  width: 100%;\n}", "div.imagezy-wrapper.reveal:before {\n  opacity: 0;\n  z-index: -1;\n}", "div.imagezy-wrapper.reveal:after {\n  animation: reveal 0.75s forwards;\n}", "@keyframes reveal {\n  0% { opacity: 1; }\n  15% { opacity: 0.95; }\n  100% { opacity: 0; }\n}"];

exports.css = css;
},{}],3:[function(require,module,exports){
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
    threshold: 0.4
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
  wrapper.classList.add('imagezy-wrapper');

  currentParent.insertBefore(wrapper, imagezy);
  wrapper.appendChild(imagezy);
};

exports.loadConfigurations = loadConfigurations;
exports.setTrigger = setTrigger;
exports.formatThreshold = formatThreshold;
exports.wrapImage = wrapImage;
},{}]},{},[1]);
