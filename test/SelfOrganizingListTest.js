var assert = require('assert');
var List = require('../src/main.js').SelfOrganizingList;

var l;
describe(`#SelfOrganizingList`, function(){

  beforeEach(function() {
     l = new List();
  });

  describe(`#constructor`, function(){
    it(`should be empty`, function(){
      var alfa = 0;
      l.forEach(e=>alfa++);
      assert(0==alfa);
    });
    it(`should have 1, 2, 3`, function(){
      var arr = [1,2,3]
      l = new List(arr);
      var alfa = 0;
      l.forEach(e=>{
        assert(arr[alfa]==e)
        alfa++;
      });
      assert(alfa==arr.length)
    });
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

  describe(`#back`, function(){
    it(`adding elements`, function(){
      for (var i = 0; i < 100; i++) {
        l.add(i);
        assert.equal(l.back, i);
      }
    });
  });

  describe(`#front`, function(){
    it(`adding elements`, function(){
      l.add(-1)
      for (var i = 0; i < 100; i++) {
        l.add(i);
        assert.equal(l.front, -1);
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
    it(`remove head`, function(){
      for (var i = 0; i < 100; i++)
      l.add(i);
      assert(l.size == 100);

      for (var i = 0; i < 100; i++){
        assert(l.contains(i));
        l.remove(i);
        assert(!l.contains(i), `No deberia contener el ${i}`);
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
        assert(!l.contains(i), `No deberia contener el ${i}`);
        l.add(i);
        assert(l.contains(i));
      }
    });
  });

  describe(`#pop`, function(){
    it(`popping 100 elements`, function(){
      for(var alfa = 0; alfa<100; alfa++)
        l.add(alfa);
      for(var alfa = 100; alfa>0; alfa--)
        assert.equal(alfa-1, l.pop());
    });
    it(`empty list`, function(){
      assert.equal(l.pop(), null);
    });
  });

  describe(`#shift`, function(){
    it(`shifting 100 elements`, function(){
      for(var alfa = 0; alfa<100; alfa++)
        l.add(alfa);
      for(var alfa = 0; alfa<100; alfa++)
        assert.equal(alfa, l.shift());
    });
    it(`empty list`, function(){
      assert.equal(l.shift(), null);
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

  describe(`#contains`, function(){
    it(`is empty`, function(){
      for (var i = 100; i >= 0; i--) {
        assert(!l.contains(i));
      }
    });
    it(`do contains`, function(){
      for (var i = 100; i >= 0; i--) {
        l.add(i);
      }
      for (var i = 100; i >= 0; i--) {
        assert(l.contains(i));
      }
    });
  });

  describe(`#findOne`, function(){
    it(`simple test`, function(){
      var item = {
        x:1,
        y:3
      }
      l.add(item);
      assert.equal(l.findOne(e=>e.y==3), item);
    });
    it(`should return null`, function(){
      assert.equal(l.findOne(e=>e.y==3), null);
    });
  });

  describe(`#find`, function(){
    it(`simple test`, function(){
      var item = {
        x:1,
        y:3
      }
      l.add(item);
      assert.equal(l.find(e=>e.y==3)[0], item);
    });
    it(`should return []`, function(){
      var a = l.find(e=>e.y==3);
      assert(Array.isArray(a));
      assert.equal(a.length, [].length);
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
        assert.equal(l.get(i), i);
      for (var i = 100; i < 200; i++)
        assert(l.get(i)==null);

    });
  });

  describe(`#set`, function(){
    it(`setting out of bounds`, function(){
      l.set(1, "l");
      assert.equal(l.size, 0);
      assert(!l.contains("l"));
    });
    it(`setting at 0`, function(){
      l.set(0, "l");
      assert(!l.contains("l"));
      l.add("i");
      assert(l.contains("i"));
      l.set(0, "l");
      assert(l.contains("l"));
    });
    it(`setting at n`, function(){
      for(var alfa = 0; alfa<100; alfa++)
        l.add(alfa);
      for(var alfa = 0; alfa<100; alfa++){
        assert(!l.contains("l"));
        var i = Math.floor(Math.random()*(100-alfa));
        l.set(i, "l");
        assert.equal(l.getIndex("l"), i);
        l.remove("l");
      }
    });
  });

  describe(`#getIndex`, function(){
    it(`no elements`, function(){
      assert(l.getIndex(0)==-1);
      assert(l.getIndex(1)==-1);
    });
    it(`a few 100 elements`, function(){
      for (var i = 0; i < 100; i++)
        l.add(i);
      for (var i = 0; i < 100; i++)
        assert(l.getIndex(i)==i);
      for (var i = 100; i < 200; i++)
        assert(l.getIndex(i)==-1);
    });
  });

  describe(`#array`, function(){
    it(`100 elements array`, function(){
      let arr = []
      for (var i = 0; i < 100; i++){
        arr.push(i);
        l.add(i);
      }
      let listArr = l.toArray();
      for (var i = 0; i < 100; i++)
        assert(arr[i]==listArr[i]);
    });
  });

  describe(`#add`, function(){
    it(`add and forEach`, function(){
      for(var alfa=0; alfa<100;alfa++){
        l.add(alfa)
        var previous = -1;
        l.forEach(x=>{
          assert(previous<x);
          previous = x;
        });
      }
    });
  });

  describe(`#findOne`, function(){
    it(`just once`, function(){
      for(var alfa=0; alfa<100;alfa++)
        l.add(alfa)
      l.findOne(x=>x==40);
      assert(l.front==40);
    });
    it(`pair numbers to the front`, function(){
      for(var alfa=0; alfa<100;alfa++)
        l.add(alfa)
      for(var alfa=0; alfa<50;alfa++)
        l.findOne(e=>e==alfa*2)
      var beta = 0;
      l.forEach(e=>{
        if(beta<50)
          assert(e%2==0);
        else
          assert(e%2==1);
        beta++;
      });
    });
  });
});
