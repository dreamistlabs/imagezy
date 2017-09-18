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
  background-image: url("data:image/svg+xml;utf8,<svg width='20px' height='46px' viewBox='0 0 20 46' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(0.000000, 1.000000)' stroke='#C8C8C8'><path d='M0.92,15.776 L4.696,15.776 L14.808,14.24 L14.808,40.736 L18.584,40.736 L18.584,44 L0.92,44 L0.92,40.736 L4.696,40.736 L4.696,18.976 L0.92,18.976 L0.92,15.776 Z M4.696,5.792 C4.696,3.999991 5.079996,2.666671 5.848,1.792 C6.616004,0.917329 7.917324,0.48 9.752,0.48 C11.67201,0.48 12.994663,0.917329 13.72,1.792 C14.445337,2.666671 14.808,3.999991 14.808,5.792 C14.808,7.6266758 14.413337,8.9599958 13.624,9.792 C12.834663,10.6240042 11.544009,11.04 9.752,11.04 C7.917324,11.04 6.616004,10.6240042 5.848,9.792 C5.079996,8.9599958 4.696,7.6266758 4.696,5.792 Z' id='imagezy-logo'></path></g></g></svg>");
  background-repeat: no-repeat;
  background-size: 5%;
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