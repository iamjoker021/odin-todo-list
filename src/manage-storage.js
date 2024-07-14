import { createProject } from "./project-entity";

const ManageStorage = (() => {
    const getLocalStorageValue = () => {
        // De-Serialize
        const storedValue = JSON.parse(localStorage.getItem('projectFolder')) || {maxId: 0, projectFolder: {}}
        const projectFolder = storedValue.projectFolder;
        for (const project in projectFolder) {
            projectFolder[project] = createProject(projectFolder[project].name, projectFolder[project].description);
            
            for (const todo in projectFolder[project].todo) {
                projectFolder[project].addTodo(todo);
            }
        }

        return storedValue
    };
    const save = (tobeStored) => {
        // Serialize
        const projectFolder = tobeStored.projectFolder;
        for (const project in projectFolder) {
            projectFolder[project]['name'] = projectFolder[project].getProjectName();
            projectFolder[project]['description'] = projectFolder[project].getProjectDescription();
            projectFolder[project]['todo'] = {};
            for (const todo in projectFolder[project].getToDoList()) {
                projectFolder[project]['todo'][todo] = todo
            }
        }
        
        localStorage.setItem('projectFolder', JSON.stringify(tobeStored));
    }

    return { getLocalStorageValue, save }
})();

export {
    ManageStorage
}