'use strict';

const createStylesheet = () => {
  return document.createElement("style");
}

const appendStylesheetToHead = (stylesheet) => {
  document.head.appendChild(stylesheet);
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

export { createStylesheet, appendStylesheetToHead, setTrigger, formatThreshold };