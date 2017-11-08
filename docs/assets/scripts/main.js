let header = document.getElementById('site-header');

window.addEventListener('scroll', function() {
  let scrollPosition = window.scrollY;

  scrollPosition > 30
  ? header.classList.add('thin-header')
  : header.classList.remove('thin-header');
});

function switchTab(e) {
  let _clickedTab = e;
  let tabs = document.querySelectorAll('.tab-item');
  let widgets = document.querySelectorAll('.widget');

  if (!_clickedTab.classList.contains('is-active')) {
    removeActiveStateFrom(tabs);
    removeActiveStateFrom(widgets, _clickedTab, setActive);
    _clickedTab.classList.add('is-active');
  }
}

function removeActiveStateFrom(collection, reference, cb) {
  for (let element of collection) {
    element.classList.remove('is-active');
    typeof cb == "function" && cb(element, reference);
  }
}

function setActive(element, reference) {
  if (element.getAttribute('data-widget-name') === reference.getAttribute('data-tab-name')) {
    element.classList.add('is-active');
  }
}