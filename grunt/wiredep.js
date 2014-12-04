module.exports = {
  target: {
    src: 'client/index.html',
    ignorePath: 'client/',
    bowerJson: require('../bower.json'),
    exclude: [/bootstrap.\js/]
  }
};
