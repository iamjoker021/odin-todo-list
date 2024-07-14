import { createToDo } from "./todo-entity";

const createProject = (name, description) => {
    if (!name) {
        return false;
    }
    let projectName = name;
    let projectDescription = description || 'Nil';
    let todoList = [];

    const getProjectName = () => projectName;
    const setProjectName = (name) => {projectName = name};

    const getProjectDescription = () => projectDescription;
    const setProjectDescription = (description) => {projectDescription = description}

    const getToDoList = () => todoList;
    const addTodo = (name, description, dueDate, priority) => {
        if(!name){
            return false;
        }
        const todo = createToDo(name, description, dueDate, priority);
        todoList.push(todo);
        return true;
    };

    const removeToDo = (index) => {
        const removedItem = todoList.splice(index, 1);
        return removedItem;
    };

    return { getProjectName, setProjectName, getProjectDescription, setProjectDescription, getToDoList, addTodo, removeToDo }
}

export {
    createProject
}