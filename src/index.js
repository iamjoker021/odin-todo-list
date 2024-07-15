import './style.css';
import { projectFolderManager } from "./project-folder";
import { ManageStorage } from './manage-storage';

const ScreenController = () => {
    // Get Data
    const data = ManageStorage.getLocalStorageValue();
    const projectManager = projectFolderManager(data.id, data.projectFolder);
    
}

// To test in console
Window.projectManager = projectManager;
Window.ManageStorage = ManageStorage;