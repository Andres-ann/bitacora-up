import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "../js/firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  //const querySnapshot = await getTasks();
  //querySnapshot.forEach((doc) => {
  //console.log(doc.data());
  //});

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body ms-3 ms-lg-5 me-3 me-lg-5 mt-1 mb-2">
            <div class="row">
              <div class="col-lg-8">
                <h6>${task.description}</h6>
              </div>
              <div class="col-lg-2 text-center">
                <p>${task.title}</p>
              </div>
              <div class="col-lg-2 text-center">
                <button class="btn btn-warning btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger btn-delete" data-id="${doc.id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({
        target: {
          dataset
        }
      }) => {
        try {          
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Guardar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Guardar";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});