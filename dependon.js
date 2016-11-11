'use strict';

var dependon = function(value, fn0) {

  if (value === undefined || fn0 === undefined) {
    throw new Error('dependon requires a value and at least one function');
  }

  var args = Array.from(arguments);
  var last = args.length - 1;

  // index of last function to check with
  // set to last by default
  var indexOfLast = last;

  // default error message to throw
  var errorMessage = 'value is of incorrect type';

  // default error type to throw
  var errorType = Error;

  if (typeof args[last] === 'function') {
    if (new args[last]() instanceof Error) {
      // make sure second to last arg is a string
      if (typeof args[last - 1] !== 'string') {
        throw new Error('dependon requires error message before error type');
      }
      // set index of last checking function
      indexOfLast = last - 2;
      // set the error message
      errorMessage = args[last - 1];
      // set the error type
      errorType = args[last];
    }
  } else {
    // make sure that it is a string
    if (typeof args[last] !== 'string') {
      throw new Error('dependon expected arguments['+last+'] to be either a' +
        ' string or a function');
    }
    // set index of last checking function
    indexOfLast = last - 1;
    // set error message
    errorMessage = args[last];
  }

  // collect functions
  var checks = [];

  for (let i = 1; i <= indexOfLast; i++) {
    if (typeof args[i] !== 'function') {
      throw new Error(`dependon expected arguments[${i}] to be a function`);
    }
    checks.push(args[i]);
  }

  // check value against each given function
  checks.forEach(check => {
    if (check(value) === false) {
      throw new errorType(errorMessage);
    }
  });
};
