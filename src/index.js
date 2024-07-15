import './style.css';
import { projectFolderManager } from "./project-folder";
import { ManageStorage } from './manage-storage';

const ScreenController = () => {
    // Get Data
    const data = ManageStorage.getLocalStorageValue();
    const projectManager = projectFolderManager(data.id, data.projectFolder);

    const clearScreen = () => {
        const projectContainer = document.querySelector('div.cards');
        while (projectContainer.firstChild) {
            projectContainer.removeChild(projectContainer.firstChild);
        }
    }
    
    const listProjectFolder = () => {
    /*
    <div class="card project-folder">
        <h4>list 1</h4>
        <p>some description 1</p>
        <ul class="card-edit">
            <li>
                <button>
                    <?xml version="1.0" encoding="utf-8"?>
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>
            <li>
                <button>
                    <?xml version="1.0" encoding="utf-8"?>
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>
        </ul>
    </div> 
    */
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


    // Home
    document.querySelector('.logo').addEventListener('click', () => {
        document.querySelector('button.back-button').disabled = true;
        document.querySelector('button.create-project').disabled = false;
        listProjectFolder();
    })

    // Create Project
    document.querySelector('.create-project').addEventListener('click', (e) => {
        document.querySelector('button.create-project').disabled = true;
        addProject();
    })
}

ScreenController();
document.querySelector('.logo').click();

// To test in console
Window.ManageStorage = ManageStorage;