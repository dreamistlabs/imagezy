'use strict';

const initializeImagezy = () => {
  // Collect all imagezy images.
  const imagezys = document.querySelectorAll('.imagezy-img');
  let imagezyCount = imagezys.length;
  let didScroll = false;

  /*!
   * Checks position of each imagezy and sets its src attribute if its position
   * is within the threshold of the viewport. It also reduces the imagezyCount
   * each time an src attribute is set, which is then used to trigger clearInterval
   * when the count reaches zero.
   */
  const checkImagezys = (imagezys) => {
    imagezys.forEach(function(imagezy) {
      let imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < (window.innerHeight * 0.5) && imagezy.getAttribute('data-src')) {
        imagezy.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');
        imagezyCount--;
      }
    });
  }

  /*!
   * Creates a wrapper element around the imagezy image, as well as a loading icon.
   */
  const wrapImage = (image) => {
    let parent = image.parentNode,
        imgClasses = image.classList,
        wrapper = document.createElement('div'),
        icon = document.createElement('span');
    wrapper.classList.add('imagezy-wrapper', 'loading');
    icon.classList.add('imagezy-icon');

    // move additional classes in imagezy to wrapper element
    for (let i = 1; i < imgClasses.length; i++) {
      wrapper.classList.add(imgClasses[i]);
      image.classList.remove(imgClasses[i]);
    }

    // insert wrapper element in front of imagezy image
    parent.insertBefore(wrapper, image);

    // append loading icon and imagezy within wrapper
    wrapper.appendChild(icon);
    wrapper.appendChild(image);
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

  // Wrap each imagezy with a wrapper and onload trigger function.
  imagezys.forEach((imagezy) => {
    wrapImage(imagezy);
    imagezy.onload = () => {
      imagezy.parentNode.classList.remove('loading');
    }
  });

  // Event listener that sets didScroll=true when the user scrolls the page.
  window.addEventListener('scroll', () => {
    // Checks the value of didScroll. If it's false, sets it to true.
    if (didScroll !== true) { didScroll = true; }
  });
};

window.onload = function() { initializeImagezy(); };
