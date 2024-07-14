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

export {
    createProject
}