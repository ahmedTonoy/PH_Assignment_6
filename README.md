# Answer to the questions from ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### 1) What is the difference between var, let, and const?
***Comparison among `var`, `let` & `const` :***

|var|let|const|
|-|-|-|
function-scoped|block-scoped|block-scoped
can be redeclared|can be redeclared|can't be redeclared
can update|can update|can't update (But can update object's property)
hoisted and initialized as `undefined`|hoisted but uninitialized|hoisted but uninitialized

***Code example:***

```js
var a = 4;
var a = 2; // Redeclaration allowed
a = 9; // Update allowed

let b = 4;
// let b = 2; Redeclaration not allowed
b = 9; // Update allowed

const c = 4;
// const c = 2; Redeclaration not allowed
// c = 9; Update not allowed 

const person = { name: Abir, age: 30 };
person.name = 'Kabir'; // Update allowed for object
```

> [!CAUTION]
> let/const remain in **TDZ** until the line of declaration and trying to access them beforehand creates $\color{red}{\text{Error}}$ [`ReferenceError: Cannot access 'x' before initialization`]

### 2) What is the difference between map(), forEach(), and filter()? 
- **forEach()**
  - loops through array
  - doesn't return anything

```js
[1, 2, 3, 4].forEach(num => console.log(num));
// Output: [1, 2, 3, 4]
```

- **map()**
  - transforms array
  - returns a new array

```js
[1, 2, 3, 4].map(num => num * 2);
// [2, 4, 6, 8]
```

- **filter()**
  - filters based on condition
  - returns a new array

```js
[1, 2, 3, 4].forEach(num => num % 2 == 0);
// [2, 4]
```

### 3) What are arrow functions in ES6?
Arrow function provides shorter syntax and it doesn't have its own `this` binding, rather inherits `this` from its surrounding scope.
```js
const sum = (a, b) => a + b;
const result = sum(20, 34);
console.log(result);
// Output: 54


const person = {
  name: "John",
  greet: function() {
    return this.name; // Here, 'this' refers to the person object
  }
};

const person = {
  name: "John",
  greet: () => {
    return this.name; // Here, 'this' doesn't refer to the person object
  }
};
```
> [!Caution]
> Object's method shouldn't be written as arrow function.

### 4) How does destructuring assignment work in ES6?
Destructuring simplifies **extracting values** from *arrays* and *objects* **into variables**.

```js
const arr = [10, 20, 30];
const [a, b] = arr;
console.log(a); // 10

const user = { name: "Abir", age: 25 };
const { name, age } = user;

const { name: userName } = user; // Renaming variable is also possible using destructuring
```

### 5) Explain template literals in ES6. How are they different from string concatenation?
Template literals use backticks ( \` ) and `${}` for interpolation, making strings more readable and flexible than concatenation. It supports multi-line strings and even direct expression embedding

```js
// Using string concatenation
const name = "Forkan";
const msg = "Hello " + name + "!";

// Using template literals
const name = "Forkan";
const msg = `Hello ${name}!`;


const a = 5;
const b = 10;
console.log(`Sum is ${a + b}`); // Embedded expression using template literal
```
