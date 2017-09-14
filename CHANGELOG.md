# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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