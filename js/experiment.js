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
function formatTime(time) {
	var timeLog = (
		("0" + time.getHours()).slice(-2) + ":" + 
			("0" + time.getMinutes()).slice(-2) + ":" + 
			("0" + time.getSeconds()).slice(-2)); 

	return timeLog;
}

function visible() {
	console.log(formatTime(new Date()) + ' Gained visibility');
}

function invisible() {
	console.log(formatTime(new Date()) + ' Lost visibility');
}

// Fisher-Yates shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
/*
* MAIN LOOP
*/

// Add the focus listeners
window.addEventListener("focus", visible, false);
window.addEventListener("blur", invisible, false);

//Load the required scripts
$.when(
	$.getScript( "/js/memory.js" ),
	$.getScript( "/js/algebra.js" ),
	$.getScript( "/js/jquery-visibility.js" ),
	$.Deferred(function( deferred ){
		$( deferred.resolve );
	})

	// Execute code
).done(function(){

	var counter = -1;
	var startTime = new Date();

	var init = shuffle([1, 2, 3]);
	console.log(init);
	var difficulty = init[0];
	
	// Loop for future boards
	var refreshID = setInterval(function() 
	{
		// Stop 
		if (counter == 2 && cleared == 1) 
		{
			// Go to final page
			window.location.replace("http://www.google.com");
		}
		// Set up first board
		else if(counter == -1) 
		{
			counter++;
			generateFormulas(difficulty); 

			console.log('counter '+counter);
			console.log(formulas);
			console.log(xvalues);
			
			newBoard();
		} 
		// Set up a new board
		else if (cleared == 1 )
		{
			cleared = 0;
			counter++;
			difficulty = init[counter];
			alert("Board cleared... generating new board"); 
			generateFormulas(difficulty); 

			console.log('counter '+counter);
			console.log(formulas);
			console.log(xvalues);

			newBoard();
		} 
	}, 500);
});
