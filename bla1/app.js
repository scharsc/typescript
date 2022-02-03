function add(n1, n2) {
    return n1 + n2;
}
function printResult(number) {
    console.log("Result is " + number);
    return;
}
printResult(add(4, 7));
var combineValues;
combineValues = add;
console.log(combineValues(8, 23));
