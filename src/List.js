"use strict"

class Node {
  constructor(element) {
    this.element = element;
    this.previous = null;
    this.next = null;
  }
}

const _delete = Symbol('delete');

/**
 * @name List
 */
class List {

  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Constructor. Let us build a list.
   * @param {Array} [arr=[]] the list is instantiated with an empty list unless
   *                         an Array is passed as parameter.
   * @return {List}
   */
  constructor(arr=[]){
    for(var alfa = 0; alfa<arr.length; alfa++)
      this.push(arr[alfa]);
  }

  /**
   * Method to know the size (the number of elements) of our list.
   * @return {number} size, with size >= 0.
   */
  get size(){
    return this.#size;
  }

  /**
   * Let us peek the last element of the list.
   * @return {Object} the last element.
   */
  get back(){
    return (this.#tail!=null)? this.#tail.element: null;
  }

  /**
   * Let us peek the last element of the list.
   * @return {Object} the last element.
   */
  get front(){
    return (this.#head!=null)? this.#head.element: null;
  }

  /**
   * Adds the element to the list.
   * @param {Object} element the element that will be added to the list.
   */
  add(element){
    this.push(element);
  }

  /**
   * Pushes an element to the end of the list.
   * @param {Object} element the element that will be added to the list.
   */
  push(element){
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
   * Unshifts an element. i.e. adds an element to the start of the list.
   * @param {Object} element the element that will be added to the list.
   */
  unshift(element){
    var newNode = new Node(element);
    if(this.#tail==null)
      this.#tail = newNode;
    else{
      newNode.next = this.#head;
      this.#head.previous = newNode;
    }
    this.#head = newNode;
    this.#size++;
  }

  /**
   * Removes the element from the list.
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
   * @return {Object} the last element of the list.
   */
  pop(){
    return this[_delete](this.#tail);
  }

  /**
   * Shifts an element. i.e. returns the first element of the list and gets
   * removed from the list.
   * @return {Object} the first element of the list.
   */
  shift(){
    return this[_delete](this.#head);
  }

  /**
   * Method to know if our list is empty
   * @return {boolean} true if the list is empty, false otherwise.
   */
  isEmpty(){
    return this.#head==null;
  }

  /**
   * Let us know if the element is contained in the list.
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
   * forEach implementation for list.
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
}

module.exports = List;
