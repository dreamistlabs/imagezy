var header = document.getElementById('site-header');

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;

  if (scrollPosition > 30) {
    header.classList.add('thin-header');
  } else {
    header.classList.remove('thin-header');
  }

});