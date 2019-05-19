# Estructuras

Repositorio con varias estructuras de datos, escritas en Javascript para ser
usadas con node 12 en adelante.

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
