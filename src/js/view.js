import 'jquery';
import 'jquery-ui';
var sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

var boardsDiv = document.getElementById("boardList");
//var boardsDiv = $("#boardList");
var createBoardForm = document.getElementById("createBoard");
var createListForm = document.getElementById("createList");
var boardHeaderLabel = document.getElementById("boardHeaderLabel");
var boardHeaderName = document.getElementById("boardHeaderName");
var boardDetails = document.getElementById("boardDetails");

function v_addBoard(getBoardDetails, board_id, updateBoard, deleteBoard, showBoardDetails, initSort){

	/*
		<div class="card m_boardsBox">
			<div class="d-flex justify-content-end mt-1 mr-1">
				<img src="img/edit.png" class="m_icon" alt="">
				<img src="img/delete.png" class="m_icon" alt="">
			</div>
		  <div class="card-body pt-1">
		    <h5 class="card-title">Card title</h5>
		  </div>
		</div>
	*/
	var boardName = getBoardDetails(board_id).name;

	console.log("createBoardView is called");
	var board_div = document.createElement('div');
	board_div.className = 'card m_boardsBox';
	board_div.setAttribute("board-id", board_id);

	var board_header_div = document.createElement('div');
	board_header_div.className = 'd-flex justify-content-end mt-1 mr-1 m_boardCardHeader';

	var edit_button = document.createElement('button');
	edit_button.className = "m_boardIcon boardEditIcon";
	edit_button.setAttribute("board_id", board_id);

	var edit_img = document.createElement('img');
	edit_img.className = "m_icon";
	edit_img.setAttribute("alt", "Edit "+boardName);
	edit_img.setAttribute("src", "img/edit.png");
	edit_img.setAttribute("board_id", board_id);

	edit_button.appendChild(edit_img);

	var delete_button = document.createElement('button');
	delete_button.className = "m_boardIcon boardDeleteIcon";
	delete_button.setAttribute("board_id", board_id);

	var delete_img = document.createElement('img');
	delete_img.className = "m_icon";
	delete_img.setAttribute("alt", "Delete "+boardName);
	delete_img.setAttribute("src", "img/delete.png");
	delete_img.setAttribute("board_id", board_id);

	delete_button.appendChild(delete_img);

	board_header_div.appendChild(edit_button);
	board_header_div.appendChild(delete_button);

	
	var board_body_div = document.createElement('div');
	board_body_div.className = 'card-body pt-1';


	var board_body_h5 = document.createElement('h5');
	board_body_h5.className = 'card-title';
	board_body_h5.appendChild(document.createTextNode(boardName));
	//board_body_div.appendChild(board_body_h5);

	var board_body_a = document.createElement('a');
	board_body_a.setAttribute("href", "#");
	board_body_a.setAttribute("board_id", board_id);
	board_body_a.addEventListener('click', function(event){
		showBoardDetails(board_id);
	});
	board_body_a.appendChild(board_body_h5);
	board_body_div.appendChild(board_body_a);


	var board_body_form = document.createElement('form');
	board_body_form.className = 'form-inline d-none';

	var board_body_form_input = document.createElement('input');
	board_body_form_input.className = 'form-control w-100';
	board_body_form_input.setAttribute("board_id", board_id);
	board_body_form.appendChild(board_body_form_input);
	board_body_div.appendChild(board_body_form);
	

	board_div.appendChild(board_header_div);
	board_div.appendChild(board_body_div);

	boardsDiv.append(board_div);

	edit_button.addEventListener('click', function(event){
		event.preventDefault();
		console.log("edit button called for - board id : "+board_id);
		board_body_form.className = 'form-inline';
		board_body_h5.className = 'card-title d-none';
		board_body_form_input.value = getBoardDetails(board_id).name;
		board_body_form_input.focus();
		//trying
		//board_div.style.minWidth = window.getComputedStyle(board_div, null).getPropertyValue('width');
	});

	board_body_form_input.addEventListener("keydown", function(event){
		if(event.keyCode === 13){
			event.preventDefault();
			console.log("enter called for - board id : "+board_id);
			updateBoard(board_id, board_body_form_input.value);
			var new_boardName = getBoardDetails(board_id).name;
			edit_img.setAttribute("alt", "Edit "+new_boardName);
			delete_img.setAttribute("alt", "Delete "+new_boardName);
			board_body_h5.innerHTML = '';
			board_body_h5.appendChild(document.createTextNode(new_boardName));
			board_body_form.className = 'form-inline d-none';
			board_body_h5.className = 'card-title d-block';
		}else if(event.keyCode === 27){
			board_body_form.className = 'form-inline d-none';
			board_body_h5.className = 'card-title d-block';
		}
		return false;
	});

	board_body_form_input.addEventListener("focusout", function(event){
		board_body_form.className = 'form-inline d-none';
		board_body_h5.className = 'card-title d-block';
	})

	delete_button.addEventListener('click', function(){
		event.preventDefault();
		board_div.remove();
		//boardsDiv.removeChild(board_div);

	});
	console.log("createBoardView ended");

	initSort();

}
function v_showBoardDetails(boardName){
	console.log("v_showBoardDetails  is called");
	createBoardForm.className = 'form-inline d-none';
	createListForm.className = 'form-inline';
	boardsDiv.className  = 'container flex-wrap flex-column flex-md-row d-none';
	boardHeaderLabel.className = 'col d-flex justify-content-center';
	boardDetails.className = 'd-flex flex-column flex-md-row';
	boardDetails.innerHTML = '';
	boardHeaderName.innerHTML = '';
	boardHeaderName.appendChild(document.createTextNode(boardName));
	//initSort();

}

