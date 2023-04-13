import "./column.css";
import Task from "../../entities/Task";
import localStorageService from "../../services/localStorageService";

export default class Column {
  constructor(containerEl, columnName) {
    this.containerEl = containerEl;
    this.columnName = columnName;
    this.tasksArray = [];
  }

  drawUI() {
    const columnEl = document.createElement("div");
    columnEl.classList.add("column");
    columnEl.appendChild(this.getTitleEl());

    this.tasksListEl = document.createElement("div");
    this.tasksListEl.classList.add("tasks-list");
    columnEl.appendChild(this.tasksListEl);

    /*this.tasksListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-task-button")) {
        const taskEl = e.target.closest(".task");
        if (taskEl) {
          taskEl.remove();
          this.removeTask(taskEl.getAttribute("data-id"))
        }
      }
    });*/

    columnEl.appendChild(this.getAddTaskButtonEl());
    this.containerEl.appendChild(columnEl);
  }

  getTitleEl() {
    const titleEl = document.createElement("h2");
    titleEl.classList.add("column-title");
    titleEl.textContent = this.columnName;

    titleEl.appendChild(this.getOptionsButtonEl());

    return titleEl;
  }

  getOptionsButtonEl() {
    const optionsButtonEl = document.createElement("button");
    optionsButtonEl.classList.add("options-button");

    return optionsButtonEl;
  }

  getAddTaskButtonEl() {
    const addTaskButtonWrapperEl = document.createElement("div");
    addTaskButtonWrapperEl.classList.add("task-button-wrapper");

    const createTaskButton = document.createElement("button");
    createTaskButton.classList.add("create-task-button");
    createTaskButton.textContent = "+ Add another card";

    addTaskButtonWrapperEl.appendChild(createTaskButton);
    addTaskButtonWrapperEl.appendChild(this.getAddTaskFormEl(createTaskButton));

    createTaskButton.addEventListener("click", (e) => {
      e.target.classList.add("create-task-button__hide");
      const addTaskFormWrapperEl = addTaskButtonWrapperEl.querySelector(
        ".add-task-form-wrapper"
      );
      addTaskFormWrapperEl.classList.add("add-task-form-wrapper__active");
    });

    return addTaskButtonWrapperEl;
  }

  getAddTaskFormEl(createTaskButton) {
    const addTaskFormWrapperEl = document.createElement("form");
    addTaskFormWrapperEl.classList.add("add-task-form-wrapper");

    const addTaskTextareaEl = document.createElement("textarea");
    addTaskTextareaEl.classList.add("add-task-textarea");
    addTaskTextareaEl.setAttribute(
      "placeholder",
      "Enter a title for this card..."
    );
    addTaskFormWrapperEl.appendChild(addTaskTextareaEl);

    addTaskFormWrapperEl.appendChild(
      this.getAddTaskFormButtonsEl(createTaskButton, addTaskFormWrapperEl)
    );

    const addOptionsButton = this.getOptionsButtonEl();
    addOptionsButton.classList.add("add-options-button");
    addTaskFormWrapperEl.appendChild(addOptionsButton);

    addTaskFormWrapperEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    addTaskTextareaEl.addEventListener("input", () => {
      addTaskTextareaEl.classList.remove("add-task-textarea__borderRed");
    });

    return addTaskFormWrapperEl;
  }

  getAddTaskFormButtonsEl(createTaskButton, addTaskFormWrapperEl) {
    const wraperButtonsTaskEl = document.createElement("div");
    wraperButtonsTaskEl.classList.add("wraper-buttons-task");

    const addTaskButtonEl = document.createElement("button");
    addTaskButtonEl.classList.add("add-task-button");
    addTaskButtonEl.textContent = "Add Card";
    wraperButtonsTaskEl.appendChild(addTaskButtonEl);

    const closeTaskFormButtonEl = document.createElement("button");
    closeTaskFormButtonEl.classList.add("close-task-form-button");
    wraperButtonsTaskEl.appendChild(closeTaskFormButtonEl);
    const addTaskTextareaEl =
      addTaskFormWrapperEl.querySelector(".add-task-textarea");
    addTaskButtonEl.addEventListener("click", (e) => {
      e.preventDefault();
      if (addTaskTextareaEl.value) {
        createTaskButton.classList.remove("create-task-button__hide");
        addTaskFormWrapperEl.classList.remove("add-task-form-wrapper__active");
        this.addTask(addTaskTextareaEl.value, false);
        addTaskTextareaEl.value = "";
      } else {
        addTaskTextareaEl.classList.add("add-task-textarea__borderRed");
      }
    });

    closeTaskFormButtonEl.addEventListener("click", (e) => {
      e.preventDefault();
      addTaskTextareaEl.classList.remove("add-task-textarea__borderRed");
      createTaskButton.classList.remove("create-task-button__hide");
      addTaskFormWrapperEl.classList.remove("add-task-form-wrapper__active");
    });

    return wraperButtonsTaskEl;
  }

  addTask(addTaskTextareaText, isPageLoaded) {
    const taskText = addTaskTextareaText;
    const task = new Task(
      taskText,
      "",
      this.tasksArray.length,
      this.columnName
    );
    this.tasksArray.push(task);

    if (!isPageLoaded) {
      localStorageService.pushTask(task);
    }

    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    taskEl.setAttribute("data-id", task.id);

    taskEl.textContent = taskText;

    const closeTaskButton = document.createElement("button");
    closeTaskButton.classList.add("close-task-button");
    taskEl.appendChild(closeTaskButton);

    this.tasksListEl.appendChild(taskEl);
  }

  removeTask(taskId) {
    const removedTaskIndex = this.tasksArray.findIndex(
      (element) => element.id === taskId
    );

    if (removedTaskIndex >= 0) {
      this.tasksArray.splice(removedTaskIndex, 1);

      this.tasksArray.forEach((element, index) => (element.order = index));
    }
    console.log("delete task");
  }
}
