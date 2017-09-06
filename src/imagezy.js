'use strict';

import { createStylesheet, appendStylesheetToHead, setTrigger, formatThreshold } from './functions';
import { css } from './cssRules';

(function() {
  /*!
   * Collect all imagezy images
   */
  const imagezys = document.querySelectorAll('.imagezy-img');
  let imagezyCount = imagezys.length;
  let didScroll = false;

  function wrapImage(image) {
    let currentParent = image.parentNode;
    let imagezy = image;
    let wrapper = document.createElement('div');
    wrapper.classList.add('imagezy-wrapper');

    currentParent.insertBefore(wrapper, imagezy);
    wrapper.appendChild(imagezy);
  }

  /*!
   * Checks if the user has scrolled the page. If so, runs checkImagezys.
   * Also checks if there are any imagezys left to reveal. If not, clears interval.
   */
  let checkScroll = setInterval(function() {
    if (didScroll) {
      didScroll = false;
      checkImagezys(imagezys);

      if (imagezyCount === 0) { clearInterval(checkScroll); }
    }
  }, 100);

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
   * Wrap each imagezy with a wrapper and onload trigger function
   */
  imagezys.forEach((imagezy) => {
    wrapImage(imagezy);
    imagezy.onload = () => { imagezy.parentNode.classList.add('reveal'); }
  });

  /*!
   * Sets didScroll=true, if it isn't already.
   */
  function userScrolled() {
    if (didScroll !== true) { didScroll = true; }
  }

  /*!
   * Event listener that sets didScroll=true when the user scrolls the page.
   */
  window.addEventListener('scroll', userScrolled);

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  function checkImagezys(imagezys) {
    imagezys.forEach(function(imagezy) {
      let threshold = formatThreshold(imagezy.getAttribute('data-threshold'));
      let imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < setTrigger(threshold) && imagezy.getAttribute('data-src')) {
        imagezy.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');
        imagezyCount--;
      }
    });
  }

})();