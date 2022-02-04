console.log('Your code goes here!');

function add(n1: number,n2: number, showResult: boolean, phrase: string)
{
    let result = n1 + n2;
    if( showResult )
    {
        console.log( phrase + result );
    }
    else
    {
        return result;
    }
}

const number1 = 5;
const number2 = 2.5;
const showResult = true;
const phrase ='result is: ';

const result = add(number1,number2, showResult, phrase);

console.log(result);