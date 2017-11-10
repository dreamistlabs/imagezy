(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var initializeImagezy = function initializeImagezy() {
  // Collect all imagezy images.
  var imagezys = document.querySelectorAll('.imagezy-img');
  var imagezyCount = imagezys.length;
  var didScroll = false;

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  var checkImagezys = function checkImagezys(imagezys) {
    imagezys.forEach(function (imagezy) {
      var imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < window.innerHeight * 0.50 && imagezy.getAttribute('data-src')) {
        imagezy.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');
        imagezyCount--;
      }
    });
  };

  /*!
   * Creates a wrapper element around the imagezy image, as well as a loading icon.
   */
  var wrapImage = function wrapImage(image) {
    var parent = image.parentNode,
        imgClasses = image.classList,
        wrapper = document.createElement('div'),
        icon = document.createElement('span');
    wrapper.classList.add('imagezy-wrapper', 'loading');
    icon.classList.add('imagezy-icon');

    // move additional classes in imagezy to wrapper element
    for (var i = 1; i < imgClasses.length; i++) {
      wrapper.classList.add(imgClasses[i]);
      image.classList.remove(imgClasses[i]);
    }

    // insert wrapper element in front of imagezy image
    parent.insertBefore(wrapper, image);

    // append loading icon and imagezy within wrapper
    wrapper.appendChild(icon);
    wrapper.appendChild(image);
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
    wrapImage(imagezy);
    imagezy.onload = function () {
      imagezy.parentNode.classList.remove('loading');
    };
  });

  // Event listener that sets didScroll=true when the user scrolls the page.
  window.addEventListener('scroll', function () {
    // Checks the value of didScroll. If it's false, sets it to true.
    if (didScroll !== true) {
      didScroll = true;
    }
  });
};

window.onload = function () {
  initializeImagezy();
};

},{}]},{},[1]);
