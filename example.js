
// don't throw error
if (dependon(x, being.odd)) {

}

// throw error
dependon(x, being.odd, 'x should be odd');

// throw error with error type
dependon(x, being.odd, 'x should be odd', TypeError);

// check multiple properties
dependon(x, being.odd, being.greaterThan(0));

// negate properties
dependon(x, not(being.type('string')),
  'x can not be a string');

// negate multiple properties
dependon(x, not(being.type('bool'), being.even));

// mixed negation
dependon(x, not( being.type('string') ), being.even);

// custom
dependon(x, function(x) {
  return x > 0;
}, 'x should be positive');



// being should be a library for creating functions to assert is something is
// a thing (being something)
//
// depeondon is just a wrapper that takes a varialbe, functions to use, and
// an error message to throw. It's for simplicity. What makes dependon powerful
// is the functions that you can use. Dependon by itself is stupidly simple
// and is just a 'syntax sugar' for throwing errors or making multiple checks


// arguments version
dependon(x, numeric, positive);

var functioner = require('functioner');

var contains6 = functioner.contains(6);

var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
