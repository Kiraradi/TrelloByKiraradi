import Board from "./js/components/board/board";

const conteinerTrelloBoard = document.querySelector(".container-trello-board");

const trelloBoard = new Board(conteinerTrelloBoard);

trelloBoard.drawUI();
