import "./trelloColumn.Component.css";
export default class TrelloColumn {d
  constructor(containerEl, nameColumn) {
    this.containerEl = containerEl;
    this.nameColumn = nameColumn;
  }

  drowColumn() {
    const columnEl = document.createElement("div");
    columnEl.classList.add("column");
    columnEl.appendChild(this.getColumnTitle());

    this.tasksList = document.createElement("div");
    this.tasksList.classList.add("tasks-list");
    columnEl.appendChild(this.tasksList);

    this.tasksList.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-button-task")) {
        const taskEl = e.target.closest(".item-task");
        if (taskEl) {
          taskEl.remove();
        }
      }
      console.log(this.tasksList);
    });
    columnEl.appendChild(this.getButtonNewTask());
    this.containerEl.appendChild(columnEl);
  }

  getColumnTitle() {
    const columnTitle = document.createElement("h2");
    columnTitle.classList.add("column-title");
    columnTitle.textContent = this.nameColumn;

    columnTitle.appendChild(this.getButtonOpsions());

    return columnTitle;
  }

  getButtonOpsions() {
    const buttonOpsions = document.createElement("button");
    buttonOpsions.classList.add("button-opsions");

    return buttonOpsions;
  }

  getButtonNewTask() {
    const wraperNewTaskEl = document.createElement("div");
    wraperNewTaskEl.classList.add("wraper-newTask");

    const buttonNewTaskEl = document.createElement("button");
    buttonNewTaskEl.classList.add("button-newTask");
    buttonNewTaskEl.textContent = "+ Add another card";

    wraperNewTaskEl.appendChild(buttonNewTaskEl);
    wraperNewTaskEl.appendChild(this.getFormNewTask(buttonNewTaskEl));

    buttonNewTaskEl.addEventListener("click", (e) => {
      e.target.classList.add("button-newTask__hide");
      const wraperFormNewTask = wraperNewTaskEl.querySelector(
        ".wraper-Form-newTask"
      );
      wraperFormNewTask.classList.add("wraper-Form-newTask__active");
    });

    return wraperNewTaskEl;
  }

  getFormNewTask(buttonNewTaskEl) {
    const wraperFormNewTask = document.createElement("div");
    wraperFormNewTask.classList.add("wraper-Form-newTask");

    const textareTaskEl = document.createElement("textarea");
    textareTaskEl.classList.add("textarea-task");
    textareTaskEl.setAttribute('placeholder', 'Enter a title for this card...');
    wraperFormNewTask.appendChild(textareTaskEl);

    wraperFormNewTask.appendChild(
      this.getWraperButtonsTaskEl(buttonNewTaskEl, wraperFormNewTask)
    );

    const buttonOpsionsTask = this.getButtonOpsions();
    buttonOpsionsTask.classList.add("button-opsions-task");
    wraperFormNewTask.appendChild(buttonOpsionsTask);

    textareTaskEl.addEventListener("input", () => {
      textareTaskEl.classList.remove("textarea-task__borderRed");
    });

    return wraperFormNewTask;
  }

  getWraperButtonsTaskEl(buttonNewTaskEl, wraperFormNewTask) {
    const wraperButtonsTaskEl = document.createElement("div");
    wraperButtonsTaskEl.classList.add("wraper-buttons-task");

    const buttonAddTaskEl = document.createElement("button");
    buttonAddTaskEl.classList.add("button-add-task");
    buttonAddTaskEl.textContent = "Add Card";
    wraperButtonsTaskEl.appendChild(buttonAddTaskEl);

    const buttonCloseTaskEl = document.createElement("button");
    buttonCloseTaskEl.classList.add("button-close-task");
    wraperButtonsTaskEl.appendChild(buttonCloseTaskEl);
    const textareTaskEl = wraperFormNewTask.querySelector(".textarea-task");
    buttonAddTaskEl.addEventListener("click", () => {
      if (textareTaskEl.value) {
        buttonNewTaskEl.classList.remove("button-newTask__hide");
        wraperFormNewTask.classList.remove("wraper-Form-newTask__active");
        this.addNewTask(textareTaskEl);
      } else {
        textareTaskEl.classList.add("textarea-task__borderRed");
      }
    });

    buttonCloseTaskEl.addEventListener("click", () => {
      textareTaskEl.classList.remove("textarea-task__borderRed");
      buttonNewTaskEl.classList.remove("button-newTask__hide");
      wraperFormNewTask.classList.remove("wraper-Form-newTask__active");
    });

    return wraperButtonsTaskEl;
  }

  addNewTask(textareTaskEl) {
    const taskText = textareTaskEl.value;
    

    const itemTask = document.createElement("div");
    itemTask.classList.add("item-task");
    
    itemTask.textContent = taskText;
    textareTaskEl.value = "";

    const closeButtonTask = document.createElement("button");
    closeButtonTask.classList.add("close-button-task");
    itemTask.appendChild(closeButtonTask);

    

    //SaveToLocalStorage.pushTask(this.nameColumn, taskText );

    this.tasksList.appendChild(itemTask);
  }

}
