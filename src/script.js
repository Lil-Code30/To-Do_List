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

// deleting a task
const deleteTask = (id) =>{
    todoList = todoList.filter((task) => task.id !== id);
    updateLocalStorage();
    renderTodoList();
}

// update a task 
const  editTask = (id) => {

    // creating a dialog box
    const dialog = document.createElement('dialog');
    dialog.id = 'edit-dialog';
    
    const taskToEdit = todoList.find((task) => task.id === id);

    dialog.innerHTML = `
    <div class="edit-dialog">
        <h2>Edit Task : ${taskToEdit.id}</h2>
        <button id='close-edit-dialog' onclick="dialog.close()">X</button>
    </div>
    <form action="" method="post" class="dialog-task-form">
        <label for="title">Title</label><br>
        <input type="text" id="edit-title" name="title" value="${taskToEdit.title}"><br>
        <label for="description">Description</label><br>
        <textarea name="description" id="edit-description" cols="30" rows="10">${taskToEdit.description}</textarea><br>
        <div class="form-section">
            <div>
                <label for="due-date">Due Date</label><br>
                <input type="date" name="edit-due-date" id="due-date" required value="${taskToEdit.dueDate}">
            </div>
            <div>
                <label for="priority">Priority</label><br>
                <select name="priority" id="edit-priority">
                    <option value="low" ${taskToEdit.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${taskToEdit.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${taskToEdit.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
            </div>
        </div>
        <label for="projects">Project</label><br>
        <select name="projects" id="projects">
            <option value="default" selected>default</option>
            
        </select>
        <div class="form-btn-container">
            <button type="submit" id="add-task-btn">Submit</button>
            <button type="reset" id="cancel-task-btn" onclick="dialog.close()">Cancel</button>
        </div>
    </form> 
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    // const closeDialog = document.querySelector('#close-edit-dialog');
    // closeDialog.addEventListener('click', () => {
    //     dialog.close();
    // });
    
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
            taskInfo.append(checkTask, taskTitle, dueDate);
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

