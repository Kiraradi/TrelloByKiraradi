import "./board.css";
import Column from "../column/column";
import localStorageService from "../../services/localStorageService";

export default class Board {
  constructor(containerEl) {
    this.containerEl = containerEl;
    this.isPageLoaded = false;
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
          (firstEl, secondEl) => firstEl.board - secondEl.board
        );
        todoTaskArray.forEach((el) => this.columnTodo.addTask(el.name, true));
      }

      if (todoProgressArray.length > 0) {
        todoProgressArray.sort(
          (firstEl, secondEl) => firstEl.board - secondEl.board
        );
        todoProgressArray.forEach((el) =>
          this.columnProgress.addTask(el.name, true)
        );
      }

      if (todoDoneArray.length > 0) {
        todoDoneArray.sort(
          (firstEl, secondEl) => firstEl.board - secondEl.board
        );
        todoDoneArray.forEach((el) => this.columnDone.addTask(el.name, true));
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

      trelloBoardEl.addEventListener("click", this.removeTask.bind(this));
    }
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

  /*dragAndDrop() {
    const onMouseUp = (e) => {
      const mauseUpItem = e.target;

      //containerTrelloBoard.insertBefore(this.actualElement, mauseUpItem);
      this.actualElement.classList.remove('task__gragger');
      //this.actualElement = undefined;
      //debugger
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    }

    const onMouseOver = (e) => {
      //console.log(e);
      this.actualElement.style.top = e.clientY + 'px';
      this.actualElement.style.left = e.clientX + 'px';
    }


    const containerTrelloBoard = document.querySelector('.tasks-list');
    containerTrelloBoard.addEventListener('mousedown' , (e) => {
      e.preventDefault();
      if(e.target.classList.contains('task')) {
        this.actualElement = e.target;
        this.actualElementWidth = this.actualElement.getBoundingClientRect().width;
        //this.actualElement.style.width = `${this.actualElementWidth}px`
        this.actualElement.classList.add('task__gragger');
        
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseover', onMouseOver);
      }
    });

  }
  */
}
