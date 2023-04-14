import Task from "../../entities/Task";
import localStorageService from "../../services/localStorageService";
import "./TaskEl.css";
export default class TaskEl {
    constructor(task, parent, isPageLoaded) {
        this.task = task;
        this.parent = parent;
        this.isPageLoaded = isPageLoaded;
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
    }

    drawUI() {
        this.taskEl = document.createElement("div");
        this.taskEl.classList.add("task");
        this.taskEl.setAttribute("data-id", this.task.id);

        this.plug = document.createElement('div');
        this.plug.classList.add("plug");
        this.taskEl.addEventListener('mousedown', this.mouseDown);

        this.taskEl.textContent = this.task.name;

        const closeTaskButton = document.createElement("button");
        closeTaskButton.classList.add("close-task-button");
        this.taskEl.appendChild(closeTaskButton);



        this.parent.appendChild(this.taskEl);
    }

    mouseDown(e) {
        e.preventDefault();
        this.actualElement = e.target;
        if (this.actualElement.classList.contains('close-task-button')) {
            return
        }
        
        this.shiftX = e.clientX - this.taskEl.getBoundingClientRect().left;
        this.shiftY = e.clientY - this.taskEl.getBoundingClientRect().top;
        this.width = this.taskEl.getBoundingClientRect().width;
        this.height = this.taskEl.getBoundingClientRect().height;
        this.plug.style.height = `${this.height}px`;
        this.taskEl.classList.add('task__dragged');
        this.taskEl.style.width = `${this.width}px`;
        this.taskEl.style.height = `${this.height}px`;

        this.tasksList = this.taskEl.closest('.tasks-list');

        this.tasksList.replaceChild(this.plug, this.taskEl);

        document.body.appendChild(this.taskEl);
        this.taskEl.style.left = `${e.clientX - this.shiftX}px`;
        this.taskEl.style.top = `${e.clientY - this.shiftY}px`;

        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('mousemove', this.mouseMove);
        
    }

    mouseUp(e) {
        e.preventDefault();
        this.taskEl.classList.remove('task__dragged');
        this.taskEl.style = '';

        this.tasksList = this.plug.closest('.tasks-list');
        this.tasksList.replaceChild(this.taskEl, this.plug);
        
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mousemove', this.mouseMove);
    }

    mouseMove(e) {
        e.preventDefault();
        const targetEl = e.target;

        if (targetEl.classList.contains('task')) {
            this.plug.remove();
            const midHeightTask = targetEl.getBoundingClientRect().height / 2 + targetEl.getBoundingClientRect().top;
            if (e.clientY <= midHeightTask) {
                targetEl.insertAdjacentElement('beforebegin',this.plug);
            } else {
                targetEl.insertAdjacentElement('afterend',this.plug);
            }          

        }

        this.taskEl.style.left = `${e.clientX - this.shiftX}px`;
        this.taskEl.style.top = `${e.clientY - this.shiftY}px`;
    }
}

