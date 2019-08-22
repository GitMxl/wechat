/* global define self */
(function () {
  const className = 'gallery-lightbox'
  const style = `
    .${className} {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      opacity: 0;
      visibility: hidden;
      transition: opacity .3s ease, visibility .3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      padding: 1em;
      z-index: 9999;
      text-align: center;
    }
    .${className}.-open {
      opacity: 1;
      visibility: visible;
    }
    .${className} > .description {
      margin-top: 1em;
      color: white;
      -webkit-font-smoothing: antialiased;
    }
    .${className} > .image,
    .${className} > .image > img {
      max-width: 100%;
      max-height: 100%;
    }
    .${className} > .image {
      max-width: calc(100% - 6em);
      overflow: hidden;
    }
    .${className} > .next,
    .${className} > .prev,
    .${className} > .close {
      position: absolute;
      width: 3em;
      height: 3em;
      padding: 0;
      margin: 0;
      background: rgba(0, 0, 0, 0.2);
      border: 0;
    }
    .${className} > .close {
      top: 2em;
      right: 2em;
    }
    .${className} > .close:before,
    .${className} > .close:after,
    .${className} > .prev:before,
    .${className} > .next:before,
    .${className} > .prev:after,
    .${className} > .next:after {
      content: '';
      width: 80%;
      height: 2px;
      position: absolute;
      top: 50%;
      left: 10%;
      background: white;
      transform-origin: center;
    }
    .${className} > .close:before {
      transform: translateY(-1px) rotate(45deg);
    }
    .${className} > .close:after {
      transform: translateY(-1px) rotate(-45deg);
    }
    .${className} > .next,
    .${className} > .prev {
      top: 50%;
      transform: translateY(-1em)
    }
    .${className} > .next {
      right: 2em;
    }
    .${className} > .prev {
      left: 2em;
    }
    .${className} > .prev:before,
    .${className} > .next:before,
    .${className} > .prev:after,
    .${className} > .next:after {
      width: 20%;
      left: 40%;
    }
    .${className} > .next:before,
    .${className} > .next:after {
      transform-origin: right;
    }
    .${className} > .prev:before,
    .${className} > .prev:after {
      transform-origin: left;
    }
    .${className} > .next:after,
    .${className} > .prev:after {
      transform: rotate(45deg);
    }
    .${className} > .next:before,
    .${className} > .prev:before {
      transform: rotate(-45deg);
    }
  `
  let currentGallery

  // Setup elements
  const lightbox = document.createElement('div')
  lightbox.className = className

  const closeButton = document.createElement('button')
  closeButton.className = 'close'
  lightbox.appendChild(closeButton)

  const prevButton = document.createElement('button')
  prevButton.className = 'prev'
  lightbox.appendChild(prevButton)

  const nextButton = document.createElement('button')
  nextButton.className = 'next'
  lightbox.appendChild(nextButton)

  const currentImageWrapper = document.createElement('div')
  currentImageWrapper.className = 'image'
  lightbox.appendChild(currentImageWrapper)

  const currentImage = document.createElement('img')
  currentImageWrapper.appendChild(currentImage)

  const description = document.createElement('div')
  description.className = 'description'
  lightbox.appendChild(description)

  const styleDiv = document.createElement('style')
  styleDiv.innerHTML = style

  document.body.appendChild(lightbox)
  document.body.appendChild(styleDiv)

  // Setup methods
  const openImage = (image) => {
    lightbox.className = `${className} -open`
    currentImage.src = image.getAttribute('data-gallery-src')
    description.innerHTML = image.getAttribute('data-gallery-desc') || ''
  }

  const closeGallery = () => {
    lightbox.className = className
    currentGallery = null
  }

  const createGallery = (images) => {
    const _gallery = {
      currentIndex: 0,
      next: () => {
        _gallery.currentIndex = (_gallery.currentIndex + 1) % images.length
        openImage(images[_gallery.currentIndex])
      },
      prev: () => {
        _gallery.currentIndex = (_gallery.currentIndex - 1)
        if (_gallery.currentIndex < 0) {
          _gallery.currentIndex = images.length - 1
        }
        openImage(images[_gallery.currentIndex])
      }
    }

    const onClick = (index) => () => {
      currentGallery = _gallery
      _gallery.currentIndex = index
      openImage(images[index])
    }

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', onClick(i))
    }
  }

  // Setup events
  window.addEventListener('keyup', (ev) => {
    // Close on ESCAPE
    if (ev.keyCode === 27) {
      closeGallery()
    }

    if (currentGallery) {
      // Prev image on LEFT
      if (ev.keyCode === 37) {
        currentGallery.prev()
      }

      // Next image on RIGHT
      if (ev.keyCode === 39) {
        currentGallery.next()
      }
    }
  })

  closeButton.addEventListener('click', closeGallery)
  prevButton.addEventListener('click', () => (
    currentGallery && currentGallery.prev()
  ))
  nextButton.addEventListener('click', () => (
    currentGallery && currentGallery.next()
  ))

  // Create galleries
  const initGallery = (parent) => {
    let images = parent.querySelectorAll('[data-gallery-src]')
    let galleries = {}
    for (let i = 0; i < images.length; i++) {
      let galleryId = images[i].getAttribute('data-gallery-id') || '_'
      galleries[galleryId] = (galleries[galleryId] || []).concat(images[i])
    }
    Object.keys(galleries).forEach(k => createGallery(galleries[k]))
  }

  // Umd
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory)
    } else if (typeof exports === 'object') {
      module.exports = factory()
    } else {
      // Browser globals
      root.initGallery = factory()
    }
  }(typeof self !== 'undefined' ? self : this, () => initGallery))

  initGallery(document)
}())
