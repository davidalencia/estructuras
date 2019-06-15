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

  describe(`#size`, function(){
    it(`should be 0`, function(){
      t = new Tree();
      assert.equal(t.size, 0);
    });
    it(`should be 7`, function(){
      assert.equal(t.size, 7);
    });
    it(`should be n (adding and removing)`, function(){
      t = new Tree();
      for(var alfa=0; alfa<100;alfa++){
        for(var beta=0; beta<alfa;beta++){
          t.add(beta);
          assert.equal(t.size, beta+1);
        }
        for(var beta=0; beta<alfa;beta++){
          t.remove(beta);
          assert.equal(t.size, alfa-beta-1);
        }
        assert.equal(t.size,  0);
      }
    });
    it(`should be n constructor`, function(){
      var arr = [];
      for(var alfa=1; alfa<100;alfa++){
        arr.push(alfa);
        t = new Tree(arr);
        assert.equal(t.size, alfa);
      }

    });
  });

  describe(`#add`, function(){
    it(`size increase`, function(){
      var ant = t.size;
      for(var alfa=0; alfa<100;alfa++){
        t.add(alfa);
        assert.equal(t.size, ant+1);
        ant = t.size;
      }
    });
    it(`still is binary tree`, function(){
      for(var alfa=0; alfa<100;alfa++){
        t.add(alfa);
        stillTree(t.root);
      }
    });
    it(`did added the element`, function(){
      t = new Tree();
      for(var alfa=0; alfa<100;alfa++){
        t.add(alfa);
        var added = false;
        t.forEach(e=>{
          added = (e==alfa)? true: false;
        })
        assert(added);
      }
    });
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
        stillTree(t.root);
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

  describe(`#bfs`, function(){
    it(`bfs`, function(){
      var bfs = [20, 10, 30, 5, 15, 25, 35];
      var alfa = 0;
      t.bfs(e=>{
        assert.equal(e, bfs[alfa++]);
      });
    });
  });

  describe(`#isEmpty`, function(){
    it(`at start`, function(){
      t = new Tree();
      assert(t.isEmpty());
    });
    it(`has one element`, function(){
      t = new Tree();
      assert(t.isEmpty())
      t.add(1);
      assert(!t.isEmpty())
    });
    it(`adding and removing`, function(){
      t= new Tree();
      for(var alfa=0; alfa<100;alfa++){
        for(var beta=0; beta<alfa;beta++)
          t.add(beta);
        for(var beta=0; beta<alfa;beta++)
          t.remove(beta);
        assert(t.isEmpty())
        assert.equal(t.size,  0);
      }
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

  describe(`#rotateLeft`, function(){
    describe(`one element`, function(){
      it(`is alone`, function(){
        t = new Tree();
        t.add(0);
        r = t.root
        t.rotateLeft();
        assert(t.root, r);
        assert.equal(r.father, null);
        assert.equal(r.right, null);
        assert.equal(r.left, null);
      });
      it(`is the wrong son`, function(){
        t = new Tree();
        t.add(0);
        t.add(-1);
        var r = t.root;
        t.rotateLeft(r);
        assert.equal(r.father, null);
        assert.equal(r.right, null);
        stillTree(r)
      });
    });
    describe(`two elements`, function(){
      it(`root and right`, function(){
        t = new Tree();
        t.add(0);
        t.add(1);
        var r = t.root;
        assert.equal(r.element, 0);
        t.rotateLeft(r);
        r = t.root;
        assert.equal(r.element, 1);
        assert.equal(r.father, null)
        assert(r.left != null);
        assert.equal(r.left.element, 0);
        assert.equal(r.left.father, r);
        stillTree(r);
      });
      it(`root and left`, function(){
        t = new Tree();
        t.add(1);
        t.add(0);
        var r = t.root;
        assert.equal(r.element, 1);
        t.rotateLeft(r);
        r = t.root;
        assert.equal(r.element, 1);
        assert(r.left != null);
        assert.equal(r.left.element, 0);
      });
      it(`n`, function(){
        t = new Tree();
        t.add(0);
        var r = t.root;
        for(var alfa=1; alfa<100;alfa++){
          stillTree(r);
          t.add(alfa);
          t.rotateLeft(r);
          r = r.father;
          assert.equal(r, t.root);
        }
      });
    });
    describe(`three elements`, function(){
      it(`n is root and has two sons`, function(){
        t = new Tree();
        t.add(0);
        t.add(1);
        t.add(-1);
        var r = t.root;
        t.rotateLeft(r);
        assert.equal(r.right, null);
        r = r.father;
        stillTree(r);
        assert.equal(r.right, null);
      });
      it(`n has right, and right has left`, function(){
        t =  new Tree();
        t.add(0);
        t.add(10);
        t.add(5);
        var r = t.root;
        t.rotateLeft(r);
        assert.equal(r.father, t.root);
        stillTree(t.root);
      });
    });
  });

  describe(`#rotateRight`, function(){
    describe(`one element`, function(){
      it(`is alone`, function(){
        t = new Tree();
        t.add(0);
        r = t.root
        t.rotateRight();
        assert(t.root, r);
        assert.equal(r.father, null);
        assert.equal(r.right, null);
        assert.equal(r.left, null);
      });
      it(`is the wrong son`, function(){
        t = new Tree();
        t.add(0);
        t.add(1);
        var r = t.root;
        t.rotateRight(r);
        assert.equal(r.father, null);
        assert.equal(r.left, null);
        stillTree(r)
      });
    });
    describe(`two elements`, function(){
      it(`root and left`, function(){
        t = new Tree();
        t.add(1);
        t.add(0);
        var r = t.root;
        assert.equal(r.element, 1);
        t.rotateRight(r);
        r = t.root;
        assert.equal(r.element, 0);
        assert.equal(r.father, null)
        assert(r.right != null);
        assert.equal(r.right.element, 1);
        assert.equal(r.right.father, r);
        stillTree(r);
      });
      it(`root and right`, function(){
        t = new Tree();
        t.add(0);
        t.add(1);
        var r = t.root;
        assert.equal(r.element, 0);
        t.rotateRight(r);
        r = t.root;
        assert.equal(r.element, 0);
        assert(r.right != null);
        assert.equal(r.right.element, 1);
      });
      it(`n`, function(){
        t = new Tree();
        t.add(101);
        var r = t.root;
        for(var alfa=100; alfa>0;alfa--){
          stillTree(r);
          t.add(alfa);
          t.rotateRight(r);
          r = r.father;
          assert.equal(r, t.root);
        }
      });
    });
    describe(`three elements`, function(){
      it(`n is root and has two sons`, function(){
        t = new Tree();
        t.add(0);
        t.add(1);
        t.add(-1);
        var r = t.root;
        t.rotateRight(r);
        assert.equal(r.left, null);
        r = r.father;
        stillTree(r);
        assert.equal(r.left, null);
      });
      it(`n has left, and left has left`, function(){
        t =  new Tree();
        t.add(10);
        t.add(0);
        t.add(5);
        var r = t.root;
        t.rotateRight(r);
        assert.equal(r.father, t.root);
        stillTree(t.root);
      });
    });
  });
});

function stillTree(n) {
  if(n==null)
    return;
  if(n.left==null && n.right==null)
    return;
  if(n.left!=null){
    assert(n.left.element<n.element);
    stillTree(n.left);
  }
  if(n.right!=null){
    assert(n.right.element>n.element);
    stillTree(n.right);
  }
}
