var Dependon = require('../dependon.js');

var dependon = Dependon.dependon;
var being = Dependon.being;
var not = Dependon.not;

var assert = require('chai').assert;

describe('not', function() {
  it('should give expected results', function() {
    assert.throws(
      function() {
        dependon(8, not(being.even), 'value should not be even');
      },
      Error
    );

    assert.throws(
      function() {
        dependon(new Error('error'), not(being.type('error')),
        'value should not be an error');
      },
      Error
    );

    assert.throws(
      function() {
        dependon(true, not(being.type('bool')),
        'value should not be a boolean');
      },
      Error
    );
  });

  it('should handle multiple values', function() {
    assert.throws(
      function() {
        dependon(12, not(being.even, being.gt(10)),
        'value should not be an error');
      },
      Error
    );
  });
});