function v_showListBoards(boardName){
	console.log("v_showListBoards  is called");
	createBoardForm.className = 'form-inline';
	createListForm.className = 'form-inline d-none';
	boardsDiv.className  = 'container d-flex flex-wrap flex-column flex-md-row';
	boardsDiv.innerHTML = '';
	boardHeaderLabel.className = 'col d-none justify-content-center';
	boardDetails.className = 'd-none';
	boardHeaderName.innerHTML = '';
	//boardHeaderName.appendChild(document.createTextNode(boardName));
	//initSort();

}


function createCardListItem(cardName, cardId, listId, m_deleteCard, m_editCard){
	var ul_card_li = document.createElement("li");
	ul_card_li.className = "d-flex flex-row justify-content-between m_card rounded";
	ul_card_li.setAttribute("card_id", cardId);
	ul_card_li.setAttribute("list_id", listId);


	var ul_card_li_p = document.createElement('p');
	ul_card_li_p.className = "mb-0";
	ul_card_li_p.appendChild(document.createTextNode(cardName));
	ul_card_li.appendChild(ul_card_li_p);

	var li_body_form = document.createElement('form');
	li_body_form.className = 'form-inline d-none';

	var li_body_form_input = document.createElement('input');
	li_body_form_input.className = 'form-control w-100';
	li_body_form_input.setAttribute("list_id", listId);
	li_body_form.appendChild(li_body_form_input);
	ul_card_li.appendChild(li_body_form);

	var span = document.createElement("span");
	span.className = "m_card_icon_span";

	var edit_img = document.createElement("img");
	edit_img.className = "m_smallicon";
	edit_img.setAttribute("alt", "Edit "+cardName);
	edit_img.setAttribute("src", "img/edit.png");

	var edit_button = document.createElement('button');
	edit_button.className = "m_listIcon cardEditIcon";
	edit_button.setAttribute("card_id", cardId);
	edit_button.setAttribute("list_id", listId);

	edit_button.appendChild(edit_img);
	edit_button.addEventListener('click', function(event){
		ul_card_li_p.className = 'mb-0 d-none';
		li_body_form.className = 'form-inline';		
		span.className = "m_card_icon_span d-none";
		li_body_form_input.focus();
	});

	li_body_form_input.addEventListener('keydown', function(event){
		if(event.keyCode === 13){
			event.preventDefault();
			m_editCard(listId, cardId, li_body_form_input.value);
			ul_card_li_p.innerHTML = '';
			ul_card_li_p.appendChild(document.createTextNode(li_body_form_input.value));
			ul_card_li_p.className = '';
			li_body_form.className = 'form-inline d-none';	
			span.className = "m_card_icon_span";
			console.log("enter called for - card id : "+cardId);
		}else if(event.keyCode === 27){
			ul_card_li_p.className = 'mb-0';
			li_body_form.className = 'form-inline d-none';		
			span.className = "m_card_icon_span";
		}
		return false;
	});

	li_body_form_input.addEventListener('focusout', function(event){

		ul_card_li_p.className = 'mb-0';
		li_body_form.className = 'form-inline d-none';		
		span.className = "m_card_icon_span";
	});

	var delete_img = document.createElement("img");
	delete_img.className = "m_smallicon";
	delete_img.setAttribute("src", "img/delete.png");
	delete_img.setAttribute("alt", "Delete "+cardName);

	var delete_button = document.createElement('button');
	delete_button.className = "m_listIcon cardDeleteIcon";
	delete_button.setAttribute("card_id", cardId);
	delete_button.setAttribute("list_id", listId);

	delete_button.appendChild(delete_img);

	span.appendChild(edit_button);
	span.appendChild(delete_button);

	ul_card_li.appendChild(span);

	delete_button.addEventListener('click', function(event){
		m_deleteCard(listId, cardId);
		ul_card_li.remove();		
	})

	return ul_card_li;
}

