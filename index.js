const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const deleteButton = document.getElementById("delete-tasks");
const taskList = document.getElementById("task-list");

// Adds a new task to the task list if the input is not empty
function addTask(){
    const taskText = taskInput.value;
    if (taskText.trim() === "") {
        alert("Please enter a task.");
    } else {
        const newTask = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskLabel = document.createElement("span");
        taskLabel.textContent = taskText;
        newTask.appendChild(checkbox);
        newTask.appendChild(taskLabel);
        taskList.appendChild(newTask);
        taskInput.value = "";

        // Update localStorage
        saveTasksToLocalStorage();
    }
}
addButton.addEventListener("click" , addTask);
// Deletes all tasks from the list that have their checkbox checked
function deleteTasks() {
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(function(li) {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) {
            li.remove(); // Deletes the <li> from the DOM
        }           
    });
    // Update localStorage
    saveTasksToLocalStorage();
}

deleteButton.addEventListener("click", deleteTasks);
// Initialize tasks in localStorage only if not already set
function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(function(li) {
        const label = li.querySelector("span");
        const checkbox = li.querySelector("input[type='checkbox']");
        tasks.push({
            text: label.textContent,
            checked: checkbox.checked
        });
    });
    localStorage.setItem("newTasks", JSON.stringify(tasks));
}
// Save checked tasks to localStorage whenever a checkbox is changed
taskList.addEventListener("change", function(e) {
    if (e.target && e.target.type === "checkbox") {
        saveTasksToLocalStorage();
    }
});

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("newTasks");
    if (storedTasks) {
        const taskListArray = JSON.parse(storedTasks);
        taskListArray.forEach(function(task) {
            const newTask = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.checked;

            const taskLabel = document.createElement("span");
            taskLabel.textContent = task.text;
            newTask.appendChild(checkbox);
            newTask.appendChild(taskLabel);
            taskList.appendChild(newTask);
        });
    }
}

// Load tasks on page load
loadTasksFromLocalStorage();

