# imagezy
Load images lazily - only when they scroll into view.

## Installation
You can install the library and styles via npm.
```
npm install imagezy --save
```
Or yarn:
```
yarn add imagezy
```
Or CDN:
```
<script src="https://cdn.jsdelivr.net/gh/dreamistlabs/imagezy/dist/imagezy.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/dreamistlabs/imagezy/dist/imagezy.css" rel="stylesheet">
```

## Getting Started
###Express
Add the following to your `app.js` file:
```
app.use('/imagezy', express.static(__dirname + '/node_modules/imagezy/dist/'));
```
Then, link to the library and styles in the main `layout` view page.
```
<script src='/imagezy/imagezy.min.js'></script>
<link href='/imagezy/imagezy.css' rel='stylesheet'>
```
###React
Add the following to your `App.js` file:
```
import 'imagezy/dist/imagezy.min.js';
import 'imagezy/dist/imagezy.css';
```

## Usage
Now, in your HTML write an `img` tag with `class="imagezy-img"` and - instead of pasting your image url to `src` - make sure you assign the url to a `data-src` attribute:
```
<img class="imagezy-img" data-src="https://your-amazingly-cool-image.jpg" />
```

## Customization
Coming soon

## Options

## Contribute

## A Note From The Creator
This was more or less my first, complete open-source project that I made from scratch. I was just learning how to make an npm package at the time, so I wanted to keep the module as simple as possible. That being said, I am open to any feedback you might have - especially on how I can further improve this library!

## License
MIT 
