"use strict"

class Nodo {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class List {

  #head = null;
  #tail = null;
  #size = 0;

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

  isEmpty(){
    return this.#head==null;
  }

  forEach(cb){
    let n = this.#head;
    while (n!=null) {
      cb(n.element);
      n = n.next;
    }
  }

  get size(){
    return this.#size;
  }

}

module.exports = List;
