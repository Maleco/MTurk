/*
* GLOBAL VARIABLES
*/

// The formulas
var formulas = [] 
// The x-values
var xvalues = [] 
var cleared = 0;

/*
* GLOBAL FUNCTIONS
*/

/*
* MAIN LOOP
*/

//Load the required scripts
$.when(
	$.getScript( "/js/memory.js" ),
	$.getScript( "/js/algebra.js" ),
	$.Deferred(function( deferred ){
		$( deferred.resolve );
	})

	// Execute code
).done(function(){

	var counter = 0;
	// Loop for future boards
	var refreshID = setInterval(function() {


		if(counter == 0) 
			// Set up first board
		{
			counter++;
			generateFormulas(counter); 

			console.log('counter '+counter);
			console.log(formulas);
			console.log(xvalues);
			
			newBoard();
		} else if (cleared == 1 )
		{
			counter++;
			alert("Board cleared... generating new board"); 
			generateFormulas(counter); 

			console.log('counter '+counter);
			console.log(formulas);
			console.log(xvalues);

			newBoard();
			cleared = 0;
		} 
		if(counter == 4) clearInterval(refreshID);

	}, 500);
});
