var Dependon = require('../dependon.js');

var dependon = Dependon.dependon;
var being = Dependon.being;

var assert = require('chai').assert;

describe('dependon', function() {
  it('should give expected results', function() {
    assert.throws(
      function() {
        dependon(7, being.even, 'value should be even');
      },
      Error
    );

    assert.doesNotThrow(
      function() {
        dependon(8, being.even, 'value should be even');
      },
      Error
    );

    assert.throws(
      function() {
        dependon(10, being.lte(5), 'value should not be greater than 5',
        RangeError);
      },
      RangeError
    );
  });

  it('should handle bad parameters', function() {
    assert.throws(
      function() {
        dependon(7);
      },
      Error
    );

    assert.throws(
      function() {
        dependon(7, 4);
      },
      Error
    );
  });

  it('should handle array of beings', function() {
    assert.throws(
      function() {
        dependon(3, [being.odd, being.gt(5)],
        'value should be odd and greater than 5 ',
        RangeError);
      },
      RangeError
    );
  });

  it('should handle no error message given', function() {
    assert.throws(
      function() {
        dependon(3, [being.odd, being.gt(5)]);
      },
      Error
    );
  });

  it('should give the correct error message', function() {
    try {
      dependon(1, being.type('string'), 'value should be a string');
    } catch (err) {
      assert.equal(err.message, 'value should be a string');
    }
  });
});
