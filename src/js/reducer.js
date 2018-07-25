
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
		newState.boards[currIndex] = {
			name: board.name,
			lists: []
		};
		
		const tempList = []
		board.lists.forEach(function(list){
			const currListIndex = tempList.length;
			tempList[currListIndex] = {
				name: list.name,
				cards: []
			};

			const cardsList = [];

			list.cards.forEach(function(card){
				cardsList[cardsList.length] = {
					name: card.name
				};
			});

			tempList[currListIndex].cards = cardsList;

		});
		newState.boards[currIndex].lists = tempList;
	});
	return newState;
}

const reducer = function(currentState={selectedBoardId:-999, boards:[]}, action){
	const newState = getCopyCurrentState(currentState);
	switch(action.type){
		case 'LOAD_DATA':
			console.log("in reducer load data");
			console.log(action);
			newState.selectedBoardId = -99;
			newState.boards = action.data;
			return newState;
			break;
		case 'SHOW_BOARDS':
			console.log("In reducer");
			//let newState = getCopyCurrentState(currentState);
			newState.selectedBoardId = -99;
			return newState;
			break;
		case 'SHOW_BOARD_DETAIL':
			console.log("In reducer SHOW_BOARD_DETAIL");
			//let newState = getCopyCurrentState(currentState);
			newState.selectedBoardId = action.boardId;
			console.log(newState);
			return newState;
			break;
		case 'RE_ORDER_BOARD': 
			console.log("in reducer RE_ORDER_BOARD");
			const newBoardOrder = action.order;
			console.log(newBoardOrder);
			newBoardOrder.forEach(function(newIndex, index){
				newState.boards[index] = currentState.boards[newIndex];
			});
			return newState;
			break;
		case 'RE_ORDER_LIST':
			console.log("in reducer RE_ORDER_LIST");
			const newListOrder = action.order;
			boardId = currentState.selectedBoardId;
			newListOrder.forEach(function(newIndex, index){
				newState.boards[boardId].lists[index] = currentState.boards[boardId].lists[newIndex];
			});
			return newState;
			break;
		case 'ADD_BOARD':
			console.log("In reducer adding board");
			let boardName = action.name;
			
			/*
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
			*/

			let boardLength = newState.boards.length;
			newState.boards[boardLength] = {
				name : boardName,
				lists : []
			};
			return newState;
			break;
		case 'DEL_BOARD':
			let boardId = action.boardId;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, index){

			// 	if(index != boardId){
			// 		let currIndex = newState.boards.length;
			// 		newState.boards[currIndex].name = board.name;
					
			// 		let tempList = []
			// 		board.lists.forEach(function(list){
			// 			let currListIndex = tempList.length;
			// 			tempList[currListIndex].name = list.name;

			// 			let cardsList = [];

			// 			list.cards.forEach(function(card){
			// 				cardsList[cardsList.length].name = card.name;
			// 			});

			// 			tempList[currListIndex].cards = cardsList;

			// 		});
			// 		newState.boards[currIndex].lists = tempList;	
			// 	}
				
			// });
			newState.boards.splice(boardId, 1);
			return newState;
			break;
		case 'UPDT_BOARD':
			console.log("In reducer updating board name");
			console.log(action);
			boardId = action.boardId;
			let newBoardName = action.name;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, index){

			// 	let currIndex = newState.boards.length;
			// 	console.log("index = "+index);
			// 	console.log("boardId = "+boardId);
				
			// 	if(index == boardId){
			// 		newState.boards[currIndex] = {
			// 			name: newBoarName
			// 		};
			// 	}else{
			// 		newState.boards[currIndex] = {
			// 			name: board.name
			// 		}
			// 	}

			// 	let tempList = []
			// 	board.lists.forEach(function(list){
			// 		let currListIndex = tempList.length;
			// 		tempList[currListIndex].name = list.name;

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card){
			// 			cardsList[cardsList.length].name = card.name;
			// 		});

			// 		tempList[currListIndex].cards = cardsList;

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
				
			// });
			newState.boards[boardId].name = newBoardName;
			return newState;
			break;

		case 'ADD_LIST': 
			console.log("In reducer - ADD_LIST");
			let listName = action.name;
			boardId = currentState.selectedBoardId;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, index){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list){
			// 		let currListIndex = tempList.length;
			// 		tempList[currListIndex].name = list.name;

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card){
			// 			cardsList[cardsList.length].name = card.name;
			// 		});

			// 		tempList[currListIndex].cards = cardsList;

			// 	});

			// 	if(index === boardId){
			// 		tempList[tempList.length] = {
			// 			name: listName,
			// 			cards: []
			// 		}
			// 	}
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			newState.boards[boardId].lists[newState.boards[boardId].lists.length] = {
				name: listName,
				cards: []
			};
			console.log(newState);
			return newState;
			break;
		case 'UPDT_LIST': 
			console.log("In reducer - UPD_LIST");
			listName = action.name;
			boardId = currentState.selectedBoardId;
			let listId = action.listId;


			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, index){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list, l_index){
			// 		let currListIndex = tempList.length;
					
			// 		if(boardId === index && listId === l_index){
			// 			tempList[currListIndex].name = listName;	
			// 		}else{
			// 			tempList[currListIndex].name = list.name;	
			// 		}
					

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card){
			// 			cardsList[cardsList.length].name = card.name;
			// 		});

			// 		tempList[currListIndex].cards = cardsList;

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			console.log(action);
			console.log(currentState);
			console.log(newState);
			console.log(newState.boards[boardId]);
			newState.boards[boardId].lists[listId].name = listName;
			return newState;
			break;
		case 'DEL_LIST':
			console.log("in reducer - DEL_LIST");
			console.log(action);
			console.log(currentState);
			listId = action.listId;
			boardId = currentState.selectedBoardId;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, b_index){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list, l_index){

			// 		if(b_index !== boardId && l_index !== listId){
			// 			let currListIndex = tempList.length;
			// 			tempList[currListIndex].name = list.name;

			// 			let cardsList = [];

			// 			list.cards.forEach(function(card){
			// 				cardsList[cardsList.length].name = card.name;
			// 			});

			// 			tempList[currListIndex].cards = cardsList;
			// 		}

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			newState.boards[boardId].lists.splice(listId, 1);
			return newState;
			break;
		case 'ADD_CARD':
			console.log("in reducer - ADD_CARD");
			console.log(action);
			console.log(currentState);
			boardId = currentState.selectedBoardId;
			listId = action.listId;
			let cardName = action.name;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, bIndex){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list, lIndex){

					
			// 		let currListIndex = tempList.length;
			// 		tempList[currListIndex].name = list.name;

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card){
			// 			cardsList[cardsList.length].name = card.name;
			// 		});

			// 		if(boardId === bIndex  && listId === lIndex){
			// 			cardsList[cardsList.length] = {name : cardName};
			// 		}

			// 		tempList[currListIndex].cards = cardsList;

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			console.log(newState);
			newState.boards[boardId].lists[listId].cards[newState.boards[boardId].lists[listId].cards.length] = {
				name : cardName
			};
			newState.selectedListId = listId;
			return newState;
			break;
		case 'RESET_LIST':
			boardId = currentState.selectedBoardId;
			listId = action.listId;
			let cardList = action.cards;
			newState.boards[boardId].lists[listId].cards = [];
			cardList.forEach((card) => {
				newState.boards[boardId].lists[listId].cards[newState.boards[boardId].lists[listId].cards.length] = {
				name : card
			};	
			});
			return newState;
			break;
		case 'DEL_CARD':
			console.log("in reducer - DEL_Card");
			boardId = currentState.selectedBoardId;
			listId = action.listId;
			cardId = action.cardId;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, bIndex){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list, lIndex){

					
			// 		let currListIndex = tempList.length;
			// 		tempList[currListIndex].name = list.name;

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card, cIndex){
			// 			if(boardId !== bIndex  && listId !== lIndex && cardId !== cIndex){
			// 				cardsList[cardsList.length].name = card.name;
			// 			}
			// 		});

			// 		tempList[currListIndex].cards = cardsList;

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			newState.boards[boardId].lists[listId].cards.splice(cardId, 1);
			return newState;
			break;
		case 'UPDT_CARD':
			console.log("in reducer - UPDT_CARD");
			console.log(action);
			console.log(currentState);
			boardId = currentState.selectedBoardId;
			listId = action.listId;
			let cardId = action.cardId;
			let newCardName = action.name;

			// newState = {};
			// newState.selectedBoardId = currentState.selectedBoardId;
			// newState.boards = []
			// currentState.boards.forEach(function(board, bIndex){

			// 	let currIndex = newState.boards.length;
			// 	newState.boards[currIndex].name = board.name;
				
			// 	let tempList = []
			// 	board.lists.forEach(function(list, lIndex){

					
			// 		let currListIndex = tempList.length;
			// 		tempList[currListIndex].name = list.name;

			// 		let cardsList = [];

			// 		list.cards.forEach(function(card, cIndex){
			// 			if(boardId !== bIndex  && listId !== lIndex && cardId !== cIndex){
			// 				cardsList[cardsList.length].name = card.name;
			// 			}else{
			// 				cardsList[cardsList.length].name = newCardName;
			// 			}
			// 		});

			// 		tempList[currListIndex].cards = cardsList;

			// 	});
			// 	newState.boards[currIndex].lists = tempList;	
				
			// });
			newState.boards[boardId].lists[listId].cards[cardId].name = newCardName;
			return newState;
			break;

	}
};
export default reducer;