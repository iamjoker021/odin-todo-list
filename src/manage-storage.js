import { createProject } from "./project-entity";

const ManageStorage = (() => {
    const getLocalStorageValue = () => {
        // De-Serialize
        if (!localStorage.getItem('projectFolder')) {
            localStorage.setItem('projectFolder', {id: 0, projectFolder: {}})
        }
        const storedValue = JSON.parse(localStorage.getItem('projectFolder'))
        const projectFolder = storedValue.projectFolder;
        
        for (const project in projectFolder) {
            const projectObj = createProject(projectFolder[project].name, projectFolder[project].description);
            
            for (const todo of projectFolder[project].todo) {
                projectObj.addTodo(todo.name, todo.description, todo.dueDate, todo.priority);
            }

            projectFolder[project] = projectObj;
        }

        return storedValue
    };

    const save = (projectManager) => {
        const tobeStored = {
            id: projectManager.getIncrementId(),
            projectFolder: projectManager.getProjectList()
        }

        // Serialize
        const projectFolder = tobeStored.projectFolder;
        for (const project in projectFolder) {
            projectFolder[project]['name'] = projectFolder[project].getProjectName();
            projectFolder[project]['description'] = projectFolder[project].getProjectDescription();
            projectFolder[project]['todo'] = [];
            const todoList = projectFolder[project].getToDoList()
            for (const todo of todoList) {
                projectFolder[project]['todo'].push({
                    name: todo.getName(),
                    description: todo.getDescription(),
                    dueDate: todo.getDuedate().getTime(),
                    priority: todo.getPriority()
                })
            }
        }
        
        localStorage.setItem('projectFolder', JSON.stringify(tobeStored));
    };

    return { getLocalStorageValue, save }
})();

export {
    ManageStorage
}