console.log( " ---------------------- ") ; 
function Logger(logString: string)
{
    return (  bla: Function  ) =>
    {
        console.log(logString);
        console.log( bla );
    };
}

function WithTemplate(template: string, hookID: string)
{
    console.log( "Class decorator" );
    return (constructor: any) =>
    {
        console.log("called deocrator function")
        const hookEl = document.getElementById(hookID);
        const p = new constructor();
        if(hookEl)
        {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }     
    };
}

@WithTemplate('<h1>My Person Object</h1>','app')
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

function Log( target: any, propertyName: string | Symbol  )
{
    console.log("Property decorator  .... ");
    console.log(target);
    console.log(propertyName);
}
class Product
{
    @Log
    title: string ="";
    private _price: number = 0;

    set price(val: number)
    {
        if(this._price > 0)
            this._price = val;
        else
            throw Error("invalid price")

    }

    constructor()
    {

    }

    getPriceWitTax( tax: number )
    {
        return this._price * (1+tax);
    }
}