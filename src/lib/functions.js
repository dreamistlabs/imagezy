'use strict';

const processOptions = (config, opts) => {
  for (let option in config) {
    switch (option) {
      case 'fadeColor':
        opts[option] = config[option];
        break;
      case 'threshold':
        opts[option] = config[option];
        break;
      default:
        break;
    }
  }
  return opts;
}

const loadConfigurations = (config) => {
  let options = {
    fadeColor: 'black',
    threshold: 1
  };

  return config ? processOptions(config, options) : options;
}

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

const wrapImage = (image) => {
  let currentParent = image.parentNode;
  let imagezy = image;
  let wrapper = document.createElement('div');
  let icon = document.createElement('span');
  wrapper.classList.add('imagezy-wrapper', 'loading');
  icon.classList.add('imagezy-icon');

  currentParent.insertBefore(wrapper, imagezy);
  wrapper.appendChild(icon);
  wrapper.appendChild(imagezy);
}

export { loadConfigurations, setTrigger, formatThreshold, wrapImage };