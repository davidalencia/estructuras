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
