'use strict';

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

const setImageToPlaceholder = (image, placeholder) => {
  let xml = (new XMLSerializer).serializeToString(placeholder);
  image.src = "data:image/svg+xml;charset=utf-8,"+xml;
}
/*!
 * Collect all images to be lazy loaded.
 */
var imgs = document.querySelectorAll('img.lazy');

/*!
 * Load initial placeholder for each lazy image based on its width and height
 */
imgs.forEach((img) => {
  let imgWidth = img.width, 
      imgHeight = img.height;
  let placeholder = createPlaceholder(imgWidth, imgHeight);
  setImageToPlaceholder(img, placeholder);
});
window.addEventListener('scroll', function() {
  imgs.forEach(function(img) {
    if (img.offsetTop < ((window.innerHeight * .5) + window.scrollY) && img.getAttribute('data-src')) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    }
  });
});