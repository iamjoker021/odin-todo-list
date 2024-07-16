const ONE_DAY = 24*60*60*1000;

const createToDo = (todoName, todoDescription, todoDueDate, todoPriority) => {
    if (!todoName) {
        return false;
    }
    let name = todoName;
    let description = todoDescription || 'Nil';
    let dueDate = todoDueDate || new Date(new Date().getTime() + (1 * ONE_DAY)).getTime();
    let priority = todoPriority || 3;
    
    const getName = () => name;
    const setName = (newName) => {
        name = newName;
    }

    const getDescription = () => description;
    const setDescription = (newDescription) => {
        description = newDescription;
    }

    const getDuedate = () => new Date(dueDate);
    const extendDuedate = (noOfDays) => {
        dueDate = dueDate + (noOfDays * ONE_DAY);
    }

    const getPriority = () => priority;
    const setPriority = (newPriority) => {
        if (newPriority >= 0 && newPriority <= 5 && parseInt(newPriority)) {
            priority = newPriority
        }
    }

    return { getName, setName, getDescription, setDescription, getDuedate, extendDuedate, getPriority, setPriority }
}

export {
    createToDo
}