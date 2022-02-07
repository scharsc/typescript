//type FuncType = (n1: number, n2: number)  => number;

interface FuncType {
    (n1: number, n2: number): number;
} 

let AddFunc : FuncType;

AddFunc = (n1: number, n2: number) : number => n1+ n2;

console.log(  AddFunc(4,10) );