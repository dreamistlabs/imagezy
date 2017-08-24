'use strict';
(function() {
  /*!
   * Create an SVG with the given width and height
   */
  const createPlaceholder = (width, height) => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let svgNS = svg.namespaceURI;
    let shape = document.createElementNS(svgNS, "rect");

    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    shape.setAttributeNS(null, "width", width);
    shape.setAttributeNS(null, "height", height);
    shape.setAttributeNS(null, "x", 0);
    shape.setAttributeNS(null, "y", 0);
    shape.setAttributeNS(null, "fill", "rgba(200, 200, 200, 0.8");
    svg.appendChild(shape);
    return svg;
  }
  /*!
   * Set an image's src attribute to an SVG
   */
  const setImageToPlaceholder = (image, svg) => {
    let xml = (new XMLSerializer).serializeToString(svg);
    image.src = "data:image/svg+xml;charset=utf-8,"+xml;
  }

  const setTrigger = (threshold) => {
    if (threshold < 1) {
      return window.innerHeight * (1 - threshold) + window.scrollY;
    } else {
      return window.innerHeight - threshold + window.scrollY;
    }
  }

  const formatThreshold = (threshold) => {
    if (!threshold) { return 0 };
    return threshold.match(/\%$/) ? parseInt(threshold) / 100 : parseInt(threshold);
  }
  /*!
   * Collect all images to be lazy loaded.
   */
  const imgs = document.querySelectorAll('img.lazy');

  /*!
   * Load each lazy image with an initial placeholder
   */
  imgs.forEach((img) => {
    let imgWidth = img.width, 
        imgHeight = img.height;
    let placeholder = createPlaceholder(imgWidth, imgHeight);
    setImageToPlaceholder(img, placeholder);
  });

  window.addEventListener('scroll', function() {
    imgs.forEach(function(img) {
      let threshold = formatThreshold(img.getAttribute('data-threshold'));

      if (img.offsetTop < setTrigger(threshold) && img.getAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }
    });
  });
})();