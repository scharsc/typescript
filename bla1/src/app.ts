console.log( " ---------------------- ") ; 
function Logger(logString: string)
{
    return (  bla: Function  ) =>
    {
        console.log(logString);
        console.log( bla );
    };
}

// function WithTemplate(template: string, hookID: string)
// {
//     return (constructor: Function) =>
//     {

//     };
// }

@Logger('LOGGING - PERSON')
class Person
{
    name = 'Max';

    constructor() 
    {
        console.log('Creating person object...');
    }
}

const pers = new Person();
console.log(pers);