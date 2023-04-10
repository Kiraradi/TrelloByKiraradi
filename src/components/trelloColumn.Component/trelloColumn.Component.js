import './trelloColumn.Component.css';
export default class TrelloColumn {
    constructor(containerEl, nameColumn) {
        this.containerEl = containerEl;
        this.nameColumn = nameColumn;
    }

    drowColumn() {
        const columnEl = document.createElement('div');
        columnEl.classList.add('column');
        columnEl.appendChild(this.getColumnTitle());
        columnEl.appendChild(this.getButtonNewTask());

        this.containerEl.appendChild(columnEl);
    }

    getColumnTitle() {
        const columnTitle = document.createElement('h2');
        columnTitle.classList.add('column-title');
        columnTitle.textContent = this.nameColumn;

        columnTitle.appendChild(this.getButtonOpsions())

        return columnTitle;
    }

    getButtonOpsions() {
        const buttonOpsions = document.createElement('button');
        buttonOpsions.classList.add('button-opsions');

        return buttonOpsions
    }

    getButtonNewTask() {
        const wraperNewTaskEl = document.createElement('div');
        wraperNewTaskEl.classList.add('wraper-newTask');

        const buttonNewTaskEl = document.createElement('button');
        buttonNewTaskEl.classList.add('button-newTask');
        buttonNewTaskEl.textContent = '+ Add another card';

        wraperNewTaskEl.appendChild(buttonNewTaskEl);
        wraperNewTaskEl.appendChild(this.getFormNewTask(buttonNewTaskEl));

        buttonNewTaskEl.addEventListener('click', (e) => {
            e.target.classList.add('button-newTask__hide');
            const wraperFormNewTask = wraperNewTaskEl.querySelector('.wraper-Form-newTask');
            wraperFormNewTask.classList.add('wraper-Form-newTask__active');
        });

        return wraperNewTaskEl;
    }
    

    getFormNewTask(buttonNewTaskEl) {
        const wraperFormNewTask = document.createElement('div');
        wraperFormNewTask.classList.add('wraper-Form-newTask');

        const textareTaskEl = document.createElement('textarea');
        textareTaskEl.classList.add('textarea-task');

        wraperFormNewTask.appendChild(textareTaskEl);

        const buttonAddTaskEl = document.createElement('button');
        buttonAddTaskEl.classList.add('button-add-task');
        buttonAddTaskEl.textContent = 'Add Card';

        wraperFormNewTask.appendChild(buttonAddTaskEl);

        buttonAddTaskEl.addEventListener('click', (e) => {
            buttonNewTaskEl.classList.remove('button-newTask__hide');
            wraperFormNewTask.classList.remove('wraper-Form-newTask__active');
        });

        return wraperFormNewTask;

    }
}