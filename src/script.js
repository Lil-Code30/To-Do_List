// importing the stylecheet
import './style.css';

import {v4 as uuidv4} from 'uuid';

// array to store the todo list
/*

todoList = [
    {
        id: uuidv4(),
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        projects: '',
        completed: false
    },
]
 */

// initialize todoList from localStorage or empty if none 🔴🔴
let todoList =  JSON.parse(localStorage.getItem('todo')) || [];



const newTaskBtn = document.getElementById('new-task-btn');
const formContainer = document.querySelector('.new-task-form-container');

// function to toggle the form display/hide
const showForm = () => {
    formContainer.style.display = 'block';
}
const hideForm = () => {
    formContainer.style.display = 'none';
}
newTaskBtn.addEventListener('click', showForm);

// closing the form
const closeForm = document.querySelector('#close-form-btn');
closeForm.addEventListener('click', hideForm);

// update local storage
const updateLocalStorage = () => {
    localStorage.setItem('todo', JSON.stringify(todoList));
    renderTodoList();
}

// adding a new task
const addTask = document.querySelector('#add-task-btn');
addTask.addEventListener('click', (e) => {
    e.preventDefault();

    todoList.push(extractData());
    updateLocalStorage();
    hideForm();
});

// read a task
const readTask = (id) => {

    const taskToRead = todoList.find((task) => task.id === id);

    // creating a dialog box
    const dialog = document.createElement('dialog');
    dialog.classList.add('read-dialog');
    dialog.id = `read-dialog-${taskToRead.id}`;

    if (!taskToRead) {
        alert(`Task with id ${id} not found.`);
        return; // Exit the function if the task is not found
    }

    dialog.innerHTML = `
        <button id='close-read-dialog' onclick="document.getElementById('read-dialog-${taskToRead.id}').close();">X</button>
        <div class="read-dialog">
            <h2>${taskToRead.title}</h2>
            <p>${taskToRead.description}</p>
            <p>${taskToRead.dueDate}</p>
            <p>${taskToRead.priority}</p>
            <p>${taskToRead.projects}</p>
            <p>${taskToRead.completed ? 'Completed' : 'Not Completed'}</p>  
        </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

}


// deleting a task
const deleteTask = (id) =>{
    todoList = todoList.filter((task) => task.id !== id);
    updateLocalStorage();
    renderTodoList();
}

// update a task 
const  editTask = (id) => {
 
    const taskToEdit = todoList.find((task) => task.id === id);

    //document.getElementById(`read-dialog-${id}`).close();

    // creating a dialog box
    const dialog = document.createElement('dialog');
    dialog.classList.add('edit-dialog');
    dialog.id = `edit-dialog-${taskToEdit.id}`;

    if (!taskToEdit) {
        alert(`Task with id ${id} not found.`);
        return; // Exit the function if the task is not found
    }

    dialog.innerHTML = `
    <div class="edit-dialog">
        <h2>Edit Task : ${taskToEdit.id}</h2>
        <button id='close-edit-dialog' onclick="document.getElementById('edit-dialog-${taskToEdit.id}').close();">X</button>
    </div>
    <form action="" method="post" class="dialog-task-form">
        <label for="title">Title</label><br>
        <input type="text" id="edit-title-${taskToEdit.id}" name="title" value="${taskToEdit.title}"><br>
        <label for="description">Description</label><br>
        <textarea name="description" id="edit-description-${taskToEdit.id}" cols="30" rows="10">${taskToEdit.description}</textarea><br>
        <div class="form-section">
            <div>
                <label for="due-date">Due Date</label><br>
                <input type="date" name="edit-due-date" id="edit-due-date-${taskToEdit.id}" required value="${taskToEdit.dueDate}">
            </div>
            <div>
                <label for="priority">Priority</label><br>
                <select name="priority" id="edit-priority-${taskToEdit.id}">
                    <option value="low" ${taskToEdit.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${taskToEdit.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${taskToEdit.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
            </div>
        </div>
        <label for="projects">Project</label><br>
        <select name="projects" id="edit-projects-${taskToEdit.id}">
            <option value="default" selected>default</option>
            
        </select>
        <div class="form-btn-container">
            <button type="submit" id="submit-edit-task-btn-${taskToEdit.id}">Submit</button>
            <button class="cancel-edit-task-btn"  id="cancel-edit-task-btn-${taskToEdit.id}" onclick="document.getElementById('edit-dialog-${taskToEdit.id}').close();">Cancel</button>
        </div>
    </form> 
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    // const closeDialog = document.querySelector('#close-edit-dialog');
    // closeDialog.addEventListener('click', () => {
    //     dialog.close();
    // });

    
    // updating the task
    const editForm = document.getElementById('submit-edit-task-btn-' + taskToEdit.id);
    editForm.addEventListener('click', (e) =>{
        e.preventDefault();

        // Retrieve the updated values from the form
        const updatedTitle = document.getElementById('edit-title-'+ taskToEdit.id).value;
        const updatedDescription = document.getElementById('edit-description-'+ taskToEdit.id).value;
        const updatedDueDate = document.getElementById('edit-due-date-'+ taskToEdit.id).value;
        const updatedPriority = document.getElementById('edit-priority-'+ taskToEdit.id).value;
        const updatedProject = document.getElementById('edit-projects-'+ taskToEdit.id).value;

        // Update the task object with the new values
        if (taskToEdit) {
            taskToEdit.title = updatedTitle;
            taskToEdit.description = updatedDescription;
            taskToEdit.dueDate = updatedDueDate;
            taskToEdit.priority = updatedPriority;
            taskToEdit.projects = updatedProject;

            // Update the local storage
            updateLocalStorage();
            dialog.close();
            renderTodoList();
            console.log("Task updated successfully!");
            
        }else {
            alert.error(`Task with id ${id} not found in todoList array.`);
        }
    })
    
}


// extracting the data from the form
const extractData = () => {
    const title = document.getElementById('title').value; 
    const description = document.getElementById('title').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const projects = document.getElementById('projects').value;

    return {
        id: uuidv4(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        projects: projects,
        completed: false
    }
}

// rendering the todo list
const renderTodoList = () => {
    const todoStored = localStorage.getItem('todo');
    const todoListContainer = document.querySelector('#tasks-list');
   
    todoListContainer.innerHTML = '';
    if(todoStored){
       const tasks = JSON.parse(todoStored);
        /*
            tasks[1].id
            tasks[1].title
        */

        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.setAttribute('id', `task-${task.id}`);
            

            // principal div
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-div', 'task-div-hover');
            taskDiv.setAttribute('id', `task-div-${task.id}`);

            // left div in the principal div
            const taskInfo = document.createElement('div');
            taskInfo.classList.add('task-info');

            taskInfo.addEventListener('click', (e) => {
                e.preventDefault();
                readTask(task.id);
            });

            // elements in the left div
            const checkTask = document.createElement('input');
            checkTask.classList.add(`task-checkbox`);
            checkTask.setAttribute('id', `task-checkbox-${task.id}`);
            checkTask.setAttribute('type', 'checkbox');

            /*
            // Initial state of checkbox based on task completion 🔴🔴
            checkTask.checked = task.completed;

            if(task.completed){
                document.querySelector(`#task-title-${task.id}`).classList.add('line-through');
                document.querySelector(`#task-div-${task.id}`).classList.add('task-completed');
                document.querySelector(`#task-div-${task.id}`).classList.add('task-div-hover');
            }
                
            */
            
            // checking if the task is completed Notes: need some verification here
            checkTask.addEventListener('change', (e) => {

                /*
                task.completed = e.target.checked; // Update task status

                
                // Update localStorage with the new tasks array
                const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
                localStorage.setItem('todo', JSON.stringify(updatedTasks));
                */
                
                // 🔴🔴
                // Apply styles based on checkbox state
                if(e.target.checked){
                    document.querySelector(`#task-title-${task.id}`).classList.add('line-through');
                    document.querySelector(`#task-div-${task.id}`).classList.add('task-completed');
                    document.querySelector(`#task-div-${task.id}`).classList.add('task-div-hover');    
                }else{
                    document.querySelector(`#task-title-${task.id}`).classList.remove('line-through');
                    document.querySelector(`#task-div-${task.id}`).classList.remove('task-completed');
                    document.querySelector(`#task-div-${task.id}`).classList.remove('task-div-hover');
                }
                
            });

            const taskTitle = document.createElement('h3');
            taskTitle.classList.add(`task-title`);
            taskTitle.setAttribute('id', `task-title-${task.id}`);
            taskTitle.textContent = task.title;

            const dueDate = document.createElement('p');
            dueDate.classList.add('task-due-date');
            dueDate.textContent = task.dueDate;



            // right div in the principal div
            const taskBtns = document.createElement('div');
            taskBtns.classList.add('task-btns');

            // elements in the right div
            const editBtn = document.createElement('button');
            editBtn.classList.add('task-edit-btn');
            editBtn.textContent = 'Edit';

            // adding event listeners to the edit button
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                editTask(task.id);
            })

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('task-delete-btn');
            deleteBtn.textContent = 'Delete';

            // adding event listeners to the delete button
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                deleteTask(task.id);
            })

            // appending elements to the principal div
            li.append(checkTask);
            taskInfo.append( taskTitle, dueDate);
            taskBtns.append(editBtn, deleteBtn);

            taskDiv.append(taskInfo, taskBtns);

            li.append(taskDiv);
            todoListContainer.append(li);            
        })
       

    }else{
        todoListContainer.innerHTML = '<h2>There are no tasks</h2>';
    }
}

renderTodoList();

