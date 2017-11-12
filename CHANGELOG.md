# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.0.0 - WORK IN PROGRESS
### Added
- Some logic to check and move additional CSS classes in an imagezy image to its parent imagezy wrapper element. The reason for this is to achieve consistent and predictable image sizing. Users will be required to assign a custom CSS class—with width and height declarations—to an imagezy image. This CSS class is then moved to the dynamically generated wrapper when the page loads.
- Filled in the Installation, Getting Started, and Usage README sections.
- Added Johnny Hu as a copyright owner.

### Changed
- The way the loading icon is rendered. Instead of being pseudo-classes on the wrapper itself, it's now a child span element with its own pseudo classes.
- CSS styles are no longer injected into the user agent stylesheet. Instead, the CSS is now in its own separate file, which users
 will be required to include in their application in order for the styles to apply.
- Added and modified a few npm scripts that are used to build the production files. More specifically, Babelify is being used to convert ES6 syntax. Also, node-sass-chokidar - alongside autoprefixer and postcss - now compiles SCSS to CSS, along with a sourcemaps.

### Fixed
- If the user doesn't specify an imagezyConfig variable in his/her HTML file, a 'variable not defined' error is thrown, causing the script to stop running. This has been fixed. Now, if the user doesn't declare an imagezyConfig variable, the script will use default values.
- The imagezy placeholder svg image, which used a relative path, was not pulling in production. This has been fixed. The logo is now embedded into the CSS itself and no longer needs to reference a separate file. The logo was also shortened to only include the path of the letter 'I' in order to save on file size.

### Removed
- Users are no longer able to declare an `imagezyConfig` variable that would have previously allowed them to customize settings like the fade in color and the trigger point for when the image starts to load.

## 1.0.0 - 2017-09-13
### Added
- Users can now pass in options by declaring an `imagezyConfig` variable in a script.
- Throttle back frequency in which the window scroll event is fired (for better performance).
- Docs subfolder for documentation
- CHANGELOG file

### Changed
- The imagezy wrapper class has been changed from `imagezy` to `imagezy-wrapper`.
- Users now need to use `<img>` tags to declare an imagezy.


## 0.0.1 - 2017-08-28
### Added
- Feature: Allow users to determine when an image loads in relation to the viewport (`data-threshold`).
- Feature: Load images with the class "lazy" (`<img class="lazy">`) only when they reach the viewport.