import './style.css';
import { projectFolderManager } from "./project-folder";

const projectManager = projectFolderManager();

// Intial Set-up: Create Default Folder
(() => {
    if(Object.keys(projectManager.getProjectList()).length === 0) {
        projectManager.addProject('default', 'The default to-do folder');
    }
})();

// To test in console
Window.projectManager = projectManager;