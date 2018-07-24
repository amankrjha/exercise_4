import 'jquery';
function loadBoards(){
	$.ajax('http://localhost:3000/boards/1', 
	{
	    dataType: 'json', // type of response data
	    timeout: 500,     // timeout milliseconds
	    success: function (data,status,xhr) {   // success callback function
	        console.log("got response from ajax");
	        console.log(data);
	        boards = JSON.parse(data['data']);
	        console.log(boards);
	        return boards;
	    },
	    error: function (jqXhr, textStatus, errorMessage) { // error callback 
	        if(jqXhr.status !== 404){
            	alert(errorMessage);
            }
	        
	    }
	});
}

function saveBoardsData(){
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
        saveBoardsData();
    },
    error: function (jqXhr, textStatus, errorMessage) {
            if(jqXhr.status === 404){
            	saveBoardsData();
            }
    }
	});

}

export {loadBoards, saveBoards}