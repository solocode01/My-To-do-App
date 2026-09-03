"use strict";

const addButton = document.querySelector(".add-btn");
const responses = document.querySelector(".responses");
const inputBox = document.querySelector(".input-box");
const progressBar = document.querySelector(".progress");
const progressNumbers = document.querySelector(".numbers");
const celebrateText = document.querySelector(".detail-header");
const taskTracker = document.querySelector(".task-tracker");
const preloadImg = document.querySelector(".preload-img");

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

const updateProgress = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  progressNumbers.textContent = `${completed}/${total}`;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = `${percent}%`;

  total > 0
    ? taskTracker.classList.remove("hidden")
    : taskTracker.classList.add("hidden");

  total > 0
    ? preloadImg.classList.add("hidden")
    : preloadImg.classList.remove("hidden");

  if (completed && total > 0 && completed === total) {
    celebrate();
    celebrateText.textContent = `Yes, you did it!!! 💯🥰`;
  } else {
    celebrateText.textContent = "Keep it Up! 💪";
  }
};

// Add a new task
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  const taskText = inputBox.value.trim();
  if (!taskText) "";

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  updateProgress();
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
    updateProgress();
  }

  if (e.target.closest(".edit-btn")) {
    inputBox.value = tasks[index].text;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    updateProgress();
  }

  if (e.target.closest(".delete-btn")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    updateProgress();
  }
});

const celebrate = () => {
  const count = 200,
    defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, { spread: 60 });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Draw whatever was loaded from localStorage as soon as the page opens
renderTasks();
updateProgress();

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
