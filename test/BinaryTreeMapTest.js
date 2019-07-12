"use strict"

var assert = require('assert');
var Tree = require('../src/main.js').TreeMap;

var t;
describe(`BinaryTreeMap`, function(){

  beforeEach(function() {
    t = new Tree();
    t.add(0, "hi");
    t.add(1, "this");
    t.add(2, "is");
    t.add(3, "an");
    t.add(4, "awesome");
    t.add(5, "tree");
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
      //t.remove(0);

    });
  });

  describe(`test`, function(){
    it(`uno`, function(){
      // t = new Tree();
      // t.add(10, "hola");
      // t.add(11, "esto");
      // t.add(12, "es");
      // t.add(13, "una");
      // console.log(t._find({key:13}).element.value);
      // t.remove(13);
      // t.addArray([{key:1, value:"uno"}, {key:2, value:"dos"}]);
      // console.log(t.containsKey(3));
      // var t2 = t.clone();
      // t2.remove(1);
      // console.log("--------------------------------------------");
      // t2.forEach();
      // console.log("--------------------------------------------");
      // t.forEach();
    });
  });
});
