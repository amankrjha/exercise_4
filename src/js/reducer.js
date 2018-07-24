
function getCopyCurrentState(currentState){
	const newState = {};
	if('selectedBoardId' in currentState){
		newState.selectedBoardId = currentState.selectedBoardId;	
	}else{
		newState.selectedBoardId = -99;
	}
	
	newState.boards = []
	currentState.boards.forEach(function(board){
		const currIndex = newState.boards.length;
		newState.boards[currIndex].name = board.name;
		
		const tempList = []
		board.lists.forEach(function(list){
			const currListIndex = tempList.length;
			tempList[currListIndex].name = list.name;

			const cardsList = [];

			list.cards.forEach(function(card){
				cardsList[cardsList.length].name = card.name;
			});

			tempList[currListIndex].cards = cardsList;

		});
		newState.boards[currIndex].lists = tempList;
	});
	return newState;
}

const reducer = function(currentState={selectedBoardId:-999, boards:[]}, action){
	switch(action.type){
		case 'SHOW_BOARDS':
			console.log("In reducer");
			let newState = getCopyCurrentState(currentState);
			newState.selectedBoardId = -99;
			return newState;
			break;
		case 'ADD_BOARD':
			let boardName = action.name;
			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board){
				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list){
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card){
						cardsList[cardsList.length].name = card.name;
					});

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;
			});

			let boardLength = newState.boards.length;
			newState.boards[boardLength].name = boardName;
			newState.boards[boardLength].lists = [];
			return newState;
			break;
		case 'DEL_BOARD':
			let boardId = action.boardId;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, index){

				if(index != boardId){
					let currIndex = newState.boards.length;
					newState.boards[currIndex].name = board.name;
					
					let tempList = []
					board.lists.forEach(function(list){
						let currListIndex = tempList.length;
						tempList[currListIndex].name = list.name;

						let cardsList = [];

						list.cards.forEach(function(card){
							cardsList[cardsList.length].name = card.name;
						});

						tempList[currListIndex].cards = cardsList;

					});
					newState.boards[currIndex].lists = tempList;	
				}
				
			});
			return newState;
			break;
		case 'UPDT_BOARD':
			boardId = action.boardId;
			let newBoarName = action.name;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, index){

				let currIndex = newState.boards.length;

				if(index === boardId){
					newState.boards[currIndex].name = newBoarName;
				}else{
					newState.boards[currIndex].name = board.name;
				}

				let tempList = []
				board.lists.forEach(function(list){
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card){
						cardsList[cardsList.length].name = card.name;
					});

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;	
				
				
			});
			return newState;
			break;

		case 'ADD_LIST': 
			let listName = action.name;
			boardId = currentState.selectedBoardId;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, index){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list){
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card){
						cardsList[cardsList.length].name = card.name;
					});

					tempList[currListIndex].cards = cardsList;

				});

				if(index === boardId){
					tempList[tempList.length] = {
						name: listName,
						cards: []
					}
				}
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;
		case 'UPDT_LIST': 
			listName = action.name;
			boardId = action.boardId;
			let listId = action.listId;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, index){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list, l_index){
					let currListIndex = tempList.length;
					
					if(boardId === index && listId === l_index){
						tempList[currListIndex].name = listName;	
					}else{
						tempList[currListIndex].name = list.name;	
					}
					

					let cardsList = [];

					list.cards.forEach(function(card){
						cardsList[cardsList.length].name = card.name;
					});

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;
		case 'DEL_LIST':
			listId = action.listid;
			boardId = action.boardid;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, b_index){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list, l_index){

					if(b_index !== boardId && l_index !== listId){
						let currListIndex = tempList.length;
						tempList[currListIndex].name = list.name;

						let cardsList = [];

						list.cards.forEach(function(card){
							cardsList[cardsList.length].name = card.name;
						});

						tempList[currListIndex].cards = cardsList;
					}

				});
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;
		case 'ADD_CARD':
			boardId = action.boardId;
			listId = action.listid;
			let cardName = action.cardName;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, bIndex){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list, lIndex){

					
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card){
						cardsList[cardsList.length].name = card.name;
					});

					if(boardId === bIndex  && listId === lIndex){
						cardsList[cardsList.length].name = cardName;							
					}

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;
		case 'DEL_CARD':
			boardId = action.boardId;
			listId = action.listId;
			cardId = action.cardId;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, bIndex){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list, lIndex){

					
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card, cIndex){
						if(boardId !== bIndex  && listId !== lIndex && cardId !== cIndex){
							cardsList[cardsList.length].name = card.name;
						}
					});

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;
		case 'UPDT_CARD':
			boardId = action.boardId;
			listId = action.listId;
			cardId = action.cardId;
			let newCardName = action.name;

			newState = {};
			newState.selectedBoardId = currentState.selectedBoardId;
			newState.boards = []
			currentState.boards.forEach(function(board, bIndex){

				let currIndex = newState.boards.length;
				newState.boards[currIndex].name = board.name;
				
				let tempList = []
				board.lists.forEach(function(list, lIndex){

					
					let currListIndex = tempList.length;
					tempList[currListIndex].name = list.name;

					let cardsList = [];

					list.cards.forEach(function(card, cIndex){
						if(boardId !== bIndex  && listId !== lIndex && cardId !== cIndex){
							cardsList[cardsList.length].name = card.name;
						}else{
							cardsList[cardsList.length].name = newCardName;
						}
					});

					tempList[currListIndex].cards = cardsList;

				});
				newState.boards[currIndex].lists = tempList;	
				
			});
			return newState;
			break;

	}
};
export default reducer;