function v_addList(m_getListDetails, listId, updateList, deleteList, m_addCard, m_deleteCard, m_editCard, m_getCard, m_resetCards, initSort){
	/*
	<div class="card m_listBox">
		  <div class="card-header">
		  	<h5>List name</h5>
		  </div>
		  <div class="card-body px-0 py-0">
			  <ul class="list-group m_card_list list-group-flush">
			    <li class="d-flex flex-row justify-content-between m_card rounded">Cras justo odio
			    	<span class="m_card_icon_span">
			    		<img src="img/edit.png" class="m_smallicon" alt="">
						<img src="img/delete.png" class="m_smallicon" alt="">
			    	</span>
			    </li>
			    <li class="d-flex flex-row justify-content-between m_card rounded">Vestibulum at eros Dapibus ac facilisis in
					<span class="m_card_icon_span">
			    		<img src="img/edit.png" class="m_smallicon" alt="">
						<img src="img/delete.png" class="m_smallicon" alt="">
			    	</span>
			    </li>
			    <li class="d-flex flex-row justify-content-between m_card rounded">Vestibulum at eros
					<span class="m_card_icon_span">
			    		<img src="img/edit.png" class="m_smallicon" alt="">
						<img src="img/delete.png" class="m_smallicon" alt="">
			    	</span>
			    </li>
			  </ul>
		  </div>
		  <div class="card-footer">
		  		<a href="#">Add a Card</a>
		  </div>
		</div>
	*/
	console.log("v_addList - is called");
	var listName = m_getListDetails(listId).name;
	var cardList = m_getListDetails(listId).cards;

	console.log("v_addList is called");
	var list_div = document.createElement('div');
	list_div.className = "card m_listBox";

	list_div.setAttribute("list-id", listId);

	var div_header = document.createElement('div');
	div_header.className = "card-header d-flex justify-content-between";

	var header_h5 = document.createElement('h5');
	header_h5.appendChild(document.createTextNode(listName));

	div_header.appendChild(header_h5);

	var list_header_form = document.createElement('form');
	list_header_form.className = 'form-inline d-none';

	var list_header_form_input = document.createElement('input');
	list_header_form_input.className = 'form-control w-100';
	list_header_form_input.setAttribute("list_id", listId);
	list_header_form.appendChild(list_header_form_input);
	div_header.appendChild(list_header_form);
	
	var span = document.createElement("span");
	span.className = "m_card_icon_span";

	var edit_img = document.createElement("img");
	edit_img.className = "m_smallicon";
	edit_img.setAttribute("alt", "Edit "+listName);
	edit_img.setAttribute("src", "img/edit.png");

	var edit_button = document.createElement('button');
	edit_button.className = "m_listIcon listEditIcon";
	edit_button.setAttribute("list_id", listId);

	edit_button.appendChild(edit_img);
	edit_button.addEventListener('click', function(event){
		header_h5.className = 'mb-0 d-none';
		list_header_form.className = 'form-inline w-100';		
		span.className = "m_card_icon_span d-none";
		list_header_form_input.value = listName;
		list_header_form_input.focus();
	});

	var delete_img = document.createElement("img");
	delete_img.className = "m_smallicon";
	delete_img.setAttribute("src", "img/delete.png");
	delete_img.setAttribute("alt", "Delete "+listName);

	var delete_button = document.createElement('button');
	delete_button.className = "m_listIcon listDeleteIcon";
	delete_button.setAttribute("list_id", listId);

	delete_button.appendChild(delete_img);
	delete_button.addEventListener('click', function(event){
		deleteList(listId);
		list_div.remove();
	});


	list_header_form_input.addEventListener('keydown', function(event){
		if(event.keyCode === 13){
			event.preventDefault();
			updateList(listId, list_header_form_input.value);
			header_h5.innerHTML = '';
			header_h5.appendChild(document.createTextNode(list_header_form_input.value));

			header_h5.className = 'mb-0';
			list_header_form.className = 'form-inline w-100  d-none';		
			span.className = "m_card_icon_span";

			console.log("enter called for - list id : "+listId);
		}else if(event.keyCode === 27){

			header_h5.className = 'mb-0';
			list_header_form.className = 'form-inline w-100  d-none';		
			span.className = "m_card_icon_span";
		}
		return false;
	});


	list_header_form_input.addEventListener('focusout', function(event){
		header_h5.className = 'mb-0';
		list_header_form.className = 'form-inline w-100  d-none';		
		span.className = "m_card_icon_span";
	});


	span.appendChild(edit_button);
	span.appendChild(delete_button);
	div_header.appendChild(span);

	list_div.appendChild(div_header);

	var card_body = document.createElement('div');
	card_body.className = "card-body px-0 py-0 m_card_list";

	var card_body_ul = document.createElement('ul');
	card_body_ul.setAttribute("list_id", listId);
	card_body_ul.className = "list-group m_card_list list-group-flush";
	card_body_ul.style.minHeight = "60px";
	
	
	for(var i=0; i< cardList.length; i++){
		
		var ul_card_li = createCardListItem(cardList[i].name, i, listId, m_deleteCard, m_editCard);
		card_body_ul.appendChild(ul_card_li);

	}
	
	card_body.appendChild(card_body_ul);
	list_div.appendChild(card_body);

	var card_footer = document.createElement('div');
	card_footer.className = "card-footer"

	var card_footer_a = document.createElement('a');
	card_footer_a.setAttribute('href', '#');
	card_footer_a.appendChild(document.createTextNode("Add a Card"));
	card_footer.appendChild(card_footer_a);

	var board_body_form = document.createElement('form');
	board_body_form.className = 'form-inline d-none';

	var board_body_form_input = document.createElement('input');
	board_body_form_input.className = 'form-control w-100';
	board_body_form_input.setAttribute("list_id", listId);
	board_body_form.appendChild(board_body_form_input);
	card_footer.appendChild(board_body_form);
	list_div.appendChild(card_footer);

	card_footer_a.addEventListener('click', function(){
		board_body_form.className = 'form-inline';		
		card_footer_a.className = 'd-none';
		board_body_form_input.setAttribute("placeholder", "Enter Card details"); 
		board_body_form_input.value = '';
		board_body_form_input.focus();
	});

	board_body_form_input.addEventListener('keydown', function(event){
		if(event.keyCode === 13){
			event.preventDefault();
			var cardId  = m_addCard(listId, board_body_form_input.value);
			var cardDetail = m_getCard(listId, cardId)
			var ul_card_li = createCardListItem(cardDetail.name, cardId, listId, m_deleteCard, m_editCard);
			card_body_ul.appendChild(ul_card_li);
			board_body_form_input.value = "";
			console.log("enter called for - list id : "+listId);
		}else if(event.keyCode === 27){
			board_body_form.className = 'form-inline d-none';		
			card_footer_a.className = 'd-block';
		}
		return false;
	});

	board_body_form_input.addEventListener('focusout', function(event){
		board_body_form.className = 'form-inline d-none';		
		card_footer_a.className = 'd-block';
	});

	$(card_body_ul).sortable({
		connectWith: "ul",
		update: function(event){
			console.log("card ul body list update event");
			console.log(event);
			console.log(this);

			var temp_list_id = this.getAttribute('list_id');

			//var temp_card_list = [];

			m_resetCards(temp_list_id);

			var lis = this.getElementsByTagName('li');
			console.log(lis);
			for(var i=0; i < lis.length; i++){
				var tp = lis[i].getElementsByTagName('p');
				m_addCard(temp_list_id, tp[0].innerText);
				//temp_card_list.push(tp[0].innerText);
			}
			
			//console.log(temp_card_list);
			//console.log(temp_list_id);

			}
	});

	boardDetails.appendChild(list_div);

	initSort();
}
export{v_addBoard, v_showBoardDetails, v_showListBoards, v_addList}