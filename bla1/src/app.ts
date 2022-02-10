
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

type Listener<T> = (items: T[]) => void;

class State<T>
{
    protected listeners: Listener<T>[] = [];

    @autobind
    addListener( listenerFn: Listener<T> )
    {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>
{
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor()
    {
        super();
    }

    static getInstance(){
        if(!this.instance)
            this.instance = new ProjectState();
        return this.instance;
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

const projectState = ProjectState.getInstance();


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

abstract class Component<HostElemT extends HTMLElement,ElemT extends HTMLElement>
{
    templateElement: HTMLTemplateElement;
    hostElement: HostElemT;
    element: ElemT;
    constructor(
        templateId: string, 
        hostElementId: string, 
        newElementId: string,
        insertPosition: InsertPosition )
    {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as  HostElemT;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element =importedNode.firstElementChild as ElemT;
        this.element.id = newElementId;
        this.attach(insertPosition);
    }

    private attach( insertPosition: InsertPosition )
    {
        this.hostElement.insertAdjacentElement(insertPosition, this.element);
    }
}


class ProjectItem extends Component< HTMLUListElement, HTMLLIElement >
{
    constructor( projectListId: string, private item: Project )
    {
        super('single-project', projectListId, 'singleProjectID', 'beforeend');
        this.render();
    }

    private render()
    {
        this.element.textContent = this.item.title;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement>
{
    assignedProjects: Project[]; 

    constructor(private type: 'active' | 'finished')
    {
        super('project-list', 'app', `${type}-projects`, 'beforeend');

        this.assignedProjects = [];

        projectState.addListener( (projects: Project[]) => { 
            const relevantProjects = projects.filter(
                prj => prj.status === EProjectStatus.Active  && type === 'active' ||
                prj.status === EProjectStatus.Finished  && type === 'finished' ); 
            
            this.assignedProjects = relevantProjects; 
            this.renderProjects();
        } );      

        this.renderContent();
    }

    private renderProjects()
    {
        const listEl = document.getElementById(this.listId()) as HTMLUListElement ;
        listEl.innerHTML = '';
        for( const projItem of this.assignedProjects )
            new ProjectItem(this.listId(), projItem);
    }

    private listId() : string
    {
        return `${this.type}-project-list`;
    }

    private renderContent()
    {
        this.element.querySelector('ul')!.id = this.listId();
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>
{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor()
    {
        super('project-input','app', 'user-input', 'afterbegin');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement ;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement ;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement ;
        this.configure();
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
}

console.log( "bla") ;

const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');