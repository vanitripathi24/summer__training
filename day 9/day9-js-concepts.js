// Variables and Data Types

const name = "Vani";
let age = 19;
const isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);

// If Else

const marks = 88;

if (marks >= 75) {
    console.log("Grade B");
} else {
    console.log("Need Improvement");
}

// Loop

for (let i = 1; i <= 5; i++) {
    console.log(`Day ${i}`);
}

// Function

function greet(name) {
    return `Hello ${name}`;
}

console.log(greet("Vani"));

// Arrow Function

const square = num => num * num;
console.log(square(5));

// Array

const skills = ["HTML", "CSS", "JavaScript"];

// Object

const student = {
    name: "Vani",
    year: 2
};

// Map

const nums = [1, 2, 3, 4];
console.log(nums.map(num => num * 2));

// Filter

console.log(nums.filter(num => num % 2 === 0));

// Reduce

console.log(nums.reduce((sum, num) => sum + num, 0));