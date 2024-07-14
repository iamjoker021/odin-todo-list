const createProject = (name, description) => {
    if (!name) {
        return ;
    }
    let projectName = name;
    let projectDescription = description || 'Nil';
    let todoList = {}

    const getProjectName = () => projectName;
    const setProjectName = (name) => {projectName = name};

    const getProjectDescription = () => projectDescription;
    const setProjectDescription = (description) => {projectDescription = description}

    const getToDoList = () => todoList;
    const addTodo = (todo) => {todoList.push(todo)};
    const removeToDo = (todoId) => {
        todoList = todoList.filter((todo) => todo.id!= todoId)
    };

    return { getProjectName, setProjectName, getProjectDescription, setProjectDescription, getToDoList, addTodo, removeToDo }
}

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
    projectFolderManager
}