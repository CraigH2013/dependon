var being = require('../dependon.js').being;

var assert = require('chai').assert;

describe('being', function() {

  describe('greaterThan', function() {
    it('should give expected resutls', function() {

      assert.equal(being.gt(0)(5), true);
      assert.equal(being.gt(0)(-1), false);
      assert.equal(being.gt(0)(0), false);
      assert.equal(being.gt(0)('abc'), false);
      assert.equal(being.gt(0)(1.1), true);
    });
  });

  describe('greaterThanOrEqualTo', function() {
    it('should give expected resutls', function() {

      assert.equal(being.gte(0)(5), true);
      assert.equal(being.gte(0)(-1), false);
      assert.equal(being.gte(0)(0), true);
      assert.equal(being.gte(0)('abc'), false);
      assert.equal(being.gte(0)(1.1), true);
    });
  });

  describe('lessThan', function() {
    it('should give expected resutls', function() {

      assert.equal(being.lt(0)(5), false);
      assert.equal(being.lt(0)(-1), true);
      assert.equal(being.lt(0)(0), false);
      assert.equal(being.lt(0)('abc'), false);
      assert.equal(being.lt(0)(1.1), false);
    });
  });

  describe('lessThanOrEqualTo', function() {
    it('should give expected resutls', function() {

      assert.equal(being.lte(0)(5), false);
      assert.equal(being.lte(0)(-1), true);
      assert.equal(being.lte(0)(0), true);
      assert.equal(being.lte(0)('abc'), false);
      assert.equal(being.lte(0)(1.1), false);
    });
  });

  describe('equalTo', function() {
    it('should give expected resutls', function() {

      assert.equal(being.eq(0)(0), true);
      assert.equal(being.eq(1.23456)(1.23456), true);
      assert.equal(being.eq({})({}), false);
      assert.equal(being.eq('abc')('abc'), true);
      assert.equal(being.eq(1)(2), false);
    });
  });

  describe('notEqualTo', function() {
    it('should give expected resutls', function() {

      assert.equal(being.neq(0)(0), false);
      assert.equal(being.neq(1)(2), true);
      assert.equal(being.neq(1.23456)(1.23456), false);
      assert.equal(being.neq({})({}), true);
      assert.equal(being.neq('abc')('abc'), false);

    });
  });

  describe('defined', function() {
    it('should give expected resutls', function() {

      assert.equal(being.defined(0), true);
      assert.equal(being.defined(''), true);
      assert.equal(being.defined(undefined), false);
      assert.equal(being.defined(null), true);
      assert.equal(being.defined(false), true);
    });
  });

  describe('null', function() {
    it('should give expected resutls', function() {

      assert.equal(being.null(0), false);
      assert.equal(being.null(''), false);
      assert.equal(being.null(undefined), false);
      assert.equal(being.null(null), true);
      assert.equal(being.null(false), false);
    });
  });

  describe('valid', function() {
    it('should give expected resutls', function() {

      assert.equal(being.valid(0), true);
      assert.equal(being.valid(''), false);
      assert.equal(being.valid(undefined), false);
      assert.equal(being.valid(null), false);
      assert.equal(being.valid(false), true);
    });
  });

  describe('empty', function() {
    it('should give expected resutls', function() {

      assert.equal(being.empty(0), false);
      assert.equal(being.empty(''), true);
      assert.equal(being.empty([]), true);
      assert.equal(being.empty(null), false);
      assert.equal(being.empty(false), false);
    });
  });

  describe('odd', function() {
    it('should give expected resutls', function() {

      assert.equal(being.odd(1), true);
      assert.equal(being.odd(3), true);
      assert.equal(being.odd(1.234), false);
      assert.equal(being.odd(0), false);
      assert.equal(being.odd(''), false);
      assert.equal(being.odd([]), false);
      assert.equal(being.odd(null), false);
      assert.equal(being.odd(false), false);
    });
  });

  describe('even', function() {
    it('should give expected resutls', function() {

      assert.equal(being.even(2), true);
      assert.equal(being.even('4'), true);
      assert.equal(being.even(1), false);
      assert.equal(being.even(3), false);
      assert.equal(being.even(1.234), false);
      assert.equal(being.even(0), true);
      assert.equal(being.even(''), true);
      assert.equal(being.even([]), true);
      assert.equal(being.even(null), true);
      assert.equal(being.even(false), true);
    });
  });

  describe('positive', function() {
    it('should give expected resutls', function() {

      assert.equal(being.positive(0), true);
      assert.equal(being.positive(1), true);
      assert.equal(being.positive(-1), false);
      assert.equal(being.positive({}), false);
    });
  });

  describe('negative', function() {
    it('should give expected resutls', function() {

      assert.equal(being.negative(0), false);
      assert.equal(being.negative(1), false);
      assert.equal(being.negative(-1), true);
      assert.equal(being.negative({}), false);
    });
  });

  describe('type', function() {
    describe('bool', function() {
      it('should give expected results', function() {
        // boolean function
        var bool = being.type('bool');

        assert.equal(bool(true), true);
        assert.equal(bool(false), true);
        assert.equal(bool(0), false);
        assert.equal(bool(1), false);
      });
    });

    describe('string', function() {
      it('should give expected results', function() {
        // string function
        var string = being.type('string');

        assert.equal(string('abc'), true);
        assert.equal(string(12), false);
      });
    });

    describe('number', function() {
      it('should give expected results', function() {
        // number function
        var number = being.type('number');

        assert.equal(number(12), true);
        assert.equal(number(12.5), true);
        assert.equal(number(1/0), true);
        assert.equal(number('abc'), false);
        assert.equal(number(true), false);
        assert.equal(number('12'), false);
      });
    });

    describe('integer', function() {
      it('should give expected results', function() {
        // integer function
        var integer = being.type('integer');

        assert.equal(integer(1), true);
        assert.equal(integer(1.0), true);
        assert.equal(integer(1.23), false);
        assert.equal(integer('1'), false);
      });
    });

    describe('float', function() {
      it('should give expected results', function() {
        // float function
        var float = being.type('float');

        assert.equal(float(1), false);
        assert.equal(float(1.0), false);
        assert.equal(float(1.23), true);
        assert.equal(float('1'), false);
      });
    });

    describe('finite', function() {
      it('should give expected results', function() {
        // finite function
        var finite = being.type('finite');

        assert.equal(finite(1), true);
        assert.equal(finite(1/0), false);
        assert.equal(finite(Infinity), false);
      });
    });

    describe('infinite', function() {
      it('should give expected results', function() {
        // infinite function
        var infinite = being.type('infinite');

        assert.equal(infinite(1), false);
        assert.equal(infinite(1.234567890), false);
        assert.equal(infinite(1/0), true);
        assert.equal(infinite(Infinity), true);
      });
    });

    describe('object', function() {
      it('should give expected results', function() {
        // object function
        var object = being.type('object');

        assert.equal(object({}), true);
        assert.equal(object(1.2345), false);
        assert.equal(object([1, 2, 3]), true);
      });
    });

    describe('array', function() {
      it('should give expected results', function() {
        // array function
        var array = being.type('array');

        assert.equal(array({}), false);
        assert.equal(array(1.2345), false);
        assert.equal(array([1, 2, 3]), true);
      });
    });

    describe('function', function() {
      it('should give expected results', function() {
        // function function
        var fun = being.type('function');

        assert.equal(fun(function () {}), true);
        var myFun = function() {};
        assert.equal(fun(myFun), true);
        assert.equal(fun({}), false);
        assert.equal(fun(1.2345), false);
        assert.equal(fun([1, 2, 3]), false);
      });
    });

    describe('error', function() {
      it('should give expected results', function() {
        // error function
        var error = being.type('error');

        assert.equal(error(new Error('hey')), true);
        assert.equal(error(Error), false);
        assert.equal(error({}), false);
        assert.equal(error(1.2345), false);
        assert.equal(error([1, 2, 3]), false);
      });
    });

    describe('matrix', function() {
      it('should give expected results', function() {
        // matrix function
        var matrix = being.type('matrix');

        assert.equal(matrix([[1], [2], [3]]), true);
        assert.equal(matrix([1, 2, 3]), false);
        assert.equal(matrix([[1, 2, 3], [2], [3]]), false);
        assert.equal(matrix(1), false);
        assert.equal(matrix('abc'), false);
      });
    });

    describe('alphanumeric', function() {
      it('should give expected results', function() {
        // alphanumeric function
        var alphanumeric = being.type('alphanumeric');

        assert.equal(alphanumeric('Abc123'), true);
        assert.equal(alphanumeric('Abc'), true);
        assert.equal(alphanumeric('123'), true);
        assert.equal(alphanumeric('Abc.'), false);
        assert.equal(alphanumeric('a-b-c'), false);
        assert.equal(alphanumeric(123), true);
      });
    });

    describe('alphabetic', function() {
      it('should give expected results', function() {
        // alphabetic function
        var alphabetic = being.type('alphabetic');

        assert.equal(alphabetic('Abc123'), false);
        assert.equal(alphabetic('Abc'), true);
        assert.equal(alphabetic('123'), false);
        assert.equal(alphabetic('Abc.'), false);
        assert.equal(alphabetic('a-b-c'), false);
        assert.equal(alphabetic(123), false);
      });
    });

    describe('numeric', function() {
      it('should give expected results', function() {
        // numeric function
        var numeric = being.type('numeric');

        assert.equal(numeric('Abc123'), false);
        assert.equal(numeric('Abc'), false);
        assert.equal(numeric('123'), true);
        assert.equal(numeric('Abc.'), false);
        assert.equal(numeric('a-b-c'), false);
        assert.equal(numeric(123), true);
        assert.equal(numeric(123.456), true);
        assert.equal(numeric('123.456'), true);
      });
    });

  });
});
