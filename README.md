# dependon
A node.js module for easily enforcing correct arguments

*dependon* is simply a wrapper of sorts in order to make checking arguments and throwing errors look cleaner.
*dpendon* takes advantage of higher order functions in order to check arguments. The node.js module, [functioner](https://www.npmjs.com/package/functioner) is recommended, but you are free to use whichever library you like best.

## Installation
```bash
$ npm install dependon
```

## Usage
```javascript
var dependon = require('dependon');
var being = require('functioner').assert;
```

```javascript
// without dependon
function sqrt(x) {
  if (typeof x !== 'number') {
    throw new Error('x should be a positive number');
  }
  if (x <= 0) {
    throw new Error('x should be a positive number');
  }

  return Math.sqrt(x);
}

// with dependon and functioner
function sqrt(x) {
  dependon(x, being.type('number'), being.positive,
      'x should be a positive number');

  return Math.sqrt(x);
}
```

*dependon* is really just a function that takes a value as its first parameter, as many functions as you want next, and lastly a string for the error message, and optionally an error type after the message.

```javascript
// using just dependon
dependon(x, function(x) {
  return x > 0;
}, 'x should be greater than 0', RangeError);
```

*functioner* makes dependon a lot more powerful with its ability to build functions to call on the value in order to assert it.

```javascript
// more complex usage of functioner
var f = require('functioner').assert;

dependon(x, f.type('string'), 'x should be a string');
dependon(x,
    f.compose(f.gte(3), f.accessor('length')),
    'x should be at least 3 in length');
dependon(x, f.between(3, 5), 'x should be between 3 and 5', RangeError);
```
