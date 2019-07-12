var assert = require('assert');
var Tree = require('../src/main.js').AVLTree;

let t;
describe(`AVLTree`, function(){

  beforeEach(function() {
    t = new Tree([20, 10, 5, 15, 30, 25, 35]);
  });

  describe(`key-value`, function(){
    t = new Tree([], (a, b)=> a.key==b.key? 0: a.key>b.key? 1: -1);
    t.add({key:0, value:"valor0"});
    t.add({key:1, value:"valor1"});
    
  });

  describe(`#constructor`, function(){
    it(`should be balance`, function(){
      assert.equal(t.size, 7);
      assert(isBalance(t.root));
    });
    it(`should be 0`, function(){
      t = new Tree([1]);
      assert.equal(balance(t.lastAdded), 0);
    });
    it(`lastAdded should be null`, function(){
      t = new Tree();
      assert.equal(t.lastAdded, null);
    });
  });

  describe(`#add`, function(){
    it(`does add`, function(){
      for(var alfa=0; alfa<100;alfa++){
        var newElement = Math.random();
        t.add(newElement);
        var isThere = false;
        t.forEach(e=>{
          if(e==newElement)
            isThere = true;
        });
        assert(isThere);
      }
    });
    it(`is balanced`, function(){
      for(var alfa=0; alfa<100;alfa++){
        t.add(Math.random());
        assert(isBalance(t.lastAdded));
        assert(isBalance(t.lastAdded.father));
        assert(isBalance(t.root));
      }
    });
    it(`height is right`, function(){
      for(var alfa=0; alfa<100;alfa++){
        t.add(Math.random());
        assert(checkHeight(t.root));
      }
    });
  });

  describe(`#remove`, function(){
    it(`removes a element`, function(){
      t.remove(20);
      var isRemoved = true;
      t.forEach(e=>{
        if(e==20)
          isRemoved=false;
      });
      assert(isRemoved);
    });
    it(`removes a element and heights are right`, function(){
      t.remove(20);
      assert(checkHeight(t.root));
    });
    it(`removes a element and is still balanced`, function(){
      t.remove(20);
      isBalance(t.root);
    });
    it(`removing all elements`, function(){
      let nodos = [5, 15, 20, 10, 30, 25, 35];
      for(var alfa=0; alfa<6;alfa++){
        t.remove(nodos[alfa]);
        var isRemoved = true;
        t.forEach(e=>{
          if(e==nodos[alfa])
            isRemoved=false;
        });
        assert(isRemoved);
        assert(checkHeight(t.root));
        isBalance(t.root);
      }
    });

  });

  describe(`#rotateLeft`, function(){
    it(`does nothing`, function(){
      var h = checkHeight(t.root);
      t.rotateLeft();
      t.rotateLeft();
      t.rotateLeft();
      assert.equal(t.root.height, h);
      assert.equal(t.root.height, checkHeight(t.root));
    });
  });

  describe(`#rotateRight`, function(){
    it(`does nothing`, function(){
      var h = checkHeight(t.root);
      t.rotateLeft();
      t.rotateLeft();
      t.rotateLeft();
      assert.equal(t.root.height, h);
      assert.equal(t.root.height, checkHeight(t.root));
    });
  });
});


function checkHeight(n) {
  if(n==null)
    return -1;
  if(n.left==null && n.right==null){
    assert.equal(n.height, 0);
    return 0;
  }
  var h = Math.max(checkHeight(n.left), checkHeight(n.right))+1;
  assert.equal(n.height, h);
  return h;
}
function balance(n) {
  var l = -1, r = -1;
  if(n.left!=null)
    l = n.left.height;
  if(n.right!=null)
    r = n.right.height;
  return l-r;
}
function isBalance(n) {
  var b = balance(n);
  return b==-1 || b==0 || b==1;
}
