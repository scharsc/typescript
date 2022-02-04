"use strict";
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
var ERole;
(function (ERole) {
    ERole[ERole["Admin"] = 0] = "Admin";
    ERole[ERole["User"] = 1] = "User";
    ERole[ERole["ReadOnly"] = 2] = "ReadOnly";
})(ERole || (ERole = {}));
;
const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: ERole.Admin
};
// person.role.push("bla");
// person.role[1]=3;
let favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
if (person.role === ERole.Admin) {
    console.log("Its an admin");
}
