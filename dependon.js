'use strict';

var being = {
  type: function(t) {
    return function(x) {
      switch (t) {
        case 'boolean':
        case 'bool':
          return typeof x === 'boolean';
        case 'string':
          return typeof x === 'string';
        case 'number':
          return typeof x === 'number';
        case 'whole':
          return x % 1 === 0;
        case 'integer':
        case 'int':
          return Number.isInteger(x);
        case 'float':
        case 'decimal':
          if (typeof x === 'number')
            return !Number.isInteger(x);
          else
            return false;
          break;
        case 'finite':
          return isFinite(x);
        case 'infinity':
        case 'infinite':
          return !isFinite(x);
        case 'object':
        case 'obj':
          return typeof x === 'object';
        case 'array':
          return Array.isArray(x);
        case 'function':
          return typeof x === 'function';
        case 'error':
          return x instanceof Error;
        case 'matrix':
          if (Array.isArray(x)) {
            var len = 0;
            for (let i = 0; i < x.length; i++) {
              if (i === 0) {
                len = x[i].length;
                continue;
              }
              if (x[i].length !== len || !Array.isArray(x[i])) {
                return false;
              }
            }

            return true;
          } else {
            return false;
          }
          break;
        case 'alphanumeric':
          return /^[A-Za-z0-9]+$/.test(x);
        case 'alphabetic':
          return /^[A-za-z]+$/.test(x);
        case 'numeric':
          return !isNaN(x);

        default:
          return false;
      }
    };
  },
  greaterThan: function(val) {
    return function(x) {
      return x > val;
    };
  },
  gt: function(val) {
    return this.greaterThan(val);
  },
  greaterThanOrEqualTo: function(val) {
    return function(x) {
      return x >= val;
    };
  },
  gte: function(val) {
    return this.greaterThanOrEqualTo(val);
  },
  lessThan: function(val) {
    return function(x) {
      return x < val;
    };
  },
  lt: function(val) {
    return this.lessThan(val);
  },
  lessThanOrEqualTo(val) {
    return function(x) {
      return x <= val;
    };
  },
  lte: function(val) {
    return this.lessThanOrEqualTo(val);
  },
  equalTo: function(val) {
    return function(x) {
      return x === val;
    };
  },
  eq: function(val) {
    return this.equalTo(val);
  },
  notEqualTo: function(val) {
    return function(x) {
      return x !== val;
    };
  },
  neq: function(val) {
    return this.notEqualTo(val);
  },
  defined: function(val) {
    return val !== undefined;
  },
  null: function(val) {
    return val === null;
  },
  valid: function(val) {
    return val !== undefined && val !== null && val !== '';
  },
  empty: function(val) {
    if (Array.isArray(val)) {
      return val.length === 0 ? true : false;
    } else if (typeof val === 'string') {
      return val === '' ? true : false;
    }

    return false;
  },
  even: function(val) {
    if (!being.type('numeric')(val)) {
      return false;
    }
    if (val % 1 !== 0) {
      return false;
    }
    return val % 2 === 0;
  },
  odd: function(val) {
    if (!being.type('numeric')(val)) {
      return false;
    }
    if (val % 1 !== 0) {
      return false;
    }
    return val % 2 !== 0;
  },
  positive: function(val) {
    return val >= 0;
  },
  negative: function(val) {
    return val < 0;
  }
};

function not(fn) {
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
}

function dependon(val, expect, err, errType) {
  if (val === undefined) {
    throw new Error('DependonError: value must be defined');
  }
  if (expect === undefined) {
    throw new Error('DependonError: expect must be a defined function');
  }

  errType = errType === undefined ? Error : errType;

  if (!(new errType() instanceof Error)) {
    throw new Error('DependonError: error type must be instance of Error');
  }

  if (typeof expect === 'function') {
    if (!expect(val)) {
      throw new errType(err);
    }
  } else if (Array.isArray(expect)) {
    expect.forEach(function(exp) {
      if (typeof exp === 'function') {
        if (!exp(val)) {
          throw new errType(err);
        }
      } else {
        throw new Error('DependonError: expected an array of functions only');
      }
    });
  } else {
    if (val != expect) {
      throw new errType(err);
    }
  }
}

module.exports = {
  being: being,
  not: not,
  dependon: dependon
};
