"use strict"
const Tree = require('./BinaryTree.js');

const _addBalance = Symbol('addBalance');
const _isBlack = Symbol('isBlack');
const _isRed = Symbol('isRed');

class Node {
  constructor(element) {
    this.father = null;
    this.element = element;
    this.left = null;
    this.right = null;
    this.color = 'b';
  }

  paintItBlack(){
    this.color = 'b'
  }
  paintItRed(){
    this.color = 'r'
  }

  isLeft(){
    if(this.father==null)
      return false;
    return padre.izquierdo==this;
  }
  isRight(){
    if(this.father==null)
      return false;
    return padre.izquierdo==this;
  }
  isCrossed(){
    var hIzq = this.isLeft();
    var pIzq = this.father.isLeft();
    return (hIzq||pIzq) && !(hIzq&&pIzq);
  }

  brother(){
    if(this.father!=null)
      return (this.isLeft())? this.father.right: this.father.left;
    return null;
  }
  grandpa(){
    if(this.father!=null)
      return this.father.father;
    return null;
  }
  uncle(){
    if(this.father!=null && padre.padre!=null){
      if(this.father.isLeft())
        return this.father.father.right;
      return this.father.father.left;
    }
    return null;
  }
  leftNeph(){
    var h = this.brother();
    if(h!=null)
      return h.left;
    return null;
  }
  rightNeph(){
    var h = this.brother();
    if(h!=null)
      return h.right;
    return null;
  }

  hasFather(){
    return this.father!=null;
  }

}

class RedBlackTree extends Tree {

  /**
   * Constructor of the binary tree.
   * @param {Array} [arr=[]] the tree is instantiated with an empty tree unless
   *                         an Array is passed as parameter.
   * @param {function} [comparator= (a,b)=>a==b? 0: a>b? 1: -1] the function
   *                                                         that will be used.
   */
  constructor(arr=[], comparator=(a,b)=>a==b? 0: a>b? 1: -1) {
    super(arr, comparator);
  }

  add(element){
    let n = new Node(element);
    this.#size += 1;

    //adding
    if(this.#root==null){
      this.#root = n;
      return;
    }
    let next = this.#root;
    while(next != null){
      if(this.#comp(element, next.element)>0) //goes right
        if(next.right != null)
          next = next.right;
        else{
          next.right = n
          n.father = next;
          return;
        }
      else
        if(next.left != null)
          next = next.left;
        else{
          next.left = n
          n.father = next;
          return;
        }
    }

    //balancing
    this[_addBalance](n);
  }

  [_addBalance](n){
    if(!n.hasFather())
      n.paintItBlack();
    else if(this[_isBlack](n.father))
      return;
    else if(this[_isRed](n.uncle())){
      n.uncle().paintItBlack();
      n.father.paintItBlack();
      n.grandpa().paintItRed();
      this[_addBalance](n.grandpa());
    }
    else if(v.isCrossed()){
      var p = v.rnPadre();
      giraEnContra(v, v.padre);
      rebalancea(p);
    }
    else{
      v.rnPadre().paintItBlack();
      v.abuelo().paintItRed();
      giraEnContra(v, v.abuelo());
    }
  }

  [_isBlack](n){
    if(n==null)
      return true;
    return n.color == 'b';
  }
  [_isRed](n){
    if(n==null)
      return false;
    return n.color == 'r';
  }
}

var r = new RedBlackTree();
r.add(10);
r.forEach();
