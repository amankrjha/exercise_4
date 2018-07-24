import nav from './view.js';
import store from '../state';

nav.showNavForBoardList();

$('#trelloNavBar').on('click', '#createBoardBtn', createBoard);
$('#trelloNavBar').on('keydown', '#createBoardInput', createBoardKey);
$('#trelloNavBar').on('click', '#createListBtn', createList);
$('#trelloNavBar').on('keydown', '#createListInput', createListKey);

var myTrelloLogo = document.getElementById('myTrelloLogo');

myTrelloLogo.addEventListener('click', function(event){
	store.dispatch({type: 'SHOW_BOARDS'});
});

function createBoardKey(event){
	if(event.keyCode === 13){
		event.preventDefault();
		createBoard();
		return false;
	}
}

function createBoard(){
	let createBoardInput = document.getElementById('#createBoardInput');
	if(createBoardInput.value){
		store.dispatch({type: 'ADD_BOARD', name: createBoardInput.value});
	}
	
}

function createList(){
	let createListInput = document.getElementById('#createListInput');
	if(createListInput.value){
		store.dispatch({type: 'ADD_LIST', name: createListInput.value});	
	}
}

function render(){
	let state = store.getState();
	if(state.selectedBoardId >= 0){
		nav.showNavForBoardDetails(state.boards[state.selectedBoardId].name);
	}else{
		nav.showNavForBoardList();
	}
}

store.subscribe(render);