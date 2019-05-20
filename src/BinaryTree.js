"use strict"

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
   * @param {function} [comparator= (a,b)=>a>=b] the function that will be used
   *                   as comparator in the tree it most return true if it is
   *                   greatter or equal.
   */
  constructor(comparator= (a,b)=>a>=b){
    this.#comp = comparator
  }

  /**
   * Adds an element to the tree, the element can't be null.
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
      if(this.#comp(element, next.element)) //goes right
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
   * forEach implementation for tree, it can go through the tree in bfs or dfs
   * but it will do it in dfs if there is no argument.
   * @param {function} [f=console.log] an anonimus function with the behaviour
   *                                   desire for each element.
   * @param {String} [walk="dfs"] walk must eithier "dfs" or "bfs" any other
   *                              string will end in nothing.
   */
   forEach(f= console.log, walk="dfs"){
     if(walk=="dfs")
      this.dfs(f);
    else
      this.bfs(f);
   }

   /**
   * Goes through the tree in dfs  in preorder.
   * @param {function} [f=console.log] an anonimus function with the behaviour
   *                                   desire for each element.
   * @param {String} [order="in"] the order in which we are going to walk
   *                              through the tree it most be "pre", "in" or
   *                              "post" any other string will end in nothing
   *                              being done.
   */
   dfs(f= console.log, order="in"){
     if(order=="pre")
      dfsPreOrder(this.#root, f);
     else if(order=="in")
      dfsInOrder(this.#root, f);
     else if(order=="post")
      dfsPostOrder(this.#root, f);
   }
/*
  * remove(element)
  * contains(element)
  * isEmpty()
  * forEach(callback)
  * array
  * size
*/
}

module.exports = BinaryTree;
