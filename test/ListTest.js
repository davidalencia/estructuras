var assert = require('assert');
var List = require('../src/List.js')


var l;
describe('List', function() {
  beforeEach(function() {
    l = new List();
  });
  describe('#size', function() {
    it("should be 0", function() {
      assert(l.size == 0);
    });
    it(`should be n (add)`, function() {
      for (var i = 0; i < 100; i++) {
        assert(l.size == i);
        l.add(i)
      }
    });

  });
});
