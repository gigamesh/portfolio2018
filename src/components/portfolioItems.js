const portfolioItems = [
  {
    title: 'Quadratic Finance',
    img:  '/img/thumbnails/librad.png',
    text: 'This is a data visualization I built using D3 and React for the purpose of explaining a novel funding mechanism for public goods. It features animation using D3\'s force simulations, with hundreds of SVG circle nodes and multiple state transitions.',
    url: 'http://liberal-radicalism.s3-website-us-west-1.amazonaws.com/',
    src: 'https://github.com/gigamesh/liberal-radicalism-d3'
  },
  {
    title: 'RadicalxChange',
    img:  '/img/thumbnails/rxc.png',
    text: 'RadicalxChange is a nonprofit organization founded by E. Glen Weyl, economist and principle researcher at Microsoft. I assisted in launching the website (Polymer and Firebase), adding features and design upgrades to the main page, and coding a markdown blog editor with React.',
    url: 'https://www.radicalxchange.org',
    src: 'https://github.com/RadicalxChange'
  },
  {
    title: 'aud.io',
    img:  '/img/thumbnails/audio.jpg',
    text: 'Aud.io is a social network for connecting musicians and recording studios. Made with MongoDB, Node, React, Redux, Redux-saga, Material-UI & styled-components. Includes user registration with password encryption, form validation, live search, lazy-loaded images, and mobile-responsive CSS.',
    url: 'https://aud-io.herokuapp.com',
    src: 'https://github.com/gigamesh/aud.io'
  },
  {
    title: 'Three.js Demo',
    img:  '/img/thumbnails/threejs.jpg',
    text: 'Experiments in different ways of presenting interactive 3D-rendered text using three.js, a popular WebGL library. Bundled into a simple React app.',
    url: 'http://threejs-logo-demo.s3-website-us-west-1.amazonaws.com',
    src: 'https://github.com/gigamesh/threejs-demo'
  },
  {
    title: 'Fireblog',
    img:  '/img/thumbnails/fireblog.jpg',
    text: 'This project started as a markdown-based blogging editor for a multidisciplinary economics conference I\'m helping organize (RadicalxChange). I eventually decided to generalize and open-source it. It has a React front-end and uses Firebase Cloudstore for data persistence.',
    url: 'https://fireblog-2018.firebaseapp.com',
    src: 'https://github.com/gigamesh/fireblog'
  },
  {
    title: 'Better Life Index',
    img:  '/img/thumbnails/OECD.jpg',
    text: 'Interactive D3 bar chart that displays various OECD statistics saved in CSV files. Fully mobile-responsive.',
    url: 'https://s3-us-west-1.amazonaws.com/oecd-better-life-index/index.html',
    src: 'https://github.com/gigamesh/OECD-Better-Life-Index'
  },
  {
    title: 'Valentine',
    img:  '/img/thumbnails/valentine.jpg',
    text: 'Mobile-responsive single-page app featuring sticky-scrolling, SVG & javascript animations, and extensive CSS transitions.',
    url: 'http://be-my-valentine.s3-website-us-west-1.amazonaws.com/'
  },
  {
    title: 'Gigamesh',
    img:  '/img/thumbnails/gigamesh.jpg',
    text: 'Website for my music alter-ego. Built using javascript & jquery. Fully mobile-responsive.',
    url: 'https://www.gigameshmusic.com'
  },
  {
    title: 'Samantha',
    img:  '/img/thumbnails/samantha.jpg',
    text: 'Adaptation of the famous Simon memory game from the 1980s. Made with javascript & jquery, and includes audio & CSS animations.',
    url: 'https://codepen.io/gigamesh/full/pVRmaR/'
  },
  {
    title: 'Calculator',
    img:  '/img/thumbnails/calculator.jpg',
    text: 'Calculator with scientific notation, built with javascript & jquery.',
    url: 'https://codepen.io/gigamesh/full/odggoW'
  },
]
export default portfolioItems