var assert = require('assert');
var Tree = require('../src/main.js').BinaryTree;

let t;
describe(`BinaryTree`, function(){

  beforeEach(function() {
    var nodos = [20, 10, 5, 15, 30, 25, 35];
    t = new Tree(nodos);
  });

  describe(`#constructor`, function(){
    it(`no comparator`, function(){
      t = new Tree();
    });
    it(`with comparator`, function(){
      t = new Tree([], (a,b)=>a<b);
      var nodos = [20, 10, 5, 15, 30, 25, 35];
      for (n of nodos)
        t.add(n);
      var alfa = 0;
      var bfs = [20, 30, 10, 35, 25, 15, 5];
      t.bfs(e=>{
        assert.equal(e, bfs[alfa])
        alfa++;
      });
      assert.equal(alfa, nodos.length);
    });
    it(`with array`, function(){
      t = new Tree([20, 10, 5, 15, 30, 25, 35]);
      var bfs = [20, 10, 30, 5, 15, 25, 35];
      var alfa = 0;
      t.bfs(e=>{
        assert.equal(e, bfs[alfa++]);
      });
    });
  });

  describe(`#add`, function(){

  });

  describe(`#remove`, function(){
    it(`is Leaf`, function(){
      var leafs = [5, 15, 25, 35];
      var size = t.size;
      for (leaf of leafs) {
        assert(t.contains(leaf));
        t.remove(leaf);
        assert(!t.contains(leaf));
        assert.equal(size-1,  t.size);
        size--;
      }
    });
    it(`isn't leaf nethier root`, function(){
      var nodos = [10, 30];
      var size = t.size;
      for (n of nodos) {
        assert(t.contains(n));
        t.remove(n);
        assert(!t.contains(n));
        assert.equal(size-1,  t.size);
        size--;
        var alfa = 0
        t.forEach(e=>{
          alfa++
        });
        assert.equal(t.size, alfa);
      }
    });
    it(`is root`, function(){
      t.remove(20);
      var alfa = 0
      t.forEach(e=>{
        alfa++
      });
      assert.equal(t.size, alfa);
    });
    it(`remove a all elements`, function(){
      var nodos = [20, 10, 5, 15, 30, 25, 35];
      var size = t.size;
      for (n of nodos) {
        assert(t.contains(n));
        t.remove(n);
        assert(!t.contains(n));
        assert.equal(size-1,  t.size);
        size--;
        var alfa = 0
        t.forEach(e=>{
          alfa++
        });
        assert.equal(t.size, alfa);
      }
    });
  });

  describe(`#contains`, function(){
    it(`checking it does contains with the constructor`, function(){
      var nodos = [20, 10, 5, 15, 30, 25, 35];
      for(n of nodos)
        assert(t.contains(n));
    });
    it(`doesn't contains`, function(){
      for(var alfa=50; alfa<100;alfa++)
        assert(!t.contains(alfa));
    });
  });

  describe(`#bfs`, function(){
    it(`bfs`, function(){
      var bfs = [20, 10, 30, 5, 15, 25, 35];
      var alfa = 0;
      t.bfs(e=>{
        assert.equal(e, bfs[alfa++]);
      });
    });
  });

  describe(`#dfs`, function(){
    it(`preorder`, function(){
      var pre = [20, 10, 5, 15, 30, 25, 35];
      var alfa = 0;
      t.dfs('pre', e=>{
        assert.equal(e, pre[alfa++]);
      });
    });
    it(`inorder`, function(){
      var ino = [5, 10, 15, 20, 25, 30, 35];
      var alfa = 0;
      t.dfs('in', e=>{
        assert.equal(e, ino[alfa++]);
      });
      alfa = 0;
    });
    it(`postorder`, function(){
      var post = [5, 15, 10, 25, 35, 30, 20];
      var alfa = 0;
      t.dfs('post', e=>{
        assert.equal(e, post[alfa++]);
      });
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
    it(`all elements`, function(){
      var nodos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      t = new Tree(nodos);
      var alfa = 0;
      t.forEach(e=>{
        assert.equal(e, nodos[e])
        nodos[e]= -1;
      });
    });
  });

  describe(`#toArray`, function(){
    it(`its ordered`, function(){
      var arr = [];
      for(var alfa=0; alfa<100;alfa++)
        arr.push(Math.floor(Math.random()*100));
      t = new Tree(arr);
      arr = t.toArray();
      for(var alfa=1; alfa<100;alfa++)
        assert(arr[alfa-1]<=arr[alfa]);
    });
    it(`same length`, function(){
      var arr = t.toArray();
      assert.equal(arr.length, t.size);
    });
  });
});
