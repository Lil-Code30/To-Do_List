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

// initialize projects from localStorage or empty if none
let projects = JSON.parse(localStorage.getItem('projects')) || [{id: uuidv4(), name: 'Default', taskCount: 0 , color: '#6439FF'}];



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
        <div class="read-dialog-content">
            <h2>Title: ${taskToRead.title}</h2>
            <hr class="read-dialog-hr">
            <p><span class="read-dialog-text">Description:</span> ${taskToRead.description}</p>
            <p><span class="read-dialog-text">Due Date:</span> ${taskToRead.dueDate}</p>
            <p><span class="read-dialog-text">Priority:</span> ${taskToRead.priority}</p>
            <p><span class="read-dialog-text">Project:</span> ${taskToRead.projects}</p>
            <p><span class="read-dialog-text">Status:</span> ${taskToRead.completed ? 'Completed' : 'Not Completed'}</p>  
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

// all function concerning projects here📢

// update projects in localStorage
const updateProjectsLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjectsInAddTaskForm();
    renderProjects();
}
// rendering projects list
const renderProjects = () => {
    const projectContainer = document.querySelector('#projects-list-container');

    projectContainer.innerHTML = '';
    projects.forEach((project) => {
        const projectList = document.createElement('li');
        projectList.classList.add('project-list')
        projectList.id = 'project-list-' + project.id;
        projectList.style.backgroundColor = project.color;

        // left div in the project list
        const projectInfo = document.createElement('div');
        projectInfo.classList.add('project-info');

        // elements in the left div
        const projectTitle = document.createElement('h3');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.name;

        // task count
        const taskCount = document.createElement('span');
        taskCount.classList.add('task-count');
        taskCount.textContent = '(' + project.taskCount + ')';

        projectTitle.append(taskCount);

        // appending elements to the left div
        projectInfo.append(projectTitle);

        // right div in the project list
        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.classList.add('delete-project-btn');
        deleteProjectBtn.id = 'delete-project-btn-' + project.id;
        deleteProjectBtn.textContent = 'Delete';

        //appending left and right div to the project list
        projectList.append(projectInfo, deleteProjectBtn);

        //appending the project list to the project container
        projectContainer.append(projectList);

        // delete project event listener
        const deleteProjectBtnId = document.querySelector('#delete-project-btn-' + project.id);
        deleteProjectBtnId.addEventListener('click', () => {
             deleteProject(project.id, project.name);
        })

        // display tasks assigned to the project
        const projectListid = document.querySelector('#project-list-' + project.id);
        projectListid.addEventListener('click', () =>{
            displayProjectTask(project.name);
        })

    })
    
}

// Display projects in the add task form
const displayProjectsInAddTaskForm = () => {
    const projectSelect = document.querySelector('#projects');

    projectSelect.innerHTML = '';
    projects.forEach((project) => {
        const projectOption = document.createElement('option');
        projectOption.classList.add('project-option');
        projectOption.textContent = project.name;
        projectOption.value = project.name.toLowerCase();

        projectSelect.append(projectOption);
    });
}

// function to delete a project
const deleteProject = (id, name) => {

    // verity if the deleted project has tasks
    const hasTasks = todoList.some((todo) => todo.projects.toLowerCase() === name.toLowerCase());
    console.log(hasTasks);
    if(hasTasks){
        alert('You cannot delete a project with tasks assigned to it');
        console.log('project cannot be deleted');
    }else{
        projects = projects.filter((project) => project.id !== id);
        updateProjectsLocalStorage();
        console.log('project deleted successfully');
    }
}

//function to display todo list assigned to a project
const displayProjectTask = (projectName) => {
    const todoListContainer = document.querySelector('#tasks-container');

    todoListContainer.innerHTML = '';
    const projectTasks = todoList.filter((todo) => todo.projects.toLowerCase() === projectName.toLowerCase());

    const tasksTitle = document.createElement('h2');
    tasksTitle.classList.add('tasks-title');
    tasksTitle.textContent = `${projectName}'s Tasks`;

    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';

    // looping through the project tasks
    if(projectTasks.length > 0){
        projectTasks.forEach((task) => {
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
            
            // checking if the task is completed Notes: need some verification here
            checkTask.addEventListener('change', (e) => {
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
            tasksList.append(li);            
        })

        todoListContainer.append(tasksTitle, tasksList);
    }else{
        todoListContainer.innerHTML = `
            <h2 id="tasks-title">${projectName}'s Tasks</h2>
            <ul id="tasks-list">
                <li>There are no tasks assigned to this project</li>
            </ul>
        `;
    }


}


// display dialog to create a new project
const displayProjectDialogBtn = document.querySelector('#new-project-btn');
displayProjectDialogBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const projectDialog = document.createElement('dialog');
    projectDialog.classList.add('project-dialog');
    projectDialog.innerHTML = `
        <div class="project-dialog-content">
            <div>
                <button id="close-dialog-project-btn">X</button>
            </div>
            <h2>New Project</h2>
            <form action="" method="post" class="dialog-project-form">
                <div class="project-content-section">
                    <label for="project-name">Project Name : </label>
                    <input type="text" id="project-name" name="project-name" required>
                </div>
                <div class="project-content-section">
                    <label for="project-color-tag">Color : </label> 
                    <input type="color" id="project-color-tag" name="project-color-tag" required>
                </div>
                <button id="add-project-btn" type="submit" >Add Project</button>
            </form>	
        </div>
    `;

    document.body.appendChild(projectDialog);
    projectDialog.showModal();

    // creating a new project and adding it to the project list and local storage
    const addProjectBtn = document.querySelector('#add-project-btn');
    addProjectBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let projectName = document.querySelector('#project-name').value.trim();
        const projectColor = document.querySelector('#project-color-tag').value;

        projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
        const newProject = {
            id: uuidv4(),
            name: projectName,
            taskCount: 0,
            color: projectColor
        };

        // check if a project with the same name already exists

        const isDuplicate = projects.some(project => project.name === newProject.name);
        if(isDuplicate){
            alert(`A project with the name ${newProject.name} already exists`);
        }else{
            projects.push(newProject);
            updateProjectsLocalStorage();
            console.log('project added successfully');
            projectDialog.close();
        }
    });

    // function to close the dialog box
    const closeDialogProjectBtn = document.querySelector('#close-dialog-project-btn');
    closeDialogProjectBtn.addEventListener('click', () => {
        projectDialog.close();
    })
})


// rendering todo list and projects
displayProjectsInAddTaskForm();
renderTodoList();
renderProjects();


