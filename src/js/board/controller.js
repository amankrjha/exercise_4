import 'jquery';
import 'jquery-ui';
var sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

import boardsView from './view';
import store from '../state';


$('#boardList').on('click', '.boardEditIcon', showBoardEdit);
$('#boardList').on('click', '.boardDeleteIcon', deleteBoard);
$('#boardList').on('keydown', 'input.form-control', updateBoardDetail);
$('#boardList').on('focusout', 'input.form-control', hideBoardEditForm);
$('#boardList').on('click', 'a', showBoardDetails);

function showBoardDetails(event){
	console.log("In controller showBoardDetails");
	console.log(event);
	store.dispatch({
			type: 'SHOW_BOARD_DETAIL', 
			boardId: event.target.getAttribute('board-id')
		});
}
function deleteBoard(event){
	store.dispatch({
			type: 'DEL_BOARD', 
			boardId: event.target.getAttribute('board-id')
		});
}

function hideBoardEditForm(event){
	boardsView.hideBoardEditForm(event.target.getAttribute('board-id'));
}

function updateBoardDetail(event){
	if(event.keyCode === 13){	
		event.preventDefault();
		store.dispatch({
			type: 'UPDT_BOARD', 
			name: event.target.value, 
			boardId: event.target.getAttribute('board-id')
		});
		return false;
	}else if(event.keyCode === 27){
		boardsView.hideBoardEditForm(event.target.getAttribute('board-id'));
	}
}


function showBoardEdit(event){
	console.log("i am in showBoardEdit");
	boardsView.showBoardEditForm(event.target.getAttribute('board-id'));
}
function makeSortable(){
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

			console.log(newOrder);
			store.dispatch({
				type: 'RE_ORDER_BOARD', 
				order: newOrder
			});

		}
	});
}
function render(){
	console.log("In boards controller");
	let state = store.getState();
	console.log(state.boards);
	if(state.selectedBoardId >= 0){
		boardsView.hideBoards();
	}else{
		boardsView.showBoards(state.boards);
		makeSortable();

	}
}
store.subscribe(render);
