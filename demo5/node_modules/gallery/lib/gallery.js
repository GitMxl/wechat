'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global define self */
(function () {
  var className = 'gallery-lightbox';
  var style = '\n    .' + className + ' {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background: rgba(0, 0, 0, 0.9);\n      opacity: 0;\n      visibility: hidden;\n      transition: opacity .3s ease, visibility .3s ease;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;\n      padding: 1em;\n      z-index: 9999;\n      text-align: center;\n    }\n    .' + className + '.-open {\n      opacity: 1;\n      visibility: visible;\n    }\n    .' + className + ' > .description {\n      margin-top: 1em;\n      color: white;\n      -webkit-font-smoothing: antialiased;\n    }\n    .' + className + ' > .image,\n    .' + className + ' > .image > img {\n      max-width: 100%;\n      max-height: 100%;\n    }\n    .' + className + ' > .image {\n      max-width: calc(100% - 6em);\n      overflow: hidden;\n    }\n    .' + className + ' > .next,\n    .' + className + ' > .prev,\n    .' + className + ' > .close {\n      position: absolute;\n      width: 3em;\n      height: 3em;\n      padding: 0;\n      margin: 0;\n      background: rgba(0, 0, 0, 0.2);\n      border: 0;\n    }\n    .' + className + ' > .close {\n      top: 2em;\n      right: 2em;\n    }\n    .' + className + ' > .close:before,\n    .' + className + ' > .close:after,\n    .' + className + ' > .prev:before,\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:after,\n    .' + className + ' > .next:after {\n      content: \'\';\n      width: 80%;\n      height: 2px;\n      position: absolute;\n      top: 50%;\n      left: 10%;\n      background: white;\n      transform-origin: center;\n    }\n    .' + className + ' > .close:before {\n      transform: translateY(-1px) rotate(45deg);\n    }\n    .' + className + ' > .close:after {\n      transform: translateY(-1px) rotate(-45deg);\n    }\n    .' + className + ' > .next,\n    .' + className + ' > .prev {\n      top: 50%;\n      transform: translateY(-1em)\n    }\n    .' + className + ' > .next {\n      right: 2em;\n    }\n    .' + className + ' > .prev {\n      left: 2em;\n    }\n    .' + className + ' > .prev:before,\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:after,\n    .' + className + ' > .next:after {\n      width: 20%;\n      left: 40%;\n    }\n    .' + className + ' > .next:before,\n    .' + className + ' > .next:after {\n      transform-origin: right;\n    }\n    .' + className + ' > .prev:before,\n    .' + className + ' > .prev:after {\n      transform-origin: left;\n    }\n    .' + className + ' > .next:after,\n    .' + className + ' > .prev:after {\n      transform: rotate(45deg);\n    }\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:before {\n      transform: rotate(-45deg);\n    }\n  ';
  var currentGallery = void 0;

  // Setup elements
  var lightbox = document.createElement('div');
  lightbox.className = className;

  var closeButton = document.createElement('button');
  closeButton.className = 'close';
  lightbox.appendChild(closeButton);

  var prevButton = document.createElement('button');
  prevButton.className = 'prev';
  lightbox.appendChild(prevButton);

  var nextButton = document.createElement('button');
  nextButton.className = 'next';
  lightbox.appendChild(nextButton);

  var currentImageWrapper = document.createElement('div');
  currentImageWrapper.className = 'image';
  lightbox.appendChild(currentImageWrapper);

  var currentImage = document.createElement('img');
  currentImageWrapper.appendChild(currentImage);

  var description = document.createElement('div');
  description.className = 'description';
  lightbox.appendChild(description);

  var styleDiv = document.createElement('style');
  styleDiv.innerHTML = style;

  document.body.appendChild(lightbox);
  document.body.appendChild(styleDiv);

  // Setup methods
  var openImage = function openImage(image) {
    lightbox.className = className + ' -open';
    currentImage.src = image.getAttribute('data-gallery-src');
    description.innerHTML = image.getAttribute('data-gallery-desc') || '';
  };

  var closeGallery = function closeGallery() {
    lightbox.className = className;
    currentGallery = null;
  };

  var createGallery = function createGallery(images) {
    var _gallery = {
      currentIndex: 0,
      next: function next() {
        _gallery.currentIndex = (_gallery.currentIndex + 1) % images.length;
        openImage(images[_gallery.currentIndex]);
      },
      prev: function prev() {
        _gallery.currentIndex = _gallery.currentIndex - 1;
        if (_gallery.currentIndex < 0) {
          _gallery.currentIndex = images.length - 1;
        }
        openImage(images[_gallery.currentIndex]);
      }
    };

    var onClick = function onClick(index) {
      return function () {
        currentGallery = _gallery;
        _gallery.currentIndex = index;
        openImage(images[index]);
      };
    };

    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click', onClick(i));
    }
  };

  // Setup events
  window.addEventListener('keyup', function (ev) {
    // Close on ESCAPE
    if (ev.keyCode === 27) {
      closeGallery();
    }

    if (currentGallery) {
      // Prev image on LEFT
      if (ev.keyCode === 37) {
        currentGallery.prev();
      }

      // Next image on RIGHT
      if (ev.keyCode === 39) {
        currentGallery.next();
      }
    }
  });

  closeButton.addEventListener('click', closeGallery);
  prevButton.addEventListener('click', function () {
    return currentGallery && currentGallery.prev();
  });
  nextButton.addEventListener('click', function () {
    return currentGallery && currentGallery.next();
  });

  // Create galleries
  var initGallery = function initGallery(parent) {
    var images = parent.querySelectorAll('[data-gallery-src]');
    var galleries = {};
    for (var i = 0; i < images.length; i++) {
      var galleryId = images[i].getAttribute('data-gallery-id') || '_';
      galleries[galleryId] = (galleries[galleryId] || []).concat(images[i]);
    }
    Object.keys(galleries).forEach(function (k) {
      return createGallery(galleries[k]);
    });
  };

  // Umd
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
      module.exports = factory();
    } else {
      // Browser globals
      root.initGallery = factory();
    }
  })(typeof self !== 'undefined' ? self : this, function () {
    return initGallery;
  });

  initGallery(document);
})();
