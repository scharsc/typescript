

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor)
 {
     const originalMethod = descriptor.value;
     const adjustedDescriptor: PropertyDescriptor =  {
         configurable: true,
         enumerable: false,
         get() {
             const boundFn = originalMethod.bind(this);
             return boundFn;
         } 
        };
    return adjustedDescriptor; 
 }

class Printer
{
    message: string = "I am a printer";

    constructor()
    {

    }
    
    @Autobind
    showMessage()
    {
        console.log( this.message );
    }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage );
