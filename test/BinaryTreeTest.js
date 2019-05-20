var assert = require('assert');
var Tree = require('../src/main.js').BinaryTree;

let t;
describe(`BinaryTree`, function(){

  beforeEach(function() {
    t = new Tree();
  });

  describe(`#constructor`, function(){
    it(`no comparator`, function(){
      t = new Tree();
    });

    it(`with comparator`, function(){
      t = new Tree((a,b)=>a<b);
    });
  });

  describe(`#add`, function(){
    it(``, function(){

    });
  });

  describe(`#forEach`, function(){
    it(`no order given`, function(){
      for (var i = 0; i < 100; i++)
        t.add(Math.random());
      let lastOne = -1;
      t.forEach((e)=>{
        assert(e>lastOne);
        e=lastOne;
      });
    });
  });

});
