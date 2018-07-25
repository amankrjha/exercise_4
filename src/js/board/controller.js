import boardsView from './view';
import store from '../state';


$('#boardList').on('click', '.boardEditIcon', showBoardEdit);
$('#boardList').on('keydown', 'input.form-control', updateBoardDetail);

function updateBoardDetail(event){
	if(event.keyCode === 13){	
		store.dispatch({
			type: 'UPDT_BOARD', 
			name: event.target.value, 
			boardId: event.target.getAttribute('board-id')
		});
	}else if(event.keyCode === 27){
		boardsView.hideBoardEditForm(event.target.getAttribute('board-id'));
	}
}


function showBoardEdit(event){
	console.log("i am in showBoardEdit");
	boardsView.showBoardEditForm(event.target.getAttribute('board-id'));
}

function render(){
	console.log("In boards controller");
	let state = store.getState();
	console.log(state.boards);
	if(state.selectedBoardId >= 0){
		boardsView.hideBoards();
	}else{
		boardsView.showBoards(state.boards);
	}
}
store.subscribe(render);
