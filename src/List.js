"use strict"

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/**
 * @name List
 */
class List {

  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Adds the element to the list.
   * @param {Object} element the element that will be added to the list.
   */
  add(element){
    let n = new Node(element);
    this.#size += 1;
    if(this.isEmpty()){
      this.#head = n;
      this.#tail =  n;
    }
    else {
      this.#tail.next = n;
      this.#tail = n;
    }
  }

  /**
   * Removes the element from the list.
   * @param {Object} element the element that will be removed from the list.
   */
  remove(element){
    let n = this.#head;
    let before = null;
    while (n!=null && n.element!=element){
      before = n;
      n = n.next;
    }

    if(n==null)
      return;

    this.#size -=1;
    if(this.#head==this.#tail){
      this.#head = null;
      this.#tail = null;
    }
    else if(this.#head==n)
      this.#head = n.next;
    else {
      if(this.#tail==n)
        this.#tail = before;
      before.next = n.next;
    }

    // if(this.#head.element==element){
    //   this.#head = this.#head.next;
    //   this.#size -= 1;
    //   return;
    // }
    // let n = this.#head.next;
    // let anterior = this.#head;
    // while (n!=null) {
    //   if(n.element==element){
    //     anterior.next = n.next;
    //     this.#size -= 1;
    //     return;
    //   }
    //   anterior = n;
    //   n = n.next;
    // }
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
   * Method to know if our list is empty
   * @return {boolean} true if the list is empty, false otherwise.
   */
  isEmpty(){
    return this.#head==null;
  }

  /**
   * forEach implementation for list.
   * @param {function} f an anonimus function with the behaviour desire for each
   *                   element.
   */
  forEach(f){
    let n = this.#head;
    while (n!=null) {
      f(n.element);
      n = n.next;
    }
  }

  /**
   * Method to know the size (the number of elements) of our list.
   * @return {number} size, with size >= 0.
   */
  get size(){
    return this.#size;
  }

}

module.exports = List;
