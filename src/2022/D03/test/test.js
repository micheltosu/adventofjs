const { toPriority } = require('../task1')
const assert  = require('assert');

describe('Test day 3', function() {
  it('should return 1 as value for "a"', function() {
    const actual = toPriority('a');
    assert.equal(actual, 1);
  });

  it('should return 27 as value for "A"', function() {
    const actual = toPriority('A');
    assert.equal(actual, 27);
  });


})