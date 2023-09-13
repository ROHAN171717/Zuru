// // const one = () => {
// //   console.log("I am One");
// // };

// // const two = () => {
// // //   setTimeout(() => {
// // //     console.log("Wooohoooh");
// // //   }, 3000);
// //     //   console.log("I am Two");
// //     return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //             resolve("I am Two");
// //             // console.log("I am Two");
// //         }, 3000);
// //      });
// // };

// // const three = () => {
// //   console.log("I am Three");
// // };

// // async function callMe() {
// //   one();

// //   let x = await two();
// //   console.log(x);

// //   three();
// // }

// // callMe();

// // function sum(...args) {
// //   // return args.reduce((a, b) => a + b);
// //   let sum = 0;
// //   for (let a of args) {
// //       sum += a;
// //   }
// //   console.log(arguments.length);
// //   return sum;

// // }

// // console.log(sum(1, 2, 3, 4, 5));
// // console.log(sum(1, 2, 3));

// class Student {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getName() {
//     return this.name;
//   }

//   setName(name) {
//     this.name = name;
//   }

//   getAge() {
//     return this.age;
//   }

//   setAge(age) {
//     this.age = age;
//   }

//   sayHi() {
//     console.log(`Hello ${this.name}`);
//   }
// }

// let student1 = new Student("Raj", 23);
// console.log(student1);
// console.log(student1.name);
// console.log(student1.age);
// student1.sayHi();
// console.log(typeof Student);

// const first =  () => {
//   setTimeout(() => {
//     console.log("First");
//   },2000)
// }

// function first() {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       console.log("FIRST");
//       resolve();
//     },2000);
//   })
// }

// function second() {
//   console.log("SECOND");
// }

// let x = first();
// x.then(() => {
//   second();
// })

// first(second);

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // reject(new Error("First 2"));
//     resolve("First 2");
//   },2000)
// });

// // promise.then(
// //   result => console.log(result),
// //   error => console.log(error.message)

// // );

// promise.catch(error => console.log(error.message));

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 2000);
// })
//   .then((result) => {
//     console.log(result);
//     return result * 2;
//   })
//   .then((result) => {
//     console.log(result);
//     return result * 2;
//   })
//   .then((result) => {
//     console.log(result);
//     return result * 2;
//   });

// Promise.all([
//   new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(res => console.log(res[2]));

// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(res => console.log(res)
// );

// async function one() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Hello"), 1000)
//   });
//   let result = await promise;
//   console.log(result + " " + 2);
// }

// one();

// one().then(res => console.log(res));

const arr = [1, 2, 3, 4];

const x = arr.map(x => x * 2);
console.log(x);

const x1 = arr.reduce((x,y) => x + y, 0);
console.log(x1);

console.log();


arr.forEach(x => console.log(x + 2))

console.log();

const user = {
  name: "Raj",
  age: 23
}

for (let x in user) {
  console.log(user[x]);
}

console.log();


for (let x of arr) {
  console.log(x);
}

