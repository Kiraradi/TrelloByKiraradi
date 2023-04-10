import TrelloBoard from "./components/trelloBoard.Component/trelloBoard.Component";

const conteinerTrelloBoard = document.querySelector(".container-trello-board");

const trelloBoard = new TrelloBoard(conteinerTrelloBoard);

trelloBoard.drowUi();
