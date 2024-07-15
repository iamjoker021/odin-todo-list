import { createProject } from "./project-entity";

 const projectFolderManager = (idCount, projectFolderList) => {
    let id = idCount, projectFolder = projectFolderList;

    const nextId = () => id++;
    const getIncrementId = () => id;
    const addProject = (name, description) => {
        if (!name) {
            return false;
        }
        const project = createProject(name, description);
        projectFolder[nextId()] = project;
        return true;
    }

    const removeProject = (projectId) => {
        const userConfirmation = prompt('Are you sure you want to delete the Folder? Type: DELETE to confirm: ');
        let removedItem = projectFolder[projectId];
        if (userConfirmation === 'DELETE') {
            // Move the To-Do
            delete projectFolder[projectId];
            return removedItem;
        }
        return false;
    }

    const getProjectList = () => projectFolder;

    return { addProject, removeProject, getProjectList, getIncrementId }
}

export {
    projectFolderManager
}