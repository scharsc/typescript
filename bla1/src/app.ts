class Department
{
    private employees: string[] = [];

    get lastRecentEmployee()
    {
        if( this.employees.length <= 0 )
            throw Error("bls");
        return this.employees[this.employees.length - 1];
    }

    constructor(private readonly name: string)
    {
    }

    describe(this: Department) {
        console.log('description of xDepartment: ' + this.name);
    }

    addEmployee(employee: string)
    {
        this.employees.push(employee);
    }

    printEmployeeInformation()
    {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department
{
    constructor(public admins: string[]) 
    {
        super("It");
    }
}

const it = new ITDepartment(["Max"]);
console.log(it);
const accountingCopy = { name: "dummy", describe: it.describe };

it.describe();

it.addEmployee('Max');

it.addEmployee('Manu');

it.printEmployeeInformation();
// accountingCopy.describe();

console.log( "last recent it employee:" + it.lastRecentEmployee );