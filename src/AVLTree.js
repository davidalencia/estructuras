"use strict"

const BinaryTree = require('./BinaryTree.js');

function balance(n) {
  if(n==null)
    return 0;
  var left = (n.left!=null)? n.left.height: -1;
  var right = (n.right!=null)? n.right.height: -1;
  return left-right;
}

function height(n) {
  return (n!=null)? n.height: -1;
}

function updateHeight(n) {
  n.height = Math.max(height(n.left), height(n.right))+1;
}

/**
 * @name AVLTree
 * An AVL Tree is self-balancing Binary Search Tree in which the absolute
 * difference in height between both subtrees is 1 or 0, this keeps the tree
 * balanced and search, add, and remove operatios in O(logn) time.
 * @extends BinaryTree
 */
class AVLTree extends BinaryTree {

  /**
   * Constructor of the AVL tree.
   * O(1) if arr is empty O(n) otherwise.
   * @param {Array} [arr=[]] the tree is instantiated with an empty unless an
   *                         Array is passed as parameter.
   * @param {function} [comparator= (a,b)=>a==b? 0: a>b? 1: -1] the function
   *                                                         that will be used.
   */
  constructor(arr=[], comparator= (a,b)=>a==b? 0: a>b? 1: -1){
    super([], comparator);
    for(var alfa = 0; alfa<arr.length; alfa++)
      this.add(arr[alfa]);
  }

  /**
   * Adds an element to the tree, the element can't be null.
   * O(Logn)
   * @param {Object} element the element that will be added to the tree.
   */
  add(element){
    if(element==null)
      return;
    super.add(element);
    this.lastAdded.height = 0;
    this._rebalance(this.lastAdded.father);
  }

  /**
   * Let us remove the first element in the tree that it's equal to the one in
   * the parameter.
   * O(Logn)
   * @param {Object} element the element that will be removed.
   */
  remove(element){
    if(this.root==null || element==null)
      return;
    var n = this._find(element);
    if(n==null)
      return;
    this._deleteNode(this._swap(n));
    this.size--;
    this._rebalance(n.father);
  }

  /**
   * Does nothing
   * Rotations are not allowed in AVL trees.
   */
  rotateLeft(){}

  /**
   * Does nothing
   * Rotations are not allowed in AVL trees.
   */
  rotateRight(){}

  _rotateRightAndUpdate(n){
    super.rotateRight(n);
    updateHeight(n);
    updateHeight(n.father);
  }

  _rotateLeftAndUpdate(n){
    super.rotateLeft(n);
    updateHeight(n);
    updateHeight(n.father);
  }

  _rebalance(n){
    while(n != null){
      updateHeight(n);
      var b = balance(n);
      if(Math.abs(b)>=2) {
        if(b>=2) {
          if(balance(n.left)<0)
            this._rotateLeftAndUpdate(n.left);
          this._rotateRightAndUpdate(n);
        }
        else{
          if(balance(n.right)>0)
            this._rotateRightAndUpdate (n.right);
          this._rotateLeftAndUpdate(n)
        }
        n = n.father;
      }
     n = n.father;
    }
  }
}

module.exports = AVLTree;
