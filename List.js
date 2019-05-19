"use strict"

class Nodo {
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
    let n = new Nodo(element);
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
    if(this.isEmpty())
      return;
    if(this.#head.element==element){
      this.#head = this.#head.next;
      this.#size -= 1;
      return;
    }

    let n = this.#head.next;
    let anterior = this.#head.next;
    while (n!=null) {
      if(n.element==element){
        anterior.next = n.next;
        this.#size -= 1;
        return;
      }
      anterior = n;
      n = n.next;
    }
  }


  /**
   * Method to know if our list is empty
   * @return {boolean} true if the list is empty, false otherwise
   */
  isEmpty(){
    return this.#head==null;
  }

  /**
   * forEach implementation for list.
   * @param {function} f an anonimus function with the behaviour desire for each element.
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
