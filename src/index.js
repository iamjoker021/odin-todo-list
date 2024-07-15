import './style.css';
import { projectFolderManager } from "./project-folder";
import { ManageStorage } from './manage-storage';

const data = ManageStorage.getLocalStorageValue();
const projectManager = projectFolderManager(data.id, data.projectFolder);

// Intial Set-up: Create Default Folder
(() => {
    if(Object.keys(projectManager.getProjectList()).length === 0) {
        projectManager.addProject('default', 'The default to-do folder');
        projectManager.getProjectList()[0].addTodo('sample-todo', 'this is sample todo', null, 3);
        ManageStorage.save(projectManager);
    }
})();

// To test in console
Window.projectManager = projectManager;
Window.ManageStorage = ManageStorage;