import './trelloBoard.component.css'
import TrelloColumn from '../trelloColumn.Component/trelloColumn.Component';
export default class TrelloBoard {
  constructor(containerEl) {
    this.containerEl = containerEl;
  }

  drowUi() {
    const trelloBoardEl = document.createElement('div');
    trelloBoardEl.classList.add('trello-board');

    const columnTodo = new TrelloColumn(trelloBoardEl, 'ToDo');
    columnTodo.drowColumn()

    const columnProgress = new TrelloColumn(trelloBoardEl, 'Progress');
    columnProgress.drowColumn()

    const columnDone = new TrelloColumn(trelloBoardEl, 'Done');
    columnDone.drowColumn()

    this.containerEl.appendChild(trelloBoardEl);

  }

}
