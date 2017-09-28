const css = [
`div.imagezy-wrapper {
  position: relative;
  display: inline-block;
  width: 700px;
  height: 400px;
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
`img.imagezy-img {
  height: 100%;
  width: 100%;
}`,
`div.imagezy-wrapper.reveal:after {
  animation: reveal 1.75s forwards;
}`,
`@keyframes reveal {
  0% { opacity: 1; }
  15% { opacity: 0.95; }
  100% { opacity: 0; }
}`
];

export { css };