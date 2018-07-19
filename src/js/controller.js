import 'jquery';
import 'jquery-ui';
var sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

import {m_addBoard, m_deleteBoard, m_updateBoard, m_getBoardDetails, m_getSelectedBoardId, m_setSelectedBoardId, m_getListDetails, m_editList, m_deleteList, m_addList, m_addCard, m_deleteCard, m_editCard, m_getCard, m_resetCards, m_rearrangeList, m_rearrageBoards, m_getBoards} from './model.js';
import {v_addBoard, v_showBoardDetails, v_showListBoards, v_addList} from './view.js';

var createBoardButton = document.getElementById("createBoardBtn");
var createBoardInput = document.getElementById("createBoardInput");
var myTrelloLogo = document.getElementById('myTrelloLogo');
var createListInput = document.getElementById('createListInput');
var createListBtn = document.getElementById('createListBtn');

createBoardButton.addEventListener('click', createBoard);
createBoardInput.addEventListener('keydown', createBoardKey);

createListBtn.addEventListener('click', createList);
createListInput.addEventListener('keydown', createListKey);

myTrelloLogo.addEventListener('click', showListOfBoards);


function createListKey(event){
	if(event.keyCode === 13){
		event.preventDefault();
		createList();
		return false;
	}
}

function createList(){
	var listId = m_addList(createListInput.value);

	v_addList(m_getListDetails, listId, updateList, deleteList, m_addCard, m_deleteCard, m_editCard, m_getCard, m_resetCards, initSort);
	//registerIconEvent();
	createListInput.value = '';
	initSort();
}

function updateList(id, value){
	m_editList(id, value);
}
function deleteList(id){
	m_deleteList(id);
}

function createBoardKey(event){
	if(event.keyCode === 13){
		event.preventDefault();
		createBoard();
		return false;
	}
}

function createBoard(){
	var boardId = m_addBoard(createBoardInput.value);

	v_addBoard(getBoardDetails, boardId, updateBoard, deleteBoard, showBoardDetails, initSort);
	//registerIconEvent();
	createBoardInput.value = '';
	initSort();
}
function getBoardDetails(boardId){
	return m_getBoardDetails(boardId);
}

function editBoard(event){
	console.log("controller - editboard is called : ");
	console.log(event);
}

function updateBoard(id, value){
	m_updateBoard(id, value);
}
function deleteBoard(id){
	console.log("controller -  deleteBoard is called ");
	m_deleteBoard(id);
}
function showBoardDetails(boardId){
	console.log("controller - showBoardDetails ");
	console.log(boardId);
	m_setSelectedBoardId(boardId);
	var board = m_getBoardDetails(m_getSelectedBoardId());
	v_showBoardDetails(board.name);

	console.log(board);
	for(var i =0; i < board.lists.length; i++){
		console.log(board.lists[i]);
		v_addList(m_getListDetails, i, updateList, deleteList, m_addCard, m_deleteCard, m_editCard, m_getCard, m_resetCards, initSort);
	}

	initSort();
}
function showListOfBoards(){
	m_setSelectedBoardId(-1);
	v_showListBoards();

	var boards = m_getBoards();

	for(var i=0; i < boards.length; i++){
		v_addBoard(getBoardDetails, i, updateBoard, deleteBoard, showBoardDetails, initSort);
	}
	initSort();
}
function rearrangeList(newOrder){
	m_rearrangeList(newOrder);
	var board = m_getBoardDetails(m_getSelectedBoardId());
	v_showBoardDetails(board.name);

	console.log(board);
	for(var i =0; i < board.lists.length; i++){
		console.log(board.lists[i]);
		v_addList(m_getListDetails, i, updateList, deleteList, m_addCard, m_deleteCard, m_editCard, m_getCard, m_resetCards, initSort);
	}
}

function rearrangeBoards(newOrder){
	m_rearrageBoards(newOrder);
	showListOfBoards();
}

function initSort(){
	$("#boardList").sortable({
		update: function(event){
			console.log("board list update event");
			console.log(event);
			console.log(this);
			var newOrder = [];
			var lis = this.getElementsByClassName("m_boardsBox");
			for(var i=0; i< lis.length; i++){
				console.log(lis[i])
				newOrder.push((lis[i].getAttribute('board-id')));
			}

			rearrangeBoards(newOrder);

		}
	});
	$("#boardDetails").sortable({
  			handle: ".card-header",
  			update: function(event){
			console.log("boardDetails list update event");
			console.log(event);
			console.log(this);
			var newOrder = [];
			var lis = this.getElementsByClassName("m_listBox");
			for(var i=0; i< lis.length; i++){
				console.log(lis[i])
				newOrder.push((lis[i].getAttribute('list-id')));
			}

			rearrangeList(newOrder);
			}
		});
}
initSort();