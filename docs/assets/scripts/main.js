var header = document.getElementById('site-header');

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;

  scrollPosition > 30
  ? header.classList.add('thin-header')
  : header.classList.remove('thin-header');
});