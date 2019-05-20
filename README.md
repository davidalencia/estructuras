# Estructuras

Repository with a set of handy (and not so much) data structures to be used with
node 12 and up.

## Install
```bash
npm install --save estructuras
```

## Info
Data structures included:
* List

All data structures includes:
* add(element)
* remove(element)
* contains(element)
* isEmpty()
* forEach(callback)
* array
* size

Most of the structures include more methods, see documentation.

## Usage
```javascript
const struct = require('estructuras');

let l  = new struct.List();

l.add("hola");
l.add(2);
l.add(3);
l.add(4);

l.remove(3);

l.forEach((x)=>{
  //Do something
  console.log(x);
})
```
