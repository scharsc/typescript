
enum EProjectStatus { Active, Finished }

class Project
{
    constructor(    public id: string, 
                    public title: string, 
                    public description: string,
                    public persons: number,
                    public status : EProjectStatus )
    {}
}

type Listener = (items: Project[]) => void;
  
class ProjectState
{
    private listeners: Listener[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    static getInstance(){
        if(!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }

    @autobind
    addListener( listenerFn: Listener )
    {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number)
    {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            EProjectStatus.Active
        );
        this.projects.push(newProject);
        for(const listenerFn of this.listeners)
            listenerFn(this.projects.slice());
    }
}

const projectState = new ProjectState();


interface Validatable 
{
    value: string | number;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate( validatableInput: Validatable )
{
    let isValid = true;
    if( validatableInput.required ){
        if( typeof validatableInput.value === 'string' )
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if ( validatableInput.minLength != null && typeof validatableInput.value === 'string')
    {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if( validatableInput.min != null && typeof validatableInput.value === 'number')
    {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if( validatableInput.max != null && typeof validatableInput.value === 'number')
    {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

function autobind ( _: any, _2: string, desciptor: PropertyDescriptor )
{
    const originalMethod = desciptor.value;
    return {  
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    }
}

class Component<T extends HTMLElement,U extends HTMLElement>
{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    constructor(templateId: string, hostElementId: string )
    {
        
    }
}

class ProjectList
{

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished')
    {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as  HTMLDivElement;
        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element =importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener( (projects: Project[]) => { 
            const relevantProjects = projects.filter(
                prj => prj.status === EProjectStatus.Active  && type === 'active' ||
                prj.status === EProjectStatus.Finished  && type === 'finished' ); 
            
            this.assignedProjects = relevantProjects; 
            this.renderProjects();
        } );      

        this.attach();
        this.renderContent();
    }

    private renderProjects()
    {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement ;
        listEl.innerHTML = '';
        for( const projItem of this.assignedProjects )
        {
            const listItem = document.createElement('li');
            listItem.textContent = projItem.title;
            listEl?.appendChild(listItem); 
        }
    }

    private renderContent()
    {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private attach()
    {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

class ProjectInput
{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor()
    {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as  HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element =importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement ;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement ;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement ;
        this.configure();
        this.attach();
    }

    private gatherUserInput() : [string, string, number] | void
    {
        const enterTitle = this.titleInputElement.value;
        const enterDescription = this.descriptionInputElement.value;
        const enteredPeople = +(this.peopleInputElement.value);

        const titleValidateable: Validatable = {
            value: enterTitle,
            required: true
        };
        const descriptionValidateable: Validatable = {
            value: enterDescription,
            required: true,
            minLength: 5
        };
        const peopleValidateable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        
        if( !validate(titleValidateable) ||
            !validate(descriptionValidateable) ||
            !validate(peopleValidateable) )
            return;
        return [enterTitle, enterDescription, enteredPeople];
    }

    private clearInputs()
    {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler( event: Event )
    {
        event.preventDefault();
        
        const userInput = this.gatherUserInput();
        if( Array.isArray( userInput) )
        {
            const [title, desc, people ] = userInput;
            console.log(title, desc, people);
            projectState.addProject( title, desc, people);
            this.clearInputs();
        }
        else
        {
            alert("Wrong input");
        }

    }

    private configure()
    {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach()
    {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

console.log( "bla") ;

const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');