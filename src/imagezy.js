var imgs = document.querySelectorAll('img.lazy');
var placeholder = 'https://placehold.it/400x300';

imgs.forEach(function(img) {
  // if ((img.offsetTop > window.innerHeight) && !img.src) {
    img.setAttribute('src', placeholder);
  // } else {
  //   img.setAttribute('src', img.getAttribute('data-src'));
  // }
  img.onload = function() {
    console.log('onload');
  };
});
window.addEventListener('scroll', function() {
  imgs.forEach(function(img) {
    if (img.offsetTop < ((window.innerHeight * .95) + window.scrollY) && img.getAttribute('data-src')) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    }
  });
});
