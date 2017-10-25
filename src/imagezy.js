'use strict';

import { loadConfigurations, setTrigger, formatThreshold, wrapImage } from './lib/functions';

const initializeImagezy = () => {
  /*!
   * Load configurations
   */
  let opts = (typeof imagezyConfig != "undefined") ? loadConfigurations(imagezyConfig) : loadConfigurations();

  /*!
   * Collect all imagezy images
   */
  const imagezys = document.querySelectorAll('.imagezy-img');
  let imagezyCount = imagezys.length;
  let didScroll = false;

  /*!
   * Checks the value of didScroll. If it's false, sets it to true.
   */
  const captureScroll = () => {
    if (didScroll !== true) { didScroll = true; }
  }

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  const checkImagezys = (imagezys) => {
    imagezys.forEach(function(imagezy) {
      let threshold = formatThreshold(opts.threshold.toString());
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
    imagezy.onload = () => { imagezy.parentNode.classList.add('imagezy-reveal'); }
  });

  /*!
   * Event listener that sets didScroll=true when the user scrolls the page.
   */
  window.addEventListener('scroll', captureScroll);

};

window.onload = function() {
  initializeImagezy();
};