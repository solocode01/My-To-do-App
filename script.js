"use strict";

// INSTRUCTION (STEPS)

// 1. (i) User clicks "Add" after typing in the input box
// (ii) After clicking, text is added below the input box

// 2. User click the checkbox, text marks as read, by a line through and an opacity of 0.5

// 3. (i) User clicks the edit button, takes text back to input and edit
// (ii) User click "add" to add to the other to-do lists

// 4. User clicks the delete button, which takes off the to-do list entirely off the page.

// 5. Use localStorage to keep items on page even after reloading

////////////////////////////////////////
///////////////////////////////////////

const addButton = document.querySelector(".add-btn");
const responses = document.querySelector(".responses");
const inputBox = document.querySelector(".input-box");

// The single source of truth for all tasks
let tasks = [];

// Load any saved tasks when the page opens
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

// Save the current tasks array to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Rebuild the HTML list from the tasks array
function renderTasks() {
  responses.innerHTML = "";

  tasks.forEach(function (task, index) {
    const markup = `
      <li class="response ${task.completed ? "completed" : ""}" data-index="${index}">
        <div class="response-check">
          <input class="checkbox" type="checkbox" ${task.completed ? "checked" : ""} />
          <p class="response-text">${task.text}</p>
        </div>
        <div class="icons">
          <button class="edit-btn" type="button" aria-label="Edit task">
            <ion-icon class="icon edit-icon" name="create-outline"></ion-icon>
          </button>
          <button class="delete-btn" type="button" aria-label="Delete task">
            <ion-icon class="icon delete-icon" name="trash-outline"></ion-icon>
          </button>
        </div>
      </li>
    `;
    responses.insertAdjacentHTML("beforeend", markup);
  });
}

// Add a new task
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  const taskText = inputBox.value.trim();
  if (!taskText) return;

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  inputBox.value = "";
});

// Handle checkbox toggle, edit, and delete (event delegation)
responses.addEventListener("click", function (e) {
  const li = e.target.closest(".response");
  if (!li) return;

  const index = li.dataset.index;

  if (e.target.classList.contains("checkbox")) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  if (e.target.closest(".edit-btn")) {
    inputBox.value = tasks[index].text;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  if (e.target.closest(".delete-btn")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

// Draw whatever was loaded from localStorage as soon as the page opens
renderTasks();

// const addButton = document.querySelector(".add-btn");
// const responses = document.querySelector(".responses");
// const inputBox = document.querySelector(".input-box");

// // GET SAVED TASKS
// const tasks = JSON.parse(localStorage.getItem("responses")) || [];

// // RENDER TASK
// const renderTask = function (taskText, i) {
//   const markup = `
//     <li class="response" data-index="${task.i}>
//       <div class="response-check">
//         <input class="checkbox" type="checkbox" />
//         <p class="response-text">
//           ${taskText}
//         </p>
//       </div>

//       <div class="icons">
//         <button class="edit-btn" type="button" aria-label="Edit task">
//           <ion-icon
//             class="icon edit-icon"
//             name="create-outline"
//           ></ion-icon>
//         </button>

//         <button class="delete-btn" type="button" aria-label="Delete task">
//           <ion-icon
//             class="icon delete-icon"
//             name="trash-outline"
//           ></ion-icon>
//         </button>
//       </div>
//     </li>
//     `;

//   responses.insertAdjacentHTML("beforeend", markup);
//   inputBox.value = "";
// };

// tasks.forEach((task, i) => {
//   renderTask(task, i);
// });

// addButton.addEventListener("click", function (e) {
//   e.preventDefault();

//   const taskText = inputBox.value.trim();
//   if (!taskText) return;
//   tasks.push(taskText);
//   localStorage.setItem("responses", JSON.stringify(tasks));
//   renderTask(taskText);
// });

// // 2.
// responses.addEventListener("click", function (e) {
//   // e.target = the exact element clicked
//   // .closest(".response") walks UP from there to find the surrounding <li>
//   const li = e.target.closest(".response");
//   if (!li) return; // clicked somewhere with no parent task, ignore it

//   // only react if the thing clicked was actually the checkbox
//   if (e.target.classList.contains("checkbox")) {
//     li.classList.toggle("completed");
//   }

//   // 3.
//   if (e.target.closest(".edit-btn")) {
//     const responseText = li.querySelector(".response-text");
//     inputBox.value = responseText.textContent.trim();
//     li.remove();
//   }

//   // 4.
//   if (e.target.closest(".delete-btn")) {
//     const i = li.dataset.i;
//     tasks.splice(i, 1);
//     localStorage.setItem("responses", JSON.stringify(tasks));
//     li.remove();
//   }
// });
