/*
// Question 1:
function makeCounter(startFrom, incrementBy) {
  // let currentCount = 0;
  let currentCount = startFrom || 0;
  incrementBy = incrementBy || 1;

  return function () {
    // currentCount++;
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

let counter2 = makeCounter();
counter2(); // 1
counter2(); // 2

let counter3 = makeCounter(4);
counter3(); // 5
counter3(); // 6

let counter4 = makeCounter(10, 2);
counter4(); // 12
counter4(); // 14


// Question 2:
// a)
// Print order: #4 -> #3 -> #2 -> #1 
// #4: is not delayed at all and will print immediately because it is not inside a `setTimeout`.
// #3: even though there is a 0ms delay, JS's event loop might introduce a tiny delay for execution, resulting in this message appearing second.
// #2: this message is printed next because there is a 20ms delay.
// #1: this message is printed last because it has the longest delay of 100ms.

function delayMsg(msg) {
    console.log(`This message will be printed after a delay: ${msg} `);
}

// b)
const delayMsg = (msg) => {
    console.log(`This message will be printed after a delay: ${msg} `);
}

// const setTimeoutList = []
// for(let i=1; i<6 ;i++){
    // setTimeoutList.push(setTimeout(delayMsg, i*1000, `#${i}: Delayed by 0ms`))
// }
// clearTimeout(setTimeoutList[setTimeoutList.length-1])
// 
// setTimeoutList.forEach(setTimeoutFuction=>{
// d)
    // clearTimeout(setTimeoutFuction)
// })

setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
delayMsg("#4: Not delayed at all");

// c)
let setTime5= setTimeout(delayMsg, 11000, "#5: Delayed by 11sec");
clearTimeout(setTime5);


// Question 3:
// a)
function printMe() {
  console.log("printing debounced message");
}
function debounce(func) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, 1000);
  };
}

let debouncePrintMe = debounce(printMe); //create this debounce function for a)
//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 1000ms of no calls
setTimeout(debouncePrintMe, 100);
setTimeout(debouncePrintMe, 200);
setTimeout(debouncePrintMe, 300);

// b)
function printMe() {
  console.log("printing debounced message");
}
function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, ms);
  };
}

let debouncePrintMe = debounce(printMe, 5000); //create this debounce function for a)
//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 5000ms of no calls
setTimeout(debouncePrintMe, 100);
setTimeout(debouncePrintMe, 200);
setTimeout(debouncePrintMe, 300);

// c)
function printMe(msg) {
    console.log(`printing debounced message: ${msg}`);
  }
  function debounce(func, ms) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, ms);
    };
  }
  
  let debouncePrintMe = debounce(printMe, 5000); //create this debounce function for a)
  //fire off 3 calls to printMe within 300ms - only the LAST one should print, after 5000ms of no calls
  setTimeout(() => debouncePrintMe("Message 1"), 100); // This call will be ignored
  setTimeout(() => debouncePrintMe("Message 2"), 200); // This call will be ignored
  setTimeout(() => debouncePrintMe("Message 3"), 300); // This call will execute after 5000ms of inactivity


// Question 4:
// a)
function printFibonacci() {
  let a = 0, b = 1;

  const intervalId = setInterval(() => {
    console.log(a);
    const next = a + b;
    a = b;
    b = next;
  }, 1000);
}

printFibonacci(); // This will print Fibonacci numbers indefinitely

// b)
function printFibonacciTimeouts() {
    let a = 0, b = 1;
  
    function printNext() {
        console.log(a);
        const next = a + b;
        a = b;
        b = next;

        setTimeout(printNext, 1000);
  }

printNext();
}

printFibonacciTimeouts(); // This will print Fibonacci numbers indefinitely

// c)
function printFibonacciTimeouts(limit) {
    let a = 0, b = 1, counter = 0;
  
    function printNext() {
    if (counter >= limit) {
        return;
  }

console.log(a);
  const next = a + b;
  a = b;
  b = next;
  counter++;

  setTimeout(printNext, 1000);
}

printNext();
}

printFibonacciTimeouts(10); // This will print the first 10 Fibonacci numbers 
*/
/*
// Question 5:
let car = {
  make: "Porsche",
  model: "911",
  year: 1964,

  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year} `);
  },
};

car.description(); // Works: This car is a Porsche 911 from 1964

// b)
let clonedCar = Object.assign({}, car); // Create a clone of the original car object

clonedCar.year = 2022; // Override the 'year' property in the clone
// e)
clonedCar.model = "Macan";

clonedCar.description(); // Updated: This car is a Porsche 911 from 2022 

// setTimeout(car.description, 200); // Fails: This car is a undefined undefined from undefined
// The reason the 'setTimeout' call fails when using 'car.description' is due to it's context ('this'). 
// If a function relies on context (this) and is passed as a reference instead of being called directly, its context is lost.
// To fix this issue, we can wrap it inside a function. This allows the context to come from before the dot (ie. the car object) and references to 'this' work as expected.

// a)
setTimeout(() => {car.description();}, 200); // Doesn't work with updated year: This car is a Porsche 911 from 1964
// c)
//The delayed 'description()' call will use the original values from part a), not the new values from part b). This is because the 'description()' method is part of the original 'car' object.
//The 'description()' method is still referencing the 'car' object's properties when called and it doesn't automatically update to reflect changes in the clone.
//To fix this issue, we can explicitly bind the right "context" into the function reference.

// d)
const boundDescription = car.description.bind(clonedCar);
setTimeout(boundDescription, 400); // Now this will work with the updated year


// Question 6:
// a)
Function.prototype.delay = function (ms) {
    const fn = this; // 'this' refers to the original function

    return function (...args) {
        setTimeout(() => {
            fn(...args); // Call the original function with the provided arguments
        }, ms);
    };
};

function multiply(a, b) {
  console.log(a * b);
}

multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds

// b)
Function.prototype.delay = function(ms) {
    const fn = this; // 'this' refers to the original function

    return function(...args) {
        setTimeout(() => {
            fn.apply(this, args); // Call the original function with the provided arguments
        }, ms);
    };
};

// c)
function multiply(a, b, c, d) {
  console.log(a * b * c * d);
}

multiply.delay(2000)(2, 3, 4, 5); // prints 120 after 2000 milliseconds


// Question 7:
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

Person.prototype.toString = function() {
    return `{ Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}}`;
};

const person1 = new Person("James Brown", 73, "male");
const person2 = new Person("Nicole Kelly", 31, "female");

console.log("Person 1 : " + person1); // Prints person1 : [object Object]
console.log("Person 2 : " + person2);

function Student(name, age, gender, cohort) {
    Person.call(this, name, age, gender);
    this.cohort = cohort;
}

const student1 = new Student("Snoop Dog", 47, "male", "2023");
const student2 = new Student("Slim Shady", 45, "male", "2023");

Student.prototype.toString = function() {
    return `{ Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, Cohort: ${this.cohort}}`;
};

// console.log(student1.toString());
// console.log(student2.toString());
console.log("Student 1 : " + student1);
console.log("Student 2 : " + student2);


// Question 8:
class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }

  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    console.log(` ${this.prefix} ${hours} : ${mins} : ${secs} `);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}

// const myClock = new DigitalClock("my clock :");
// myClock.start();

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

// const myPrecisionClock = new PrecisionClock("my precision clock :", 500); // Example with a precision of 500ms
// myPrecisionClock.start();

class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = "07:00") {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }

  checkAlarm() {
    let date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}`;
    if (currentTime === this.wakeupTime) {
      console.log("Wake Up!");
      this.stop();
    }
  }

  start() {
    this.display();
    this.timer = setInterval(() => {
      this.display();
      this.checkAlarm();
    }, 1000);
  }
}
const myAlarmClock = new AlarmClock("my alarm clock :", "20:46");
myAlarmClock.start();


// Question 9:
// a)
function randomDelay() {
  const minDelay = 1000; // 1 second
  const maxDelay = 20000; // 20 seconds
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  return new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, delay);
  });
}

randomDelay().then(() => console.log("There appears to have been a delay."));

// b)
function randomDelay() {
    const minDelay = 1000; // 1 second
    const maxDelay = 20000; // 20 seconds
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (delay % 2 === 0) {
            resolve();
        } else {
            reject();
        }
      }, delay);
    });
  }
  
  randomDelay()
  .then(() => console.log("Successful delay."))
  .catch(() => console.error("Failed delay."));

// c)
function randomDelay() {
    const minDelay = 1000; // 1 second
    const maxDelay = 20000; // 20 seconds
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (delay % 2 === 0) {
            resolve();
        } else {
            reject(new Error("Delay was odd, indicating failure."));
        }
      }, delay);
    });
  }
  
  randomDelay()
  .then(() => console.log("Successful delay."))
  .catch((error) => console.error(error.message));

//   d)
function randomDelay() {
    const minDelay = 1000; // 1 second
    const maxDelay = 20000; // 20 seconds
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (delay % 2 === 0) {
            resolve(delay);
        } else {
            reject(new Error(`Failed delay: ${delay} ms.`)); // Includes delay value in the error message
        }
      }, delay);
    });
  }
  
  randomDelay()
  .then((delay) => console.log(`Successful delay: ${delay} ms.`))
  .catch((error) => console.error(error.message));


//   Question 10:
// run 'npm init' and accept all the defaults
// run 'npm install node - fetch'
// add this line to package.json after line 5: "type": "module",

import fetch from "node-fetch";
globalThis.fetch = fetch;

function fetchURLData(url) {
  let fetchPromise = fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status} `);
    }
  });

  return fetchPromise;
}

fetchURLData("https://jsonplaceholder.typicode.com/todos/1")
// fetchURLData("https://example.com/nonexistent") // b)
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

// a)
import fetch from "node-fetch";
globalThis.fetch = fetch;

async function fetchURLData(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

async function main() {
    try {
        const data = await fetchURLData("https://jsonplaceholder.typicode.com/todos/1");
        // const data = await fetchURLData("https://example.com/nonexistent"); // b)
        console.log(data);
    } catch(error) {
        console.error(error.message);
    }
}

main();
 */
// c)
import fetch from "node-fetch";
globalThis.fetch = fetch;

async function fetchURLData(url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

async function fetchMultipleURLs(urls) {
  try {
    const promises = urls.map((url) => fetchURLData(url)); // Create an array of promises
    const results = await Promise.all(promises); // Use Promise.all to fetch all URLs concurrently
    return results;
  } catch (error) {
    throw new Error(
      `Failed to fetch data from multiple URLs: ${error.message}`
    );
  }
}

async function main() {
  try {
    const urls = [
      "https://jsonplaceholder.typicode.com/todos/1",
      "https://jsonplaceholder.typicode.com/todos/2",
    ];

    const data = await fetchMultipleURLs(urls);
    console.log("Data from multiple URLs:", data);
  } catch (error) {
    console.error(error.message);
  }
}

main(); // Call the async main function to start the operation
console.log("update something branchs");