"use strict"

const BinaryTree = require('./BinaryTree.js');


/**
 * @name TreeMap
 * @extends BinaryTree
 */
class TreeMap extends BinaryTree {
  /**
   * Constructor of the AVL tree.
   * O(1)
   * @param {function} [comparator= (a,b)=>a==b? 0: a>b? 1: -1] the function
   *                                                         that will be used.
   */
  constructor(comparator= (a,b)=>a.key==b.key? 0: a.key>b.key? 1: -1){
    super([], comparator);
  }

  /**
   * Adds an couple of key and value. There are no repeated keys, if two
   * elements have the same keys the value will be updated. Since this is a tree
   * the elements will be order using the keys.
   * O(n)
   * @param {Object} key the key to find and organize the tree.
   * @param {Object} value the value that will be added.
   */
  add(key, value){
    super.remove({key});
    super.add({key, value});
  }

  /**
   * Adds all the elements of an array.
   * O(n^2)
   * @param {Array} arr all the elements that will be added to the array.
   */
  addArray(arr){
    for(var alfa=0; alfa<arr.length;alfa++)
      super.add(arr[alfa]);
  }

  /**
   * Removes an element from the tree, given the key of the element.
   * O(n)
   * @param  {Object} key the identifier of the object.
   * @return {Object} an object with the key and value of the object.
   */
  remove(key){
    var n = this._find({key});
    if(n==null)
      return {};
    super.remove({key});
    return n.element
  }

  /**
   * Returns the value find related to the key.
   * @param  {Object} key the key that will be searched.
   * @return {Object}     the value asociated to the key.
   */
  get(key){
    var n = this._find({key});
    return n!=null? n.element.value: null;
  }

  /**
   * It tells us if the tree contains a key.
   * O(n)
   * @param  {Object} key the key we are looking for.
   * @return {boolean} true if the key is founud false otherwise.
   */
  contains(key){
    return super.contains({key});
  }

  /**
   * It tells us if the tree contains a key.
   * O(n)
   * @param  {Object} key the key we are looking for.
   * @return {boolean} true if the key is founud false otherwise.
   */
  containsKey(key){
    return super.contains({key});
  }

  /**
   * It tells us if the tree contains a value.
   * O(n)
   * @param  {Object} value the value we are looking for.
   * @return {boolean} true if the value is founud false otherwise.
   */
  containsValue(value){
    this.forEach(e=>{
      if(e.value==value)
        return true;
    });
    return false;
  }

  /**
   * Returns a copy which is a different instance from the original tree.
   * O(n^2)
   * @return {BinaryTree]} the copy of the tree.
   */
  clone(){
    var t = new BinaryTreeMap(this.comp);
    this.forEach(e=>t.add(e.key, e.value));
    return t;
  }

}

module.exports = TreeMap;
