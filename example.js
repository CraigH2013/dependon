
// don't throw error
if (dependon(x, being.odd)) {

}

// throw error
dependon(x, being.odd, 'x should be odd');

// throw error with error type
dependon(x, being.odd, 'x should be odd', TypeError);

// check multiple properties
dependon(x, [being.odd, being.greaterThan(0)]);

// negate properties
dependon(x, not(being.type('string')),
  'x can not be a string');

// negate multiple properties
dependon(x, not(being.type('bool'), being.even));

// mixed negation
dependon(x, [not( being.type('string') ), being.even]);

// custom
dependon(x, function(x) {
  return x > 0;
}, 'x should be positive');
