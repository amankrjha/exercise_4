var boards = [];
var selectedBoard = -1;
function m_addBoard(boardName){
	var board_length = boards.length;
	boards[board_length] = {
		name :  boardName,
		position: board_length,
		lists : []
	}
	return board_length;
}

function m_rearrangeList(newOrder){
	console.log(" rearrangeList is called");
	var tempList = [];

	for(var i=0; i < newOrder.length; i++){
		tempList.push(boards[selectedBoard].lists[newOrder[i]]);
	}

	boards[selectedBoard].lists = tempList;
}

function m_rearrageBoards(newOrder){
	console.log(" rearrageBoards is called");
	var tempList = [];

	for(var i=0; i < newOrder.length; i++){
		tempList.push(boards[newOrder[i]]);
	}

	boards = tempList;	
	console.log(JSON.stringify(boards));
}
function m_getSelectedBoardId(){
	return selectedBoard;
}

function m_setSelectedBoardId(boardId){
	selectedBoard = boardId;
}

function m_getLists(){
	return boards[selectedBoard].lists;
}

function m_getListDetails(listId){
	return boards[selectedBoard].lists[listId];
}
function m_addList(listName){
	var list_length = boards[selectedBoard].lists.length;
	boards[selectedBoard].lists[list_length] = {
		name : listName,
		position : list_length,
		cards : []
	};
	console.log(boards[selectedBoard]);
	return list_length;
}

function m_editList(listId, newListName){
	console.log("m_editList is called for : "+listId);
	boards[selectedBoard].lists[listId].name = newListName
}


function m_deleteList(listId){
	console.log("m_deleteList is called for : "+listId);
	boards[selectedBoard].lists.splice(listId, 1);
}

function m_addCard(listId, cardName){
	var card_length = boards[selectedBoard].lists[listId].cards.length;	
	boards[selectedBoard].lists[listId].cards[card_length] = {
		name: cardName,
		position: card_length
	};
	return card_length
}

function m_resetCards(listId){
	console.log("resetting cards")
	boards[selectedBoard].lists[listId].cards = []
}

function m_getCard(listId, cardId){
	return boards[selectedBoard].lists[listId].cards[cardId];
}

function m_deleteCard(listId, cardId){
	boards[selectedBoard].lists[listId].cards.splice(cardId, 1);	
}

function m_editCard(listId, cardId, newCardName){
	console.log("m_editCard for card id "+cardId);
	var card_length = boards[selectedBoard].lists[listId].cards.length;	
	boards[selectedBoard].lists[listId].cards[cardId].name = newCardName;
	return card_length
}

function m_deleteBoard(boardId){
	console.log("Inside module .. deleteBoard method old length "+boards.length);
	boards.splice(boardId, 1);
	console.log("Inside module .. deleteBoard method old length "+boards.length);
}

function m_updateBoard(boardId, newBoardName){
	console.log("Inside module .. updateBoard method old value ");
	console.log(boards[boardId]);
	boards[boardId].name = newBoardName;
	console.log("Inside module .. updateBoard method new Value value ");
	console.log(boards[boardId]);
}

function m_getBoardDetails(boardId){
	if(boardId >= boards.length){
		return {};
	}
	return boards[boardId];
}

function m_getBoards(){
	return boards;
}

export{m_addBoard, m_deleteBoard, m_updateBoard, m_getBoardDetails, 
	m_getSelectedBoardId, m_setSelectedBoardId, m_getListDetails,
	m_editList, m_deleteList, m_addList, m_addCard,
	m_deleteCard, m_editCard, m_getCard, m_resetCards, m_rearrangeList, m_rearrageBoards, m_getBoards};