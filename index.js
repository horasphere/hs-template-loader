var _ = require('lodash');

var escapedSharpRegExp = /\\#/g;
var sharpRegExp = /__SHARP__/g;

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var sourceEscapedSharp = source.replace(escapedSharpRegExp, "__SHARP__");

  var tpl = _.template(sourceEscapedSharp, null, {
    interpolate: /#=([\s\S]+?)#/g,
    evaluate: /#([\s\S]+?)#/g,
    escape: /#:([\s\S]+?)#/g
  }).toString();

  return 'module.exports = ' + tpl.replace(sharpRegExp, "#")
};