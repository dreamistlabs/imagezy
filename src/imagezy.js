'use strict';

import { createStylesheet, appendStylesheetToHead, setTrigger, formatThreshold } from './functions';
import { css } from './cssRules';

(function() {

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
  const imagezys = document.querySelectorAll('.imagezy');

  /*!
   * Create <img> within each imagezy
   */
  imagezys.forEach((imagezy) => {
    let img = document.createElement('img');
    img.className = "imagezy-img";
    imagezy.appendChild(img);
  });


  window.addEventListener('scroll', function() {
    imagezys.forEach(function(imagezy) {
      let threshold = formatThreshold(imagezy.getAttribute('data-threshold'));
      let imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < setTrigger(threshold) && imagezy.getAttribute('data-src')) {

        imagezy.lastElementChild.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');

        imagezy.lastElementChild.onload = function() {
          imagezy.classList.add("reveal");
        }
      }
    });
  });
})();