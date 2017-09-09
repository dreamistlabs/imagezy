(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var css = ["div.imagezy-wrapper {\n    position: relative;\n    display: inline-block;\n    width: 700px;\n    height: 400px;\n  }", "div.imagezy-wrapper:before {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #D8D8D8;\n    background-image: url('../imagezy.svg');\n    background-repeat: no-repeat;\n    background-size: 40%;\n    background-position: center;\n    opacity: 1;\n    transition: opacity .2s, z-index .2s linear .5s;\n    z-index: 5;\n  }", "div.imagezy-wrapper:after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    height: 100%;\n    background-color: black;\n    opacity: 1;\n    transition: all 2s;\n  }", "div.imagezy-wrapper.white:after {\n    content: \"\";\n    background-color: white;\n  }", "img.imagezy-img {\n    height: 100%;\n    width: 100%;\n  }", "div.imagezy-wrapper.reveal:before {\n    opacity: 0;\n    z-index: -1;\n  }", "div.imagezy-wrapper.reveal:after {\n    animation: reveal 0.75s forwards;\n  }", "@keyframes reveal {\n    0% { opacity: 1; }\n    15% { opacity: 0.95; }\n    100% { opacity: 0; }\n  }"];

exports.css = css;
},{}],2:[function(require,module,exports){
'use strict';

var _cssRules = require('./cssRules');

var initializeImagezy = function initializeImagezy() {
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

  /*!
   * FUNCTIONS
   */

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

  /*!
   * Sets didScroll=true, if it isn't already.
   */
  var userScrolled = function userScrolled() {
    if (didScroll !== true) {
      didScroll = true;
    }
  };

  var wrapImage = function wrapImage(image) {
    var currentParent = image.parentNode;
    var imagezy = image;
    var wrapper = document.createElement('div');
    wrapper.classList.add('imagezy-wrapper');

    currentParent.insertBefore(wrapper, imagezy);
    wrapper.appendChild(imagezy);
  };

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  var checkImagezys = function checkImagezys(imagezys) {
    imagezys.forEach(function (imagezy) {
      var threshold = formatThreshold(imagezy.getAttribute('data-threshold'));
      var imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < setTrigger(threshold) && imagezy.getAttribute('data-src')) {
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
    wrapImage(imagezy);
    imagezy.onload = function () {
      imagezy.parentNode.classList.add('reveal');
    };
  });

  /*!
   * Event listener that sets didScroll=true when the user scrolls the page.
   */
  window.addEventListener('scroll', userScrolled);
};

window.onload = function () {
  initializeImagezy();
};
},{"./cssRules":1}]},{},[2]);
