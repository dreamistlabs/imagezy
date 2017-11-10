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
  let parent = image.parentNode,
      imgClasses = image.classList,
      wrapper = document.createElement('div'),
      icon = document.createElement('span');
  wrapper.classList.add('imagezy-wrapper', 'loading');

  // move additional classes to wrapper element
  for (let i = 1; i < imgClasses.length; i++) {
    wrapper.classList.add(imgClasses[i]);
    image.classList.remove(imgClasses[i]);
  }

  icon.classList.add('imagezy-icon');
  parent.insertBefore(wrapper, image);

  wrapper.appendChild(icon);
  wrapper.appendChild(image);
}

export { loadConfigurations, setTrigger, formatThreshold, wrapImage };