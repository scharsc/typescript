function add(n1, n2) {
    return n1 + n2;
}
function printResult(number) {
    console.log("Result is " + number);
    return;
}
function addAndHandle(n1, n2, cb) {
    cb(n1 + n2);
}
printResult(add(4, 7));
var combineValues;
combineValues = add;
//combineValues = 5;
//combineValues = printResult;
console.log(combineValues(8, 23));
addAndHandle(3, 30, printResult);
addAndHandle(22, 33, function (number) { console.log("bla: " + number); return 3; });
