'use strict';

(function() {

  /*!
   * Set an image's src attribute to an SVG
   */
  const setImageToPlaceholder = (image, svg) => {
    let xml = (new XMLSerializer).serializeToString(svg);
    image.src = "data:image/svg+xml;charset=utf-8,"+xml;
  }

  const setTrigger = (threshold) => {
    if (threshold < 1) {
      return window.innerHeight * (1 - threshold);
    } else {
      return window.innerHeight - threshold;
    }
  }

  const formatThreshold = (threshold) => {
    if (!threshold) { return 0 };
    return threshold.match(/\%$/) ? parseInt(threshold) / 100 : parseInt(threshold);
  }

  const createStylesheet = () => {
    return document.createElement("style");
  }

  const appendToHead = (stylesheet) => {
    document.head.appendChild(stylesheet);
  }

  /*!
   * Create and append a new stylesheet to <head>
   */
  let style = createStylesheet();
  appendToHead(style);
  let sheet = style.sheet;
  sheet.insertRule(
  `div.imagezy {
    position: relative;
    display: inline-block;
    width: 700px;
    height: 400px;
  }`, sheet.cssRules.length);

  sheet.insertRule(
  `div.imagezy:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 1;
    transition: all 2s;
  }`, sheet.cssRules.length);

  sheet.insertRule(
  `img.imagezy-img {
    height: 100%;
    width: 100%;
  }`, sheet.cssRules.length);

  sheet.insertRule(
  `div.imagezy.fadeOut:after {
    animation: fadeOut 0.75s forwards;
  }`, sheet.cssRules.length);

  console.log(sheet.cssRules);

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
   * Collect all images to be lazy loaded.
   */
  const imagezys = document.querySelectorAll('.imagezy');

  /*!
   * Load each lazy image with an initial placeholder
   */
  imagezys.forEach((imagezy) => {
    let img = document.createElement('img');
    let imgWidth = imagezy.width;
    let imgHeight = imagezy.height;

    img.className = "imagezy-img";

    imagezy.appendChild(img);

    // let placeholder = createPlaceholder(imgWidth, imgHeight);
    // setImageToPlaceholder(img, placeholder);
  });

  window.addEventListener('scroll', function() {
    imagezys.forEach(function(imagezy) {
      let threshold = formatThreshold(imagezy.getAttribute('data-threshold'));
      let imgPosition = imagezy.getBoundingClientRect().top;

      if (imgPosition < setTrigger(threshold) && imagezy.getAttribute('data-src')) {

        imagezy.lastElementChild.setAttribute('src', imagezy.getAttribute('data-src'));
        imagezy.removeAttribute('data-src');

        imagezy.lastElementChild.onload = function() {
          imagezy.classList.add("fadeOut");
        }
      }
    });
  });
})();