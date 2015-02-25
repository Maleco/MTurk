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

function randInt(min,max) {
	 return Math.floor(Math.random()*(max-min+1)+min);
}

function generateFormulas(difficulty) {
	 // Clear previous results
	 formulas.length = 0;
	 xvalues.length = 0;

	 // Generate the formulas
	 for(i=2; i < 10; i++) {
			do {
				 var first = randInt(0,i);
				 var second = randInt(0,i);
			} while ((first+second) != i );
			do {
				 var third = randInt(0,i);
				 var fourth = randInt(0,i);
			} while (third+fourth != first+second || 
				 third == first || third == second || fourth == first || fourth == second
			); 

			// Save the generated formulas + values
			formulas.push(first + ' + ' + second + ' = X');
			formulas.push(third + ' + ' + fourth + ' = X');
			xvalues.push(first+second);
			xvalues.push(third+fourth);
	 }

}

/*
* MAIN LOOP
*/

$(document).ready(function() {

	 //Load the memory script
	 $.getScript("js/memory.js", function(){

			// Set up first board
			generateFormulas(1); 
			newBoard();
			var counter = 0;

			// Loop for future boards
			var refreshID = setInterval(function() {
				 console.log('counter '+counter);
				 if(cleared == 1) {
						alert("Board cleared... generating new board"); 
						generateFormulas(1); 
						newBoard();
						cleared = 0;
						counter++;
				 }
				 if(counter == 2) clearInterval(refreshID);
			}, 500);
	 });
});
