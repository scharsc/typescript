function add( n1: number, n2: number)
{
    return n1 + n2;
}

function printResult( number: number ) : void
{
    console.log( "Result is " + number);
    return;
}

function addAndHandle( n1: number, n2: number, cb: (num: number) => void )
{
    cb( n1 + n2 );
}

printResult( add(4,7) );

let combineValues : (a:number, b: number) => number;
combineValues = add;
//combineValues = 5;
//combineValues = printResult;

console.log(combineValues(8,23));


addAndHandle( 3, 30, printResult );

addAndHandle(22,33, (number) =>  { console.log( "bla: " + number); return 3; })