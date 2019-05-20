var assert = require('assert');
var List = require('../src/main.js').List;


var l;
describe('List', function() {

  beforeEach(function() {
    l = new List();
  });

  describe('#size', function() {
    it("should be 0", function() {
      assert(l.size == 0);
    });
    it(`should be n`, function() {
      for (var i = 0; i < 100; i++) {
        assert(l.size == i);
        l.add(i)
      }
      assert(l.size == 100);
      for (var i = 100; i >= 0; i--) {
        assert.equal(l.size, i);
        l.remove(i-1);
      }
    });
  });

  describe(`#contains`, function(){
    it(`is empty`, function(){
      for (var i = 100; i >= 0; i--) {
        assert(!l.contains(i));
      }
    });
    it(`does contains`, function(){
      for (var i = 100; i >= 0; i--) {
        l.add(i);
      }
      for (var i = 100; i >= 0; i--) {
        assert(l.contains(i));
      }
    });
  });

  describe(`#add`, function(){
    it(`just add`, function(){
      for (var i = 100; i >= 0; i--) {
        assert(!l.contains(i));
        l.add(i);
        assert(l.contains(i));
      }
    });
    it(`add and remove`, function(){
      for (var i = 0; i < 100; i++) {
        l.add(i);
        assert(l.contains(i));
        l.remove(i);
        assert(!l.contains(i));
      }
    });
  });

  describe(`#remove`, function(){
    it(`just remove`, function(){
      for (var i = 0; i < 100; i++)
        l.add(i);
      assert(l.size == 100);

      for (var i = 0; i < 100; i++){
        assert(l.contains(i));
        l.remove(i);
        assert(!l.contains(i));
        assert(l.size == (99-i));
      }
    });

    it(`more removes than necesary`, function(){
      assert(l.size == 0);
      l.add(1);
      assert(l.size == 1);
      l.remove(1);
      assert(l.size == 0);
      for (var i = 0; i < 100; i++)
        l.add(i);
      assert(l.size == 100);
      for (var i = 0; i < 200; i++)
        l.remove(i);
      assert(l.size == 0);
    });

    it(`add and remove`, function(){
      for (var i = 0; i < 100; i++){
        assert(!l.contains(i));
        l.add(i);
        assert(l.contains(i));
        l.remove(i);
        assert(!l.contains(i));
        l.add(i);
        assert(l.contains(i));
      }
    });
  });
});
