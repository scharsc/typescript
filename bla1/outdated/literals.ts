type Combinable = number | string;
type ConversionDescriptor =  "as-number" | "as-string"

function combine(
    input1: number | string, 
    input2: number | string, 
    resultType: ConversionDescriptor )
{
    let result;
    if( typeof input1 === 'number' && typeof input2 ==='number' || resultType ==="as-number" )
    {
        result = +input1 + +input2;
    } else
    {
        result = input1.toString() + input2.toString();
    }

    if( resultType == "as-number")
    {
        return +result; 
    }
    else
    {
        return result.toString();
    }
}

const combinedAges = combine(20,6,'as-number');
console.log(combinedAges);


const combinedAgesS = combine('20','6','as-number');
console.log(combinedAgesS);

const combinedNames = combine('Max', 'Anna', 'as-string');
console.log(combinedNames);
