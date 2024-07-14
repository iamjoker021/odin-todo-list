import { ManageStorage } from "./manage-storage";
import { createProject } from "./project-entity";

const projectFolderManager = () => {
    let { maxId: id, projectFolder } = ManageStorage.getLocalStorageValue();

    const nextId = () => id++;
    const addProject = (name, description) => {
        if (!name) {
            return ;
        }
        const project = createProject(name, description);
        projectFolder[nextId()] = project;
        ManageStorage.save({id: id, projectFolder: projectFolder});
    }

    const removeProject = (projectId) => {
        const userConfirmation = prompt('Are you sure you want to delete the Folder?\n1.If you wanna delete folder and all its to-do type DELETE_ALL\n2.if you wanna only delete folder and move to-do to default folder type: DELETE');
        let removedItem = projectFolder[projectId];
        if (userConfirmation === 'DELETE_ALL') {
            delete projectFolder[projectId];
            ManageStorage.save({id: id, projectFolder: projectFolder});
            return removedItem;
        }
        else if (userConfirmation === 'DELETE') {
            // Move the To-Do
            delete projectFolder[projectId];
            ManageStorage.save({id: id, projectFolder: projectFolder});
            return removedItem;
        }
        return false;
    }

    const getProjectList = () => projectFolder;

    // const moveToDo = (fromProject, toProject, todoId) => {
    //     fromProject.get
    // }

    return { addProject, removeProject, getProjectList }
}

export {
    projectFolderManager
}