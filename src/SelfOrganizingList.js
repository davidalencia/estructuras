"use strict"

const List = require('./List.js');

const _organize = Symbol('organize');

/**
 * @name SelfOrganizingList
 * A self organizing list is a list that changes the order of the element, with
 * an heuristic to find the elements as quickly as possible.
 */
class SelfOrganizingList extends List{

  /**
   * Constructor. Let us build a list.
   * O(1) if arr is empty O(n) otherwise.
   * @param {Array} [arr=[]] the list is instantiated with an empty list unless
   *                         an Array is passed as parameter.
   * @return {List}
   */
  constructor(arr=[]){
    super();
    for(var alfa = 0; alfa<arr.length; alfa++)
      this.add(arr[alfa]);
  }


  /**
   * Adds the element to the list.
   * O(1)
   * @param {Object} element the element that will be added to the list.
   */
  add(element){
    this.push(element);
  }

  /**
   * Pushes an element to the end of the list.
   * O(1)
   * @param {Object} element the element that will be added to the list.
   */
  push(element){
    super.push(element);
    this.tail.count = 0;
  }

  /**
   * We don't allow unshifting in SelfOrganizingList, so unshift has the same
   * behaviour as push.
   * @param {Object} element the element that will be added to the list.
   */
  unshift(element){
    this.push(element);
  }

  /**
   * Returns the first element in the list that returns true in the condition
   * passed through the anonimus function.
   * O(n)
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
    let n = this.head;
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
   * O(n)
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
    let n = this.head;
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

  [_organize](n){
    n.count++;
    if(n==this.head)
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
