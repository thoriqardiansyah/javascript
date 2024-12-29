import { readFileSync } from "node:fs";

readFileSync("./score.txt");

let arr = [];
let res;
for (n = 1; n <= 10; n++) {
  arr.push(n);
  res = arr.join("+");
  red = arr.reduce((prev, curr) => prev + curr);
  console.log(res + "=" + red);
}

// Encapsulation      Global   Class   SubClass
// public               v        v        v
// protected            x        v        v
// private              x        v        x

class Animal {
  name;
  age;
  gender;

  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  walking() {
    console.log(`${this.name} is walking`);
  }
}

class Dog extends Animal {
  race;

  constructor(name, age, race, gender) {
    super(name, age, gender);
    this.race = race;
  }
}

class Cow extends Animal {
  constructor(name, age, gender) {
    super(name, age, gender);
  }

  speak() {
    console.log(`${this.name}: Mooooooo`);
  }
}

let molly = new Dog("Molly", 8, "Scottish Fold", "Male");
let meri = new Dog("Meri", 2, "Domestic", "Female");
let hapi = new Cow("Hapi", 6, "Female");
console.log(molly);
molly.walking();
console.log(meri);
console.log(hapi);
hapi.speak();

function exampleError(val) {
  if (val > 0) {
    throw new RangeError("error");
  }
}

function Login(username, password) {
  const baseUsername = 123;
  const basePassword = "admin123";

  if (username !== baseUsername || password !== basePassword) {
    throw new Error("Invalid username or password!");
  }

  return console.log("Login Success");
}

Login("123", "admin123");

// console.log(exampleError(10));
