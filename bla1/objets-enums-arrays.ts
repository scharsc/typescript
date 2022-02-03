// const person : {name: string, age: number} = {
//     name: 'Maximilian',
//     age: 30
// }

// const person : { 
//     name: string, 
//     age: number, 
//     hobbies: string[],
//     role: [number, string]
//    } = {
//     name: 'Maximilian',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2,'admin']
// }

enum ERole { Admin, User, ReadOnly };

const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: ERole.Admin
}

// person.role.push("bla");
// person.role[1]=3;
    
let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log( person.name );

for(const hobby of person.hobbies) 
{
    console.log(hobby);
}

if( person.role === ERole.Admin)
{
    console.log("Its an admin");
}