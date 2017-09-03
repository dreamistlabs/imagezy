const css = [
  `div.imagezy-wrapper {
    position: relative;
    display: inline-block;
    width: 700px;
    height: 400px;
  }`,
  `div.imagezy-wrapper:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #D8D8D8;
    background-image: url('../imagezy.svg');
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: center;
    opacity: 1;
    transition: opacity .2s, z-index .2s linear .5s;
    z-index: 5;
  }`,
  `div.imagezy-wrapper:after {
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
  }`,
  `div.imagezy-wrapper.white:after {
    content: "";
    background-color: white;
  }`,
  `img.imagezy-img {
    height: 100%;
    width: 100%;
  }`,
  `div.imagezy-wrapper.reveal:before {
    opacity: 0;
    z-index: -1;
  }`,
  `div.imagezy-wrapper.reveal:after {
    animation: reveal 0.75s forwards;
  }`,
  `@keyframes reveal {
    0% { opacity: 1; }
    15% { opacity: 0.95; }
    100% { opacity: 0; }
  }`
];

export { css };