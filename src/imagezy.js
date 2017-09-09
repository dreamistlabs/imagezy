'use strict';

import { css } from './cssRules';

const initializeImagezy = () => {
  /*!
   * Create and append a new stylesheet to <head>
   */
  let style = document.createElement("style");
              document.head.appendChild(style);
  let sheet = style.sheet;

  /*!
   * Collect all imagezy images
   */
  const imagezys = document.querySelectorAll('.imagezy-img');
  let imagezyCount = imagezys.length;
  let didScroll = false;

  /*!
   * Inject Imagezy CSS
   */
  css.forEach(function(rule) {
    sheet.insertRule(rule, sheet.cssRules.length);
  });

  /*!
   * FUNCTIONS
   */

  const setTrigger = (threshold) => {
    if (threshold < 1) {
      return window.innerHeight * (1 - threshold);
    } else {
      return window.innerHeight - threshold;
    }
  }

  const formatThreshold = (threshold) => {
    if (!threshold) { return 0.4 };
    return threshold.match(/\%$/) ? parseInt(threshold) / 100 : parseInt(threshold);
  }

  /*!
   * Sets didScroll=true, if it isn't already.
   */
  const userScrolled = () => {
    if (didScroll !== true) { didScroll = true; }
  }

  const wrapImage = (image) => {
    let currentParent = image.parentNode;
    let imagezy = image;
    let wrapper = document.createElement('div');
    wrapper.classList.add('imagezy-wrapper');

    currentParent.insertBefore(wrapper, imagezy);
    wrapper.appendChild(imagezy);
  }

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  const checkImagezys = (imagezys) => {
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

  /*!
   * Checks if the user has scrolled the page. If so, runs checkImagezys.
   * Also checks if there are any imagezys left to reveal. If not, clears interval.
   */
  const checkScroll = setInterval(function() {
    if (didScroll) {
      didScroll = false;
      checkImagezys(imagezys);

      if (imagezyCount === 0) { clearInterval(checkScroll); }
    }
  }, 100);

  /*!
   * Wrap each imagezy with a wrapper and onload trigger function
   */
  imagezys.forEach((imagezy) => {
    wrapImage(imagezy);
    imagezy.onload = () => { imagezy.parentNode.classList.add('reveal'); }
  });

  /*!
   * Event listener that sets didScroll=true when the user scrolls the page.
   */
  window.addEventListener('scroll', userScrolled);

};

window.onload = function() {
  initializeImagezy();
};