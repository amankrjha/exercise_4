import store from './state';
import 'jquery';
function loadBoards(){
	$.ajax('http://localhost:3000/boards/1', 
	{
	    dataType: 'json', // type of response data
	    timeout: 500,     // timeout milliseconds
	    success: function (data,status,xhr) {   // success callback function
	        console.log("got response from ajax");
	        console.log(data);
	        let boards = JSON.parse(data['data']);
	        console.log(boards);
	        store.dispatch({
				type: 'LOAD_DATA', 
				data: boards
			});
	    },
	    error: function (jqXhr, textStatus, errorMessage) { // error callback 
	        if(jqXhr.status !== 404){
            	alert(errorMessage);
            }else{
          		store.dispatch({
					type: 'LOAD_DATA', 
					data: []
				});  	
            }
	        
	    }
	});
}

function saveBoardsData(boards){
	$.ajax('http://localhost:3000/boards/', {
	    type: 'POST',  // http method
	    async: false,
	    data: {'data' : JSON.stringify(boards)},  // data to submit
	    success: function (data, status, xhr) {
	        console.log("Data saved : ");
	        console.log(data);
	    },
	    error: function (jqXhr, textStatus, errorMessage) {
	            alert('Error' + errorMessage);
	    }
		});
}
function saveBoards(boards){

	$.ajax('http://localhost:3000/boards/1', {
    type: 'DELETE',  // http method
    async: false,
    data: JSON.stringify(boards),  // data to submit
    success: function (data, status, xhr) {
        console.log("Data deleted : ");
        console.log(data);
        saveBoardsData(boards);
    },
    error: function (jqXhr, textStatus, errorMessage) {
            if(jqXhr.status === 404){
            	saveBoardsData();
            }
    }
	});

}
function saveData(){
	let state = store.getState();
	saveBoards(state.boards)
}
store.subscribe(saveData);
loadBoards();
export {loadBoards, saveBoards}