/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 582:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VALUE_REQUIRED = exports.UNSUPPORTED_TYPE = exports.INVALID_GUID = void 0;
// Constant message for the GUID class.
const INVALID_GUID = 'Invalid Guid value! Please specify a valid value!';
exports.INVALID_GUID = INVALID_GUID;
const VALUE_REQUIRED = 'The parameter value required!';
exports.VALUE_REQUIRED = VALUE_REQUIRED;
const UNSUPPORTED_TYPE = 'UnSupported type! please specify one of the following: [Guid | string | Uint8Array]';
exports.UNSUPPORTED_TYPE = UNSUPPORTED_TYPE;


/***/ }),

/***/ 915:
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateGuidV4 = exports.isUint8ArrayValidGuid = exports.isStringValidGuid = exports.uint8ArrayToString = exports.stringToUint8Array = exports.ARRAY_LENGTH = void 0;
exports.ARRAY_LENGTH = 16;
const BYTE_ORDER = [3, 2, 1, 0, 5, 4, 7, 6, 8, 9, 10, 11, 12, 13, 14, 15];
/**
 * Regex to validate the given GUID accept all the UUIDs version.
 */
const regexValidator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');
/**
 * Convert the given number to a Hex format.
 * @param value The number to be converted
 */
function convertNumberToHex(value) {
    let hex = value <= 0xf ? '0' : '';
    hex += value.toString(exports.ARRAY_LENGTH);
    return hex;
}
/**
 * Convert the given {string} to a {Uint8Array} value.
 * @param value String value of the Guid.
 */
function stringToUint8Array(value) {
    // Strip any separators and un-wanted chars.
    const regExp = new RegExp('[{}()-]', 'g');
    const guid = value.replace(regExp, '');
    const bytes = [];
    for (let i = 0; i < exports.ARRAY_LENGTH; i++) {
        const pos = BYTE_ORDER[i];
        const b1 = guid.charAt(pos * 2);
        const b2 = guid.charAt(pos * 2 + 1);
        const charAt = unescape(`%${b1}${b2}`).charCodeAt(0);
        bytes.push(charAt);
    }
    return new Uint8Array(bytes);
}
exports.stringToUint8Array = stringToUint8Array;
/**
 * Convert the given {Uint8Array} to a {string} value.
 *
 * @param value Byte Array value of the Guid.
 */
function uint8ArrayToString(value) {
    let guid = '';
    for (let i = 0; i < exports.ARRAY_LENGTH; i++) {
        // Decide if we need to add the Hyphen {-} in the Guid.
        guid += i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '';
        const pos = BYTE_ORDER[i];
        guid += convertNumberToHex(value[pos]);
    }
    return guid;
}
exports.uint8ArrayToString = uint8ArrayToString;
/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
function isStringValidGuid(guid) {
    if (!guid) {
        return false;
    }
    return regexValidator.test(guid);
}
exports.isStringValidGuid = isStringValidGuid;
/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
function isUint8ArrayValidGuid(guid) {
    const strGuid = uint8ArrayToString(guid);
    return guid && regexValidator.test(strGuid);
}
exports.isUint8ArrayValidGuid = isUint8ArrayValidGuid;
/**
 * Generate a random v4 GUID.
 */
function GenerateGuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const random = (Math.random() * 16) | 0;
        const v = char === 'x' ? random : (random & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.GenerateGuidV4 = GenerateGuidV4;


/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Guid = void 0;
const guid_constants_1 = __webpack_require__(582);
const guid_helpers_1 = __webpack_require__(915);
class Guid {
    /**
     * Empty string Guid value: '00000000-0000-0000-0000-000000000000'.
     */
    static EMPTY = '00000000-0000-0000-0000-000000000000';
    /**
     * Holds a Uint8Array of 16 elements containing the GUID values.
     */
    BytesGuid = new Uint8Array(16);
    /**
     * Holds the string value of the GUID.
     */
    StringGuid = '';
    /**
     * Create a new instance of the Guid with the given value,
     * or generate a new Guid if no value was given.
     * @param value The target value if already exists, leave it empty for a new value.
     */
    constructor(value) {
        this.BytesGuid = new Uint8Array(16);
        this.StringGuid = '';
        if (!value) {
            this.StringGuid = (0, guid_helpers_1.GenerateGuidV4)();
            this.BytesGuid = (0, guid_helpers_1.stringToUint8Array)(this.StringGuid);
            return;
        }
        if (typeof value === 'string') {
            if (!Guid.isValid(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            this.StringGuid = value;
            this.BytesGuid = (0, guid_helpers_1.stringToUint8Array)(this.StringGuid);
            return;
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            if (!Guid.isValid(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            this.BytesGuid = value;
            this.StringGuid = (0, guid_helpers_1.uint8ArrayToString)(value);
            return;
        }
        throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
    }
    toString() {
        return this.StringGuid;
    }
    toByteArray() {
        return this.BytesGuid;
    }
    equals(value) {
        if (!value) {
            throw new Error(guid_constants_1.VALUE_REQUIRED);
        }
        if (typeof value === 'string') {
            if (!(0, guid_helpers_1.isStringValidGuid)(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return this.StringGuid === value;
        }
        if (typeof value !== 'object') {
            throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
        }
        if (value instanceof Uint8Array) {
            if (!(0, guid_helpers_1.isUint8ArrayValidGuid)(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return this.StringGuid === (0, guid_helpers_1.uint8ArrayToString)(value);
        }
        if (value instanceof Guid) {
            return this.StringGuid === value.toString();
        }
        return true;
    }
    isEmpty() {
        return this.StringGuid === Guid.EMPTY;
    }
    /**
     * Parse the given value into the opposite type.
     * Example : if value is string the function return a {Uint8Array of 16 elements},
     * otherwise it return a {string} if the value is a Uint8Array.
     */
    static parse(value) {
        if (!Guid.isValid(value)) {
            throw new Error(guid_constants_1.INVALID_GUID);
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            return (0, guid_helpers_1.uint8ArrayToString)(value);
        }
        // At this point we're sure that the value is string.
        return (0, guid_helpers_1.stringToUint8Array)(value);
    }
    /**
     * Generate a new v4 Guid and return a new instance of the Guid.
     */
    static newGuid() {
        return new Guid((0, guid_helpers_1.GenerateGuidV4)());
    }
    /**
     *  Checks if the given value is a valid GUID.
     * @param value The given guid that need to be validated.
     */
    static isValid(value) {
        if (!value) {
            throw new Error(guid_constants_1.VALUE_REQUIRED);
        }
        if (typeof value === 'string') {
            return (0, guid_helpers_1.isStringValidGuid)(value);
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            if (value.length !== guid_helpers_1.ARRAY_LENGTH) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return (0, guid_helpers_1.isUint8ArrayValidGuid)(value);
        }
        throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
    }
}
exports.Guid = Guid;


/***/ }),

/***/ 951:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

/**
 * Determine the methods and functions to be exported.
 */
__webpack_unused_export__ = ({ value: true });
exports.i = void 0;
var guid_1 = __webpack_require__(601);
Object.defineProperty(exports, "i", ({ enumerable: true, get: function () { return guid_1.Guid; } }));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/js-guid/dist/index.js
var dist = __webpack_require__(951);
;// CONCATENATED MODULE: ./src/js/entities/Task.js

class Task {
  constructor(id, name, description, order, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.order = order;
    this.status = status;
    this.checkingAvailabilityId();
  }
  checkingAvailabilityId() {
    if (!this.id) {
      this.id = dist/* Guid.newGuid */.i.newGuid().StringGuid;
    }
  }
}
;// CONCATENATED MODULE: ./src/js/services/localStorageService.js
const taskArray = "taskArray";
class localStorageService {
  static pushTask(task) {
    const tasks = this.getTasks(taskArray);
    tasks.push(task);
    localStorage.setItem(taskArray, JSON.stringify(tasks));
  }
  static getTasks() {
    const tasksString = localStorage.getItem(taskArray);
    const tasks = tasksString ? JSON.parse(tasksString) : [];
    return tasks;
  }
  static setTasks(tasks) {
    localStorage.setItem(taskArray, JSON.stringify(tasks));
  }
}
;// CONCATENATED MODULE: ./src/js/components/column/column.js



class Column {
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
    createTaskButton.addEventListener("click", e => {
      e.target.classList.add("create-task-button__hide");
      const addTaskFormWrapperEl = addTaskButtonWrapperEl.querySelector(".add-task-form-wrapper");
      addTaskFormWrapperEl.classList.add("add-task-form-wrapper__active");
    });
    return addTaskButtonWrapperEl;
  }
  getAddTaskFormEl(createTaskButton) {
    const addTaskFormWrapperEl = document.createElement("form");
    addTaskFormWrapperEl.classList.add("add-task-form-wrapper");
    const addTaskTextareaEl = document.createElement("textarea");
    addTaskTextareaEl.classList.add("add-task-textarea");
    addTaskTextareaEl.setAttribute("placeholder", "Enter a title for this card...");
    addTaskFormWrapperEl.appendChild(addTaskTextareaEl);
    addTaskFormWrapperEl.appendChild(this.getAddTaskFormButtonsEl(createTaskButton, addTaskFormWrapperEl));
    const addOptionsButton = this.getOptionsButtonEl();
    addOptionsButton.classList.add("add-options-button");
    addTaskFormWrapperEl.appendChild(addOptionsButton);
    addTaskFormWrapperEl.addEventListener("submit", e => {
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
    const addTaskTextareaEl = addTaskFormWrapperEl.querySelector(".add-task-textarea");
    addTaskButtonEl.addEventListener("click", e => {
      e.preventDefault();
      if (addTaskTextareaEl.value) {
        createTaskButton.classList.remove("create-task-button__hide");
        addTaskFormWrapperEl.classList.remove("add-task-form-wrapper__active");
        this.addTask(false, addTaskTextareaEl.value, false);
        addTaskTextareaEl.value = "";
      } else {
        addTaskTextareaEl.classList.add("add-task-textarea__borderRed");
      }
    });
    closeTaskFormButtonEl.addEventListener("click", e => {
      e.preventDefault();
      addTaskTextareaEl.classList.remove("add-task-textarea__borderRed");
      createTaskButton.classList.remove("create-task-button__hide");
      addTaskFormWrapperEl.classList.remove("add-task-form-wrapper__active");
    });
    return wraperButtonsTaskEl;
  }
  addTask(id, name, isPageLoaded) {
    const task = new Task(id, name, "", this.tasksArray.length, this.columnName);
    this.tasksArray.push(task);
    if (!isPageLoaded) {
      localStorageService.pushTask(task);
    }

    //const taskEl = new TaskEl(task, this.tasksListEl, isPageLoaded);

    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    taskEl.setAttribute("data-id", task.id);
    taskEl.textContent = task.name;
    const closeTaskButton = document.createElement("button");
    closeTaskButton.classList.add("close-task-button");
    taskEl.appendChild(closeTaskButton);
    this.tasksListEl.appendChild(taskEl);
  }
  removeTask(taskId) {
    const removedTaskIndex = this.tasksArray.findIndex(element => element.id === taskId);
    if (removedTaskIndex >= 0) {
      this.tasksArray.splice(removedTaskIndex, 1);
      this.tasksArray.forEach((element, index) => element.order = index);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/components/board/board.js



class Board {
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
      const todoTaskArray = taskArray.filter(el => el.status === "ToDo");
      const todoProgressArray = taskArray.filter(el => el.status === "Progress");
      const todoDoneArray = taskArray.filter(el => el.status === "Done");
      this.drawUI();
      this.isPageLoaded = true;
      if (todoTaskArray.length > 0) {
        todoTaskArray.sort((firstEl, secondEl) => firstEl.order - secondEl.order);
        todoTaskArray.forEach(el => this.columnTodo.addTask(el.id, el.name, true));
      }
      if (todoProgressArray.length > 0) {
        todoProgressArray.sort((firstEl, secondEl) => firstEl.order - secondEl.order);
        todoProgressArray.forEach(el => this.columnProgress.addTask(el.id, el.name, true));
      }
      if (todoDoneArray.length > 0) {
        todoDoneArray.sort((firstEl, secondEl) => firstEl.order - secondEl.order);
        todoDoneArray.forEach(el => this.columnDone.addTask(el.id, el.name, true));
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
      trelloBoardEl.addEventListener("click", e => {
        if (e.target.classList.contains("close-task-button")) {
          this.onRemoveTask(e.target);
        }
      });
      this.addDragAndDropEventListener();
    }
  }
  onRemoveTask(el) {
    const taskEl = el.closest(".task");
    const columnName = taskEl.closest(".column").querySelector(".column-title").textContent;
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
    const taskArray = this.columnTodo.tasksArray.concat(this.columnProgress.tasksArray, this.columnDone.tasksArray);
    localStorageService.setTasks(taskArray);
  }
  addDragAndDropEventListener() {
    document.addEventListener("mousedown", e => {
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
      const midHeightTask = targetEl.getBoundingClientRect().height / 2 + targetEl.getBoundingClientRect().top;
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
    const deletedTaskIndex = this.taskArray.findIndex(el => el.id === this.actualElement.getAttribute("data-id"));
    this.deletedTask = this.taskArray[deletedTaskIndex];
    this.taskArray.splice(deletedTaskIndex, 1);
    localStorageService.setTasks(this.taskArray);
  }
  addTaskInLocalStorage() {
    const columnName = this.plug.closest(".column").querySelector(".column-title").textContent;
    const appendedTaskIndex = Array.from(this.plug.closest(".tasks-list").children).findIndex(el => el === this.plug);
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
    columnTaskArray.forEach((el, index) => el.order = index);
    const allTask = columnTaskArray.concat(tasksInOtherColumns);
    localStorageService.setTasks(allTask);
  }
}
;// CONCATENATED MODULE: ./src/app.js

const conteinerTrelloBoard = document.querySelector(".container-trello-board");
const trelloBoard = new Board(conteinerTrelloBoard);
trelloBoard.drawUI();
;// CONCATENATED MODULE: ./src/index.js


})();

/******/ })()
;