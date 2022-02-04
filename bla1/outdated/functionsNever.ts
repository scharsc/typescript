let userInput: unknown;
let userName: string = "bla";

userInput = 5;
userInput = 'Max';

if( typeof userInput === 'string' )
{
    userName = userInput;
}

console.log(userName);

function generateError( message: string, code: number ) : never
{
    throw {message: message, errorCode: code};  
}

const bla = generateError('An error occurred', 500);
console.log(bla);