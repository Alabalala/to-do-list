function initializeApp() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        tasks = JSON.parse(storedTasks);
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
        tasks = []; // Set tasks to an empty array if parsing fails
      }
    } else {
      tasks = []; // Set tasks to an empty array if no data is stored
    }
    console.log("Loaded tasks:", tasks);
    drawScreen();
  }

// Clear corrupted data from localStorage before initializing
window.addEventListener('load', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks === "undefined" || !storedTasks) {
        localStorage.removeItem('tasks'); // Remove corrupted data
    }
    initializeApp();
});

let counter = 0;
let tasks;


function createToDo(title, description, dueDate, priority, notes, complete) {
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        complete,
    }
}

const formButton = document.querySelector('.barAdd');
formButton.addEventListener("click", openForm);

function openForm() {
    const taskForm = document.querySelector(".taskForm");
    taskForm.style.display = "grid";
}

const addNew = document.querySelector('.addNew');
addNew.addEventListener("click", addNewTask);

function addNewTask() {
    let title = document.querySelector('.title').value;
    let description = document.querySelector('.description').value;
    let dueDate = document.querySelector('.date').value;
    let priority = document.querySelector('.priority').value;
    let notes = document.querySelector('.notes').value;
    let complete = false;

    const task = createToDo(title, description, dueDate, priority, notes, complete);
    console.log(task)
    tasks.push(task);
    saveData();

    drawScreen(tasks);
}


function drawScreen() {
    document.querySelector('.title').value = "";
    document.querySelector('.description').value = "";
    document.querySelector('.date').value = "";
    document.querySelector('.priority').value = "";
    document.querySelector('.notes').value = "";

    const newCards = document.querySelector(".newCards");
    newCards.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('card');
        taskCard.classList.add(`card${index}`);

        const drawTitle = document.createElement('p');
        drawTitle.innerHTML = `<span>Título:</span> ${task.title}`;
        taskCard.appendChild(drawTitle);

        const drawDescription = document.createElement('p');
        drawDescription.innerHTML = `<span>Descripción:</span> ${task.description}`;
        taskCard.appendChild(drawDescription);

        const drawDueDate = document.createElement('p');
        drawDueDate.innerHTML = `<span>Fecha límite:</span> ${task.dueDate}`;
        taskCard.appendChild(drawDueDate);

        const drawPriority = document.createElement('p');
        drawPriority.innerHTML = `<span>Prioridad:</span> ${task.priority}`;
        taskCard.appendChild(drawPriority);

        const drawNotes = document.createElement('p');
        drawNotes.innerHTML = `<span>Notas:</span> ${task.notes}`;
        taskCard.appendChild(drawNotes);


        const buttonsDiv = document. createElement('div');
        buttonsDiv.classList.add('cardButtons');
            const drawComplete = document.createElement('button');
            drawComplete.classList.add('completeButton');
            drawComplete.textContent = 'Completar';
            drawComplete.addEventListener("click", () => {completeTask(index)});
            buttonsDiv.appendChild(drawComplete);

            const drawDelete = document.createElement('button');
            drawDelete.classList.add('deleteButton');
            drawDelete.textContent = 'Borrar';
            drawDelete.addEventListener("click", () => {deleteTask(index)});
            buttonsDiv.appendChild(drawDelete);

            taskCard.appendChild(buttonsDiv);

        newCards.appendChild(taskCard);
    });
}


const homeButton = document.querySelector(".home");
homeButton.addEventListener("click", () => {
    const taskForm = document.querySelector(".taskForm");
    taskForm.style.display = "none";
})


const settingsButton = document.querySelector(".settings");
settingsButton.addEventListener("click", () => {
    alert("Todavía no hay ajustes")
})

function deleteTask(index) {
    tasks.splice(index, 1);
    saveData()
    drawScreen();
}

function completeTask(index) {
    tasks.splice(index, 1);
    saveData();
    drawScreen();
}

function saveData() {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
    console.log("Data saved to localStorage:", tasksString); // Log what is being saved))
}