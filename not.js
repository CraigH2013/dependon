var not = function(fn) {
  if (fn === undefined) {
    throw new Error('not function requires a parameter');
  }
  var functions = Array.from(arguments);
  return function(x) {
    if (functions.length > 1) {
      for (var i = 0; i < functions.length; i++) {
        if (functions[i](x)) {
          return false;
        }
      }
      return true;
    } else {
      return !fn(x);
    }
  };
};

module.exports = not;
