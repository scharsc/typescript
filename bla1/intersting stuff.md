

?-optionals declared with "?" you can even make a method optional

83*: Interface vs type and merge: https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript

84*: to check if a method is *in* a given object "in" can be used.   'privileges' in employee  checks if method privileges is in employee object

type casting with "<" Type ">" in front of the element that should be casted or via "as" after the element.

87: Index properties. You may declare properties dynamically with [prop: string] in an interface. string is here the key of the property.

98: When using generics you may declare the key like this: function exctractAndDescribe< T extends object, U extends keyof T >( ... ){...}
to provide a set of possible Template arguments you may pass this by using 

"|": function exctractAndDescribe< T extends string | number  | boolean >( ... ){...}

Decorators: decorator factories provides the actual decorator Functions. These executes when class is defined.
112*fancy: by returning a class, the original class can be modified. The new constructor will be called when original class is instanciated.

101: Partial<T> class: turns every property into an optional. It can be casted to T again if very property is set in the object.

101: Readonly<T> class: makes very property or in case of arrays every element readonly.

88: function overload. if using gerneric types in function with a gerneric return type, you may declare infront of the function specilizations with the expected return type.

optional chaning ".?" similar to C#. Executes the rest of the chain, only if the property exists.

nullish coalescing with ??: similar to C#. If value infront is null or undefined  the value after "??" is taken.

interfaces can have properties. See 75
readonly properties in Interfaces 75.

gernic constraints directly in the < >: function merge<T extends object>( ... ){ ... }

"instance of" exists in JS, not working with Interfaces as the instance of relies on the constructor functions

var vs let: var is not block scopes. if in if-body for example, it will be accessbible from outside the scope.

... operator: as rest operator when using arrays; to spread a array as single parameters; as parameter list in functions.

destructuring: access single values from array by using [a,b,c] = array;

getter and setter in typescript.



this in static methods: this refers to the class in a static method alternatively to Class.xxx you can just call this.xxx. Course 70

*type* vs interface. type seems to be something in Javascript. What is that exactly? course 72


85: discriminated union. Add a type property. E.g. 'bird' or 'horse', than TS will descriminate the correct type/interface in if or switch body if check on that type, or will discriminate the type when creating a object that has the type property.