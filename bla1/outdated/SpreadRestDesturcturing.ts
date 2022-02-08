console.log(".....");
const person = {
    name: 'Max',
    age: 30
};

const copiedPerson = {...person};
copiedPerson.name ="Anna";
console.log(person);
console.log(copiedPerson);

const add = (...numbers: number[]) =>
    numbers.reduce( (curResult, curValue) => curResult + curValue, 0 );

console.log( add(1,2,3,4,5) );

const { name : nameExtracted, age: AgeExtracted } = person;
console.log( "extracted Name: " + nameExtracted );