'use strict';

import { createStylesheet, appendStylesheetToHead, setTrigger, formatThreshold } from './functions';
import { css } from './cssRules';

(function() {

  function wrapImage(image) {
    var currentParent = image.parentNode;
    var imagezy = image;
    var wrapper = document.createElement('div');
    wrapper.classList.add('imagezy-wrapper');

    currentParent.insertBefore(wrapper, imagezy);
    wrapper.appendChild(imagezy);
  }

  /*!
   * Create and append a new stylesheet to <head>
   */
  let style = createStylesheet();
  appendStylesheetToHead(style);

  /*!
   * Inject CSS
   */
  let sheet = style.sheet;
  css.forEach(function(rule) {
    sheet.insertRule(rule, sheet.cssRules.length);
  });

  /*!
   * Collect all imagezy images
   */
  const imagezys = document.querySelectorAll('.imagezy-img');

  /*!
   * Wrap each imagezy with a wrapper
   */
  imagezys.forEach((imagezy) => {
    wrapImage(imagezy);
  });


  window.addEventListener('scroll', function() {
    imagezys.forEach(function(imagezy) {
      let threshold = formatThreshold(imagezy.getAttribute('data-threshold'));
      let imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < setTrigger(threshold) && imagezy.getAttribute('data-src')) {

        imagezy.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');

        imagezy.onload = function() {
          imagezy.parentNode.classList.add("reveal");
        }
      }
    });
  });
})();