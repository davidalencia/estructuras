"use strict"

const List = require('./List.js');

const _organize = Symbol('organize');
const _delete = Symbol('delete');

class Node {
  constructor(element) {
    this.element = element;
    this.previous = null;
    this.next = null;
    this.count = 0;
  }
}

/**
 * @name SelfOrganizingList
 * A self organizing list is a list that changes the order of the element, with
 * an heuristic to find the elements as quickly as possible.
 */
class SelfOrganizingList{

  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Constructor. Let us build a list.
   * O(1) if arr is empty O(n) otherwise.
   * @param {Array} [arr=[]] the list is instantiated with an empty list unless
   *                         an Array is passed as parameter.
   * @return {List}
   */
  constructor(arr=[]){
    for(var alfa = 0; alfa<arr.length; alfa++)
      this.add(arr[alfa]);
  }

  /**
   * Method to know the size (the number of elements) of our list.
   * O(1)
   * @return {number} size, with size >= 0.
   */
  get size(){
    return this.#size;
  }

  /**
   * Let us peek the last element of the list.
   * O(1)
   * @return {Object} the last element.
   */
  get back(){
    return (this.#tail!=null)? this.#tail.element: null;
  }

  /**
   * Let us peek the last element of the list.
   * O(1)
   * @return {Object} the last element.
   */
  get front(){
    return (this.#head!=null)? this.#head.element: null;
  }

  /**
   * Adds the element to the list.
   * O(1)
   * @param {Object} element the element that will be added to the list.
   */
  add(element){
    var newNode = new Node(element);
    if(this.#tail==null)
      this.#head = newNode;
    else{
      newNode.previous = this.#tail;
      this.#tail.next = newNode;
    }
    this.#tail = newNode;
    this.#size++;
  }


  /**
   * Removes the element from the list.
   * O(1)
   * @param {Object} element the element that will be removed from the list.
   */
  remove(element){
    this[_delete]();
    let n = this.#head;
    while (n!=null) {
      if(n.element == element){
        this[_delete](n);
        this.#size--;
      }
      n = n.next;
    }
  }

  /**
   * Pops an element. i.e. returns the last element of the list and gets removed
   * from the list.
   * O(1)
   * @return {Object} the last element of the list.
   */
  pop(){
    return this[_delete](this.#tail);
  }

  /**
   * Shifts an element. i.e. returns the first element of the list and gets
   * removed from the list.
   * O(1)
   * @return {Object} the first element of the list.
   */
  shift(){
    return this[_delete](this.#head);
  }

  /**
   * Method to know if our list is empty
   * O(1)
   * @return {boolean} true if the list is empty, false otherwise.
   */
  isEmpty(){
    return this.#head==null;
  }

  /**
   * Let us know if the element is contained in the list.
   * O(n)
   * @param {Object} element the element that may or not be in the list.
   * @return {boolean} true if the element is contained false otherwise.
   */
  contains(element){
    let n = this.#head;
    while (n!=null) {
      if(n.element == element)
        return true;
      n = n.next;
    }
    return false;
  }

  /**
   * Returns the first element in the list that returns true in the condition
   * passed through the anonimus function.
   * @param  {function} condition an anonimus function with one argument that
   *                              must return a boolean, true if the element is
   *                              the desire element, false otherwise.
   * @return {Object} the element found or null if no element returned true in
   *                  the condition.
   * @example var l = new List();
   * var item = {
   *   x:1,
   *   y:3
   * }
   * l.add(item);
   * console.log(l.findOne(e=>e.y==3));
   */
  findOne(condition){
    let n = this.#head;
    while (n!=null) {
      if(condition(n.element)){
        this[_organize](n);
        return n.element;
      }
      n = n.next;
    }
    return null;
  }

  /**
   * Returns all the elements in the list that returns true in the condition
   * passed through the anonimus function.
   * @param  {function} condition an anonimus function with one argument that
   *                              must return a boolean, true if the element is
   *                              the desire element, false otherwise.
   * @return {Array} an array with all the elements found that returned true on
   *                  the condition.
   * @example var l = new List();
   * var item = {
   *   x:1,
   *   y:3
   * }
   * l.add(item);
   * var item2 = {
   *   x:19,
   *   y:3
   * }
   * l.add(item2);
   * console.log(l.find(e=>e.y==3));
   */
  find(condition){
    let n = this.#head;
    let arr = []
    while (n!=null) {
      if(condition(n.element)){
        this[_organize](n);
        arr.push(n.element);
      }
      n = n.next;
    }
    return arr;
  }

  /**
   * forEach implementation for list.
   * O(n)
   * @param {function} [f = console.log] an anonimus function with the behaviour
   *                                     desire for each element.
   */
  forEach(f= console.log){
    let n = this.#head;
    while (n!=null) {
      f(n.element);
      n = n.next;
    }
  }

  /**
   * Returns the i element of the list.
   * O(n)
   * @param {number} i the index of our element.
   * @return {Object} the element in the i index or null if the i is equal or
   *                  bigger than size or i is smaller than 0.
   */
  get(i){
    if(i<0)
      return null;
    let n = this.#head;
    while (n!=null && i-- >0) {
      n = n.next;
    }
    if(i!=-1)
      return null;
    return n.element;
  }

  /**
   * Changes the i element of the list.
   * O(n)
   * @param {number} i the index of our element. Only  if 0<i<this.size
   * @param {Object} element the new value.
   */
  set(i, element){
    if(i<0 || i>this.size)
      return;
    let n = this.#head;
    while (n!=null && i-- >0)
      n = n.next;
    if(i!=-1)
      return;
    n.element = element;
  }

  /**
   * Returns the index of the element searched.
   * O(n)
   * @param {Object} element the element to be searched.
   * @return {number} the index of the element or -1 in case it doesn't exist.
   */
  getIndex(element){
    let n = this.#head;
    let i = 0;
    while (n!=null) {
      if(n.element==element)
        return i;
      i++;
      n = n.next;
    }
    return -1;
  }

  /**
   * Returns an array with all the elements.
   * O(n)
   * @return {Array} an array with all the elements in the same order.
   */
  toArray(){
    let arr = [];
    let n = this.#head;
    while (n!=null) {
      arr.push(n.element);
      n = n.next;
    }
    return arr;
  }

  [_delete](n){
    if (n==null)
      return null;
    var exNodo = n.element;
    if(this.#tail==n && this.#head==n){
      this.#tail=null;
      this.#head=null;
    }
    else if(n==this.#head){
      this.#head=n.next;
      n.next.previous=null;
    }
    else if(n==this.#tail){
      this.#tail=n.previous;
      n.previous.next=null;
    }
    else{
      n.previous.next=n.next;
      n.next.previous=n.previous;
    }
    return exNodo;
  }

  [_organize](n){
    n.count++;
    if(n==this.#head)
      return;

    var previous = n.previous
    while(n.previous!=null && n.count>n.previous.count){
      var count = n.count;
      var element = n.element;
      n.count = n.previous.count;
      n.element = n.previous.element;
      n.previous.count = count;
      n.previous.element = element;
      n = n.previous;
    }
  }
}

module.exports = SelfOrganizingList;
