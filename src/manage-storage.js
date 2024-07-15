import { createProject } from "./project-entity";

const STORAGE_FOLDER = 'projectFolder';
const ManageStorage = (() => {
    const getLocalStorageValue = () => {
        if (!localStorage.getItem(STORAGE_FOLDER)) {
            return JSON.parse('{"id":1,"projectFolder":{"0":{"name":"default","description":"The default to-do folder","todo":[{"name":"sample-todo","description":"this is sample todo","dueDate":1721100556529,"priority":3}]}}}');
        }

        // De-Serialize
        const storedValue = JSON.parse(localStorage.getItem(STORAGE_FOLDER))
        const projectFolder = storedValue.projectFolder;
        
        const parsedStoredProjectFolder = {}
        for (const project in projectFolder) {
            const projectObj = createProject(projectFolder[project].name, projectFolder[project].description);
            
            for (const todo of projectFolder[project].todo) {
                projectObj.addTodo(todo.name, todo.description, todo.dueDate, todo.priority);
            }

            parsedStoredProjectFolder[project] = projectObj
        }

        return {id: storedValue.id, projectFolder: parsedStoredProjectFolder}
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
        
        localStorage.setItem(STORAGE_FOLDER, JSON.stringify(tobeStored));
    };

    return { getLocalStorageValue, save }
})();

export {
    ManageStorage
}