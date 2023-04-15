import "./board.css";
import Column from "../column/column";
import localStorageService from "../../services/localStorageService";

export default class Board {
  constructor(containerEl) {
    this.containerEl = containerEl;
    this.isPageLoaded = false;
    this.onRemoveTask = this.onRemoveTask.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.loadPage();
  }

  loadPage() {
    const taskArray = localStorageService.getTasks();

    if (taskArray.length > 0) {
      const todoTaskArray = taskArray.filter((el) => el.status === "ToDo");
      const todoProgressArray = taskArray.filter(
        (el) => el.status === "Progress"
      );
      const todoDoneArray = taskArray.filter((el) => el.status === "Done");

      this.drawUI();
      this.isPageLoaded = true;
      if (todoTaskArray.length > 0) {
        todoTaskArray.sort(
          (firstEl, secondEl) => firstEl.order - secondEl.order
        );
        todoTaskArray.forEach((el) =>
          this.columnTodo.addTask(el.id, el.name, true)
        );
      }

      if (todoProgressArray.length > 0) {
        todoProgressArray.sort(
          (firstEl, secondEl) => firstEl.order - secondEl.order
        );
        todoProgressArray.forEach((el) =>
          this.columnProgress.addTask(el.id, el.name, true)
        );
      }

      if (todoDoneArray.length > 0) {
        todoDoneArray.sort(
          (firstEl, secondEl) => firstEl.order - secondEl.order
        );
        todoDoneArray.forEach((el) =>
          this.columnDone.addTask(el.id, el.name, true)
        );
      }
    }
  }

  drawUI() {
    if (!this.isPageLoaded) {
      const trelloBoardEl = document.createElement("div");
      trelloBoardEl.classList.add("board");

      this.columnTodo = new Column(trelloBoardEl, "ToDo");
      this.columnTodo.drawUI();

      this.columnProgress = new Column(trelloBoardEl, "Progress");
      this.columnProgress.drawUI();

      this.columnDone = new Column(trelloBoardEl, "Done");
      this.columnDone.drawUI();

      this.containerEl.appendChild(trelloBoardEl);

      trelloBoardEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-task-button")) {
          this.onRemoveTask(e.target);
        }
      });

      this.addDragAndDropEventListener();
    }
  }

  onRemoveTask(el) {
    const taskEl = el.closest(".task");
    const columnName = taskEl
      .closest(".column")
      .querySelector(".column-title").textContent;
    if (columnName === "ToDo") {
      this.columnTodo.removeTask(taskEl.getAttribute("data-id"));
    } else if (columnName === "Progress") {
      this.columnProgress.removeTask(taskEl.getAttribute("data-id"));
    } else if (columnName === "Done") {
      this.columnDone.removeTask(taskEl.getAttribute("data-id"));
    }
    taskEl.remove();
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    const taskArray = this.columnTodo.tasksArray.concat(
      this.columnProgress.tasksArray,
      this.columnDone.tasksArray
    );
    localStorageService.setTasks(taskArray);
  }

  addDragAndDropEventListener() {
    document.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("task")) {
        this.plug = document.createElement("div");
        this.plug.classList.add("plug");
        this.onMouseDown(e);
      }
    });
  }

  onMouseDown(e) {
    e.preventDefault();
    this.actualElement = e.target;
    if (this.actualElement.classList.contains("close-task-button")) {
      return;
    }

    this.shiftX = e.clientX - this.actualElement.getBoundingClientRect().left;
    this.shiftY = e.clientY - this.actualElement.getBoundingClientRect().top;
    this.width = this.actualElement.getBoundingClientRect().width;
    this.height = this.actualElement.getBoundingClientRect().height;
    this.plug.style.height = `${this.height}px`;
    this.actualElement.classList.add("task__dragged");
    this.actualElement.style.width = `${this.width}px`;
    this.actualElement.style.height = `${this.height}px`;

    this.tasksList = this.actualElement.closest(".tasks-list");
    this.tasksList.replaceChild(this.plug, this.actualElement);

    document.body.appendChild(this.actualElement);
    this.actualElement.style.left = `${e.clientX - this.shiftX}px`;
    this.actualElement.style.top = `${e.clientY - this.shiftY}px`;

    this.removeTaskFromLocalStorage();
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseUp(e) {
    e.preventDefault();
    this.addTaskInLocalStorage();
    this.actualElement.classList.remove("task__dragged");
    this.actualElement.style = "";

    this.tasksList = this.plug.closest(".tasks-list");
    this.tasksList.replaceChild(this.actualElement, this.plug);

    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(e) {
    e.preventDefault();
    const targetEl = e.target;

    if (targetEl.classList.contains("task")) {
      this.plug.remove();
      const midHeightTask =
        targetEl.getBoundingClientRect().height / 2 +
        targetEl.getBoundingClientRect().top;
      if (e.clientY <= midHeightTask) {
        targetEl.insertAdjacentElement("beforebegin", this.plug);
      } else {
        targetEl.insertAdjacentElement("afterend", this.plug);
      }
    }

    if (targetEl.classList.contains("column")) {
      const taskList = targetEl.querySelector(".tasks-list");

      if (taskList.childNodes.length === 0) {
        this.plug.remove();
        taskList.appendChild(this.plug);
      }
    }

    this.actualElement.style.left = `${e.clientX - this.shiftX}px`;
    this.actualElement.style.top = `${e.clientY - this.shiftY}px`;
  }

  removeTaskFromLocalStorage() {
    this.taskArray = localStorageService.getTasks();
    const deletedTaskIndex = this.taskArray.findIndex(
      (el) => el.id === this.actualElement.getAttribute("data-id")
    );
    this.deletedTask = this.taskArray[deletedTaskIndex];

    this.taskArray.splice(deletedTaskIndex, 1);

    localStorageService.setTasks(this.taskArray);
  }

  addTaskInLocalStorage() {
    const columnName = this.plug
      .closest(".column")
      .querySelector(".column-title").textContent;
    const appendedTaskIndex = Array.from(
      this.plug.closest(".tasks-list").children
    ).findIndex((el) => el === this.plug);

    if (this.deletedTask.status !== columnName) {
      this.deletedTask.status = columnName;
    }
    const tasksInOtherColumns = [];

    const columnTaskArray = this.taskArray.filter((el, index) => {
      if (el.status === columnName) {
        return true;
      }
      tasksInOtherColumns.push(this.taskArray[index]);
      return false;
    });

    columnTaskArray.sort((firstEl, secondEl) => firstEl.order - secondEl.order);

    columnTaskArray.splice(appendedTaskIndex, 0, this.deletedTask);

    columnTaskArray.forEach((el, index) => (el.order = index));
    const AllTask = columnTaskArray.concat(tasksInOtherColumns);

    localStorageService.setTasks(AllTask);
  }
}
