import './style.css';
import { projectFolderManager } from "./project-folder";
import { ManageStorage } from './manage-storage';

const ScreenController = () => {
    // Get Data
    const data = ManageStorage.getLocalStorageValue();
    const projectManager = projectFolderManager(data.id, data.projectFolder);

    const clearScreen = () => {
        ManageStorage.save(projectManager);
        const projectContainer = document.querySelector('div.cards');
        while (projectContainer.firstChild) {
            projectContainer.removeChild(projectContainer.firstChild);
        }
    }
    
    const listProjectFolder = () => {
        const projectContainer = document.querySelector('div.cards');
        
        const projectList = projectManager.getProjectList();
        for (const index in projectList) {
            const project = projectList[index]
            const projectCard = document.createElement('div');
            projectCard.classList.add('card');
            projectCard.classList.add('project-folder');
            projectContainer.appendChild(projectCard);

            const title = document.createElement('h4');
            title.textContent = project.getProjectName();
            projectCard.appendChild(title);

            const description = document.createElement('p');
            description.textContent = project.getProjectDescription();
            projectCard.appendChild(description);

            const buttonList = document.createElement('ul');
            buttonList.classList.add('card-edit');
            projectCard.appendChild(buttonList);

            const edit = document.createElement('li');
            buttonList.appendChild(edit);
            const editButton = document.createElement('button');
            editButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
                                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`;
            edit.appendChild(editButton);

            const deleteItem = document.createElement('li');
            buttonList.appendChild(deleteItem);
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
                                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`;
            deleteItem.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                projectManager.removeProject(index);
                clearScreen();
                document.querySelector('.logo').click();
            })

            editButton.addEventListener('click', () => {
                const projectForm = document.createElement('form');
                projectCard.appendChild(projectForm);

                const title = document.createElement('h4');
                projectForm.appendChild(title);
                const titleInput = document.createElement('input');
                titleInput.name = 'projectName';
                titleInput.id = 'projectName';
                titleInput.type = 'text';
                titleInput.placeholder = 'NAME of Project'
                titleInput.required = true;
                titleInput.value = project.getProjectName();
                title.appendChild(titleInput);
                
                const description = document.createElement('p');
                projectForm.appendChild(description);
                const descriptionInput = document.createElement('input');
                descriptionInput.name = 'projectDescription';
                descriptionInput.id = 'projectDescription';
                descriptionInput.type = 'text';
                descriptionInput.placeholder = 'Description of your Project';
                descriptionInput.required = true;
                descriptionInput.value = project.getProjectDescription();
                description.appendChild(descriptionInput);

                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'OK';
                projectForm.appendChild(submitButton);

                projectForm.addEventListener('submit', (e) => {
                    const formData = {
                        name: e.target.querySelector('#projectName').value,
                        description: e.target.querySelector('#projectDescription').value
                    };
                    project.setProjectName(formData.name);
                    project.setProjectDescription(formData.description);

                    e.preventDefault();

                    clearScreen();
                    document.querySelector('.logo').click();
                })
                
                while (projectCard.firstChild) {
                    projectCard.removeChild(projectCard.firstChild);
                }

                projectCard.appendChild(projectForm);
            })

            title.addEventListener('click', () => {
                todoSetup(index);
            })
        }
    }

    // Add Project Folder
    const addProject = () => {
        const projectContainer = document.querySelector('div.cards');

        const projectCard = document.createElement('div');
        projectCard.classList.add('card');
        projectCard.classList.add('project-folder');
        projectContainer.appendChild(projectCard);

        const projectForm = document.createElement('form');
        projectCard.appendChild(projectForm);

        const title = document.createElement('h4');
        projectForm.appendChild(title);
        const titleInput = document.createElement('input');
        titleInput.name = 'projectName';
        titleInput.id = 'projectName';
        titleInput.type = 'text';
        titleInput.placeholder = 'NAME of Project'
        titleInput.required = true;
        title.appendChild(titleInput);
        
        const description = document.createElement('p');
        projectForm.appendChild(description);
        const descriptionInput = document.createElement('input');
        descriptionInput.name = 'projectDescription';
        descriptionInput.id = 'projectDescription';
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Description of your Project';
        descriptionInput.required = true;
        description.appendChild(descriptionInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'OK';
        projectForm.appendChild(submitButton);

        projectForm.addEventListener('submit', (e) => {
            const formData = {
                name: e.target.querySelector('#projectName').value,
                description: e.target.querySelector('#projectDescription').value
            };
            if(!projectManager.addProject(formData.name, formData.description)) {
                alert('Sorry, Failed to add Project');
            };
            e.preventDefault();

            clearScreen();
            document.querySelector('.logo').click();
        })
    }

    // List To Do 
    const listTodoItems = (projectId) => {
        const todoContainer = document.querySelector('div.cards');

        const project = projectManager.getProjectList()[projectId]
        const todoList = project.getToDoList();
        for (let index=0; index<todoList.length; index++) {
            const todo = todoList[index];
            const todoCard = document.createElement('div');
            todoCard.classList.add('card');
            todoCard.classList.add('todo-item');
            todoContainer.appendChild(todoCard);

            const title = document.createElement('h4');
            title.textContent = todo.getName();
            title.id = index;
            todoCard.appendChild(title);

            const description = document.createElement('p');
            description.textContent = todo.getDescription();
            todoCard.appendChild(description);

            const dueDate = document.createElement('p');
            const hoursDiff = Math.round((todo.getDuedate() - new Date())/(24 * 36e5));
            if (hoursDiff >= 0) {
                dueDate.textContent = `${hoursDiff} days left`;
            }
            else {
                dueDate.textContent = `${hoursDiff * -1} days ago`;
            }
            todoCard.appendChild(dueDate);

            const priority = document.createElement('p');
            priority.textContent = '!'.repeat(5 - todo.getPriority());
            priority.classList.add('priority');
            todoCard.appendChild(priority);

            const buttonList = document.createElement('ul');
            buttonList.classList.add('card-edit');
            todoCard.appendChild(buttonList);

            const deleteItem = document.createElement('li');
            buttonList.appendChild(deleteItem);
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
                                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`;
            deleteItem.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                project.removeToDo(index);
                clearScreen();
                todoSetup(projectId);
            })
        }
    }

    const addTodo = (projectId) => {
        const todoContainer = document.querySelector('div.cards');

        const todoCard = document.createElement('div');
        todoCard.classList.add('card');
        todoCard.classList.add('todo-items');
        todoContainer.appendChild(todoCard);

        const todoForm = document.createElement('form');
        todoCard.appendChild(todoForm);

        const title = document.createElement('h4');
        todoForm.appendChild(title);
        const titleInput = document.createElement('input');
        titleInput.name = 'todoName';
        titleInput.id = 'todoName';
        titleInput.type = 'text';
        titleInput.placeholder = 'NAME of To-Do item'
        titleInput.required = true;
        title.appendChild(titleInput);
        
        const description = document.createElement('p');
        todoForm.appendChild(description);
        const descriptionInput = document.createElement('input');
        descriptionInput.name = 'todoDescription';
        descriptionInput.id = 'todoDescription';
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Description of your todo';
        descriptionInput.required = true;
        description.appendChild(descriptionInput);

        const dueDate = document.createElement('p');
        todoForm.appendChild(dueDate);
        const dueDateInput = document.createElement('input');
        dueDateInput.name = 'todoDueDate';
        dueDateInput.id = 'todoDueDate';
        dueDateInput.type = 'date';
        dueDateInput.placeholder = 'Please fill Due Date';
        dueDateInput.required = true;
        dueDate.appendChild(dueDateInput);

        const priority = document.createElement('p');
        todoForm.appendChild(priority);
        const priorityInput = document.createElement('input');
        priorityInput.name = 'todoPriority';
        priorityInput.id = 'todoPriority';
        priorityInput.type = 'number';
        priorityInput.placeholder = 'Please fill Priority (0-Highest, 5-Lowest)';
        priorityInput.required = true;
        priorityInput.min = 0;
        priorityInput.max = 5;
        priorityInput.step = 1;
        priority.appendChild(priorityInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'OK';
        todoForm.appendChild(submitButton);

        todoForm.addEventListener('submit', (e) => {
            const formData = {
                name: e.target.querySelector('#todoName').value,
                description: e.target.querySelector('#todoDescription').value,
                dueDate: new Date(e.target.querySelector('#todoDueDate').value).getTime(),
                priority: e.target.querySelector('#todoPriority').value,
            };
            
            if(!projectManager.getProjectList()[projectId].addTodo(formData.name, formData.description, formData.dueDate, formData.priority)) {
                alert('Sorry, Failed to add Todo');
            };
            e.preventDefault();

            clearScreen();
            todoSetup(projectId);
        })
    }

    // Set Up for To Do
    const todoSetup = (projectId) => {
        const project = projectManager.getProjectList()[projectId];
        document.querySelector('button.back-button').disabled = false;

        const createButton = document.querySelector('button.create-button');
        createButton.classList.add('create-todo');
        createButton.classList.remove('create-project');
        createButton.disabled = false;

        const contentInfo = document.querySelector('.content-info')
        contentInfo.textContent = project.getProjectName();
        contentInfo.dataset.project = projectId;

        clearScreen();
        listTodoItems(projectId);
    }

    // Home
    document.querySelector('.logo').addEventListener('click', () => {
        document.querySelector('button.back-button').disabled = true;

        const createButton = document.querySelector('button.create-button');
        createButton.classList.add('create-project');
        createButton.classList.remove('create-todo');
        createButton.disabled = false;

        const contentInfo = document.querySelector('.content-info');
        contentInfo.textContent = 'Project Folders';
        delete contentInfo.dataset.project;


        clearScreen();
        listProjectFolder();
    })

    // Back Button
    document.querySelector('.back-button').addEventListener('click', (e) => {
        document.querySelector('.logo').click();
    })

    // Create Project
    document.querySelector('.create-button').addEventListener('click', (e) => {
        const createButton = document.querySelector('button.create-button')
        createButton.disabled = true;
        if (createButton.classList[1] === 'create-project') {
            addProject();
        }
        else if (createButton.classList[1] === 'create-todo') {
            const projectId = document.querySelector('.content-info').dataset.project;
            addTodo(projectId);
        }
    })
}

ScreenController();
document.querySelector('.logo').click();

// To test in console
Window.ManageStorage = ManageStorage;