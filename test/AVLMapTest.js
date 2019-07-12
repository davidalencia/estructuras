"use strict"

var assert = require('assert');
var Tree = require('../src/main.js').AVLMap;

var t;
var  lorem  = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");

describe(`BinaryTreeMap`, function(){

  beforeEach(function() {
    t = new Tree();
    for(var alfa=0; alfa<lorem.length;alfa++)
      t.add(alfa, lorem[alfa]);
  });

  describe(`#add`, function(){
    it(`add 100 elements`, function(){
      t = new Tree();
      assert(t.isEmpty());
      for(var alfa=0; alfa<100;alfa++){
        t.add(alfa, `${alfa*3}`);
        assert(t.size, alfa);
        assert(t.contains(alfa));
        assert(t.get(alfa), alfa*3);
      }
    });
  });

  describe(`#addArray`, function(){
    it(`100 arrays`, function(){
      var t = new Tree();
      var arr = [];
      for(var alfa=0; alfa<100;alfa++){
        t.clear();
        arr.push({key:alfa, value:alfa*3});
        t.addArray(arr);
        for(var beta=0; beta<arr.length;beta++){
          assert(t.contains(arr[beta].key));
          assert.equal(t.get(arr[beta].key), arr[beta].value);
        }
      }
    });
  });

  describe(`#remove`, function(){
    it(`once`, function(){
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
    });
    it(`removing two times the same element`, function(){
      var size = t.size;
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
      assert.equal(t.size, size-1);
    });
    it(`removing all elements`, function(){
      var size = t.size;
      for(var alfa=0; alfa<69;alfa++){
        assert(t.contains(alfa));
        t.remove(alfa);
        assert(!t.contains(alfa));
        size--;
        assert.equal(t.size, size);
      }
    });
  });

  describe(`#get`, function(){
    it(`getting all elements`, function(){
      for(var alfa=0; alfa<lorem.length;alfa++)
        assert.equal(t.get(alfa), lorem[alfa]);
    });
  });

  describe(`#contains`, function(){
    it(`has key`, function(){
      for(var alfa=0; alfa<lorem.length;alfa++)
        assert(t.contains(alfa));
    });
    it(`doesn't has key`, function(){
      assert(!t.contains(lorem.length));
    });
    it(`adding and removing`, function(){
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
      t.add(0, "added");
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
    });
  });

  describe(`containsKey`, function(){
    it(`has key`, function(){
      for(var alfa=0; alfa<lorem.length;alfa++)
        assert(t.contains(alfa));
    });
    it(`doesn't has key`, function(){
      assert(!t.contains(lorem.length));
    });
    it(`adding and removing`, function(){
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
      t.add(0, "added");
      assert(t.contains(0));
      t.remove(0);
      assert(!t.contains(0));
    });
  });

  describe(`#containsValue`, function(){
    it(`checking lorem ipsum`, function(){
      for(var alfa=0; alfa<lorem.length;alfa++)
        assert(t.containsValue(lorem[alfa]));
    });
    it(`checking a value that is not there`, function(){
      assert(!t.containsValue("cadena que no esta"));
    });
    it(`adding and removing`, function(){
      assert(t.containsValue("Lorem"));
      t.remove(0);
      assert(!t.containsValue("Lorem"));
      t.add(0, "Lorem");
      assert(t.containsValue("Lorem"));
      t.remove(0);
      assert(!t.containsValue("Lorem"));
    });
  });

  describe(`#clone`, function(){
    it(`cloning and removing`, function(){
      var t2 =t.clone();
      t.remove(0);
      assert(t2.contains(0));
    });
  });
});
