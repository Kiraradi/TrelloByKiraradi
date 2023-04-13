import "./board.css";
import Column from "../column/column";
import localStorageService from "../../services/localStorageService";

export default class Board {
  constructor(containerEl) {
    this.containerEl = containerEl;
  }

  drawUI() {
    const trelloBoardEl = document.createElement("div");
    trelloBoardEl.classList.add("board");

    this.columnTodo = new Column(trelloBoardEl, "ToDo");
    this.columnTodo.drawUI();

    this.columnProgress = new Column(trelloBoardEl, "Progress");
    this.columnProgress.drawUI();

    this.columnDone = new Column(trelloBoardEl, "Done");
    this.columnDone.drawUI();

    this.containerEl.appendChild(trelloBoardEl);

    trelloBoardEl.addEventListener("click", this.removeTask.bind(this));
  }

  removeTask(e) {
    if (e.target.classList.contains("close-task-button")) {
      const taskEl = e.target.closest(".task");
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
  }

  saveTasksToLocalStorage() {
    const taskArray = this.columnTodo.tasksArray.concat(
      this.columnProgress.tasksArray,
      this.columnDone.tasksArray
    );
    localStorageService.setTasks(taskArray);
  }
}
