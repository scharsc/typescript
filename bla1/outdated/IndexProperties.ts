

interface ErrorContainer
{
    [prop: string] : string;
}

let error : ErrorContainer = { email: "Email incorrect", username: "User not valid" };

console.log(error);