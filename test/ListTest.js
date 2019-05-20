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

  describe(`#isEmpty`, function(){
    it(`is obviously empty`, function(){
      assert(l.isEmpty());
    });
    it(`is obviously not empty`, function(){
      for (var i = 0; i < 100; i++){
        l.add(i);
        assert(!l.isEmpty());
      }
    });
  });

  describe(`#forEach`, function(){
    it(`lorem`, function(){
      let lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed"+
        " do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim"+
        " ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut "+
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"+
        " in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
      for (char of lorem)
        l.add(char);
      let s = "";
      l.forEach((e)=>{
        s += e;
      })
      assert(lorem==s);
    });

    it(`number`, function(){
      for (var i = 0; i < 100; i++)
        l.add(i);
      let theOneBefore = -1;
      let n = 0;
      l.forEach((e)=>{
        assert(e>theOneBefore);
        theOneBefore = e;
        n += e;
      });
      assert(n==4950);
    });
  });

  describe(`#get`, function(){
    it(`no elements`, function(){
      assert(l.get(0)==null);
      assert(l.get(1)==null);
    });
    it(`a few 100 elements`, function(){
      for (var i = 0; i < 100; i++)
        l.add(i);
      for (var i = 0; i < 100; i++)
        assert.ok(l.get(i), i);
      for (var i = 100; i < 1200; i++)
        assert(l.get(i)==null);

    });
  });
});
