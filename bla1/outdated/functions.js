"use strict";
function add2(n1, n2) {
    return n1 + n2;
}
function printResult(number) {
    console.log("Result is " + number);
    return;
}
function addAndHandle(n1, n2, cb) {
    cb(n1 + n2);
}
printResult(add2(4, 7));
let combineValues;
combineValues = add2;
//combineValues = 5;
//combineValues = printResult;
console.log(combineValues(8, 23));
addAndHandle(3, 30, printResult);
addAndHandle(22, 33, (number) => { console.log("bla: " + number); return 3; });
