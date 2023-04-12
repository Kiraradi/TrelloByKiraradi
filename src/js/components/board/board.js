import "./board.css";
import Column from "../column/column";

export default class Board {
  constructor(containerEl) {
    this.containerEl = containerEl;
  }

  drawUI() {
    const trelloBoardEl = document.createElement("div");
    trelloBoardEl.classList.add("board");

    const columnTodo = new Column(trelloBoardEl, "ToDo");
    columnTodo.drawUI();

    const columnProgress = new Column(trelloBoardEl, "Progress");
    columnProgress.drawUI();

    const columnDone = new Column(trelloBoardEl, "Done");
    columnDone.drawUI();

    this.containerEl.appendChild(trelloBoardEl);
  }
}
