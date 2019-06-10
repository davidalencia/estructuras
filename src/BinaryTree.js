"use strict"
const List = require('./List.js');

const _find = Symbol('find');
const _swap = Symbol('swap');
const _deleteNode = Symbol('deleteNode');

class Node {
  constructor(element) {
    this.father = null;
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

function dfsPreOrder(nodo, f){
  if(nodo==null)
    return;
  f(nodo.element);
  dfsPreOrder(nodo.left, f);
  dfsPreOrder(nodo.right, f);
}

function dfsInOrder(nodo, f){
  if(nodo==null)
    return;
  dfsInOrder(nodo.left, f);
  f(nodo.element);
  dfsInOrder(nodo.right, f);
}

function dfsPostOrder(nodo, f){
  if(nodo==null)
    return;
  dfsPostOrder(nodo.left, f);
  dfsPostOrder(nodo.right, f);
  f(nodo.element);
}

function moveAndAddNode(l, n){
  if(n.left!=null)
    l.push(n.left);
  if(n.right!=null)
    l.push(n.right);
}

/**
 * @name BinaryTree
 * This class let us build ordered binary trees with our own comparator.
 * By the way it does not accept null elements.
 */
class BinaryTree {

  #root = null;
  #size = 0;
  #comp = (a,b)=>false;

  /**
   * Constructor of the binary tree.
   * @param {Array} [arr=[]] the tree is instantiated with an empty tree unless
   *                         an Array is passed as parameter.
   * @param {function} [comparator= (a,b)=>a==b? 0: a>b? 1: -1] the function
   *                                                         that will be used.
   */
  constructor(arr=[], comparator=(a,b)=>a==b? 0: a>b? 1: -1){
    this.#comp = comparator
    for(var alfa = 0; alfa<arr.length; alfa++)
      this.add(arr[alfa]);
  }


  /**
   * Method to know the size (the number of elements) of our tree.
   * O(1)
   * @return {number} size, with size >= 0.
   */
  get size(){
    return this.#size;
  }

  /**
   * Adds an element to the tree, the element can't be null.
   * O(n)
   * @param {Object} element the element that will be added to the tree.
   */
  add(element){
    let n = new Node(element);
    this.#size += 1;
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
  }

  /**
   * Let us remove the first element in the tree that it's equal to the one in
   * the parameter.
   * O(n)
   * @param {Object} element the element that will be removed.
   */
  remove(element){
    var n = this[_find](element);
    if(n==null)
      return;
    this[_deleteNode](this[_swap](n));
    this.#size--;
  }

  /**
   * Let us know if an element is contained inside the tree.
   * O(n)
   * @param {Object} element the element that will be searched.
   */
  contains(element){
    return (this[_find](element)!=null)? true: false;
  }

  /**
   * forEach implementation for tree, it can go through the tree in bfs or dfs
   * but it will do it in dfs inorder if there is no argument, ie the tree will
   * be travel in order from lower to higer.
   * O(n)
   * @param {function} [f=console.log] an anonimus function with the behaviour
   *                                   desire for each element.
   * @param {String} [walk="dfs"] walk must eithier "dfs" or "bfs" any other
   *                              string will end in nothing.
   * @param {String} [dfsType="in"] if the walk is dfs then you can choose a
   *                                type "pre", "in" or "post".
   */
  forEach(f= console.log, walk="dfs", dfsType="in"){
     if(walk=="dfs")
      this.dfs(dfsType, f);
    else if(walk=="bfs")
      this.bfs(f);
   }

   /**
   * Goes through the tree in dfs in preorder.
   * O(n)
   * @param {String} [order="in"] the order in which we are going to walk
   *                              through the tree it most be "pre", "in" or
   *                              "post" any other string will end in nothing
   *                              being done.
   * @param {function} [f=console.log] an anonimus function with the behaviour
   *                                   desire for each element.
   */
  dfs(order="in", f=console.log){
     if(order=="pre")
      dfsPreOrder(this.#root, f);
     else if(order=="in")
      dfsInOrder(this.#root, f);
     else if(order=="post")
      dfsPostOrder(this.#root, f);
   }

   /**
    * Goes through the tree in bfs.
    * O(n)
    * @param {function} [f=console.log] an anonimus function with the behaviour
    *                                   desire for each element.
    */
  bfs(f=console.log){
    if(this.#root==null)
      return;
    var l = new List();
    l.push(this.#root);
    while(!l.isEmpty()){
      var n = l.shift();
      moveAndAddNode(l, n);
      f(n.element);
    }
   }

   /**
    * Method to know if our tree is empty
    * O(1)
    * @return {boolean} true if the tree is empty, false otherwise.
    */
   isEmpty(){
     return this.#root==null;
   }

  /**
   * Returns an array with the elements in order (lower to
   * higher).
   * O(n)
   * @return an array with the elements.
   */
  toArray(){
    var arr = [];
    this.dfs('in', e=>{
      arr.push(e);
    });
    return arr;
  }


  rotateLeft(p){
    if(this.#root ==null || p==null || p.right==null)
      return;
    var q = p.right;
    //father
    q.father=p.father;
    if(p.father!=null)
      if(p.father.left==p)
        q.father.left=q;
      else
        q.father.right=q;
    //p adopt
  	p.right = q.left;
  	if(p.right!=null)
  	  p.right.father = p;
  	//q adopt
  	q.left = p;
  	p.father = q;
  	if(p==this.#root)
  	  this.#root=q;
  }

  rotateRight(q){
    if(this.#root ==null || q==null || q.left==null)
      return;
    var p = q.left;
    //father
    p.father=q.father;
    if(q.father!=null)
      if(q.father.left==q)
        p.father.left=p;
      else
        p.father.right=p;
    //q adopt
    q.left = p.right;
    if(q.left!=null)
      q.left.father = q;
    //p adopt
    p.right = q;
    q.father = p;
    if(q==this.#root)
      this.#root=p;
  }

  [_find](e){
    var n = this.#root;
    while(n!=null && this.#comp(e, n.element)!=0){
      if(this.#comp(e, n.element)>0)
        n = n.right;
      else
       n = n.left;
    }
    return n;
  }

  [_swap](n) {
    if(n.left==null)
      return n;
    var change = n.left;
    while(change.right!=null)
      change=change.right;
    n.element = change.element;
    return change;
  }

  [_deleteNode](n) {
    if(this.#root==n){ //is root
      this.#root=n.right;
      if(n.right!=null)
        n.father=null;
      return;
    }
    if(n.right==null && n.left==null) //is leaf
      if(n.father.left==n)
        n.father.left=null;
      else
        n.father.right=null;
    else{
      var hijo;
      if(n.left!=null)
        hijo=n.left;
      else
        hijo=n.right;
      hijo.father=n.father;
      if(n.father!=null)
        if(n.father.right==vertice)
          n.father.right=hijo;
        else
          n.father.left=hijo;
    }
  }
}

module.exports = BinaryTree;
