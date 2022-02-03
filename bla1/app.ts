function add( n1: number, n2: number)
{
    return n1 + n2;
}

function printResult( number: number ) : void
{
    console.log( "Result is " + number);
    return;
}

printResult( add(4,7) );

let combineValues;
combineValues = add;

console.log(combineValues(8,23));