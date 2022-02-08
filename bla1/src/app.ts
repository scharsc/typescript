interface ValidatorConfig{
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function PositiveNumber( target: any, propName: string )
{
    registeredValidators[target.constructor.name] = {
        [propName]: ['positive']
    }
}

function Required( target: any, propName: string )
{
    registeredValidators[target.constructor.name] = {
        [propName]: ['required']
    }
}

function validate(obj: any)
{
    const validatorConfig = registeredValidators[obj.constructor.name];
    if(!validatorConfig)
        return true;
    let valid = true;
    for( const prop in validatorConfig )
        for(const validator in validatorConfig[prop])
        {
            switch(validator){
                case 'required':
                    valid = valid && !!obj[prop];
                    break;
                case 'positive':
                    valid = valid && obj[prop] > 0;
                    break;
            }
        }
    return valid;
}

class Course
{
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor( t: string, p:number )
    {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', () => {
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if( !validate(createdCourse) )
    {
        alert('falsche Eingabe')
        return;
    }
    console.log(createdCourse);
});  