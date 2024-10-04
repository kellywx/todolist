

document
  .getElementById("taskForm")
  .addEventListener("submit", handleTaskSubmission);

function handleTaskSubmission(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the task input value
    let taskInputValue = document.getElementById("taskInput").value;
    
    // Check if taskInputValue is longer than 50 characters
    if (taskInputValue.length > 50) {
        alert("Task is too long")
    } else {
        // Log the input value to the console
        addTaskToBackend(taskInputValue);

        document.getElementById("taskInput").value = "";
    }

    //addTaskToList(taskInputValue);

}

function addTaskToList(task) {
    let taskList = document.getElementById('taskList');
    let newTask = document.createElement('li');
    newTask.textContent = task;
    taskList.appendChild(newTask);
}

window.addEventListener("DOMContentLoaded", fetchTasks)

// frontend fetches something from server (tells server to do something)
// DOMContentLoaded means this happens every time we refresh
function fetchTasks() {
    fetch("https://todolist-4zo9.onrender.com/tasks")
    .then((response) => response.json())
    .then((tasks) => { 
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""  //clearing the list (making it empty when we refresh)

        for (let i=0; i < tasks.length; i++) {
            addTaskToList(tasks[i]); // reusing the addTaskToList function cuz every time we refresh we want both the task AND the delete button to show up
        }
    });
}

function addTaskToBackend(task) {
    fetch("https://todolist-4zo9.onrender.com/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({task})

    }).then((response) => response.json()).then((newTask) => {
        addTaskToList(newTask);
    });
}

function addTaskToList(task) {
    let taskList = document.getElementById("taskList");
    let newTask = document.createElement("li");

    newTask.textContent = task.task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        deleteTaskFromBackend(task.id, newTask)
    }); // create a new function cuz function takes in parameters

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

function deleteTaskFromBackend(taskId, taskElement) {
    fetch(`https://todolist-4zo9.onrender.com/${taskId}`, {
        method: "DELETE" // in this route, find the task with this particular ID
    }).then(() => {
        taskElement.remove();
    });
}

// change all localhost:3000 to the new link where we are hosting the backend

