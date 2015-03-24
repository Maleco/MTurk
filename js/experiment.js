/* TODO
 * 	Freeze the game after each click
 * 	pay $2 + 0.10$ per completed trial with < 30 moves
 * 	12 HIT'S - 2 for each possibility
 * 	Instructions:
 * 		takes 1 hour
 * 		3 practice games: numbers, easy and medium
 */

/***********************************************************************
 * GLOBAL VARIABLES
 ***********************************************************************/

// Logging to csv, columns:
// Time (ms), Participant, P_Age, P_Gender, Difficulty, Block, Trialnr, Move, Card
// Move: 1 = newCard, 2 = Revisit, 3 = Match, 4 = Lucky Match, 5 = Focus lost, 6 = Focus gained
var CSVdata = []

/* 
 * Memory board variables 
 */

// The formulas
var formulas = [] 

// The x-values
var xvalues = [] 
var cleared = 0;
var tileClickCount = [];

var difficulty;

/* 
 * Experiment variables 
 */

// Block time (ms) 
//              minutes * seconds * ms
var blockTime = 1       * 6       *  1000;

// The Counters
var blockCounter = -1;
var trialCounter = 0;


var startTime = new Date();
var curBlockTime;
var age, gender, mturkID;

var trialStartTime,trialStopTime;
var trialTimes = { 1 : [],2 :[],3 :[] };

// Randomize block order
var orders = [
	[1, 2, 3],	
	[1, 3, 2],	
	[2, 1, 3],	
	[2, 3, 1],	
	[3, 1, 2],	
	[3, 2, 1]	
	];


/***********************************************************************
 * GLOBAL FUNCTIONS
 ***********************************************************************/

function formatTime(time) {
	var timeLog = (
			("0" + time.getHours()).slice(-2) + ":" + 
			("0" + time.getMinutes()).slice(-2) + ":" + 
			("0" + time.getSeconds()).slice(-2) + "." + 
			("0" + time.getMilliseconds()).slice(-3)); 

	return timeLog;
}

function pauseComp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
// Return time in ms since start experiment 
function getTime () { return new Date() - startTime; }
function getBlockTime () { return new Date() - curBlockTime; }

// Log the data to a csv
function saveToCSV (action, cardID) {
	if (!cardID) var cardID = "";
	CSVdata.push([getTime(), mturkID, age, gender, difficulty, blockCounter, trialCounter, action, cardID]); 
}

// Get the average trial time
function getAvgTrialTime (difficulty)
{
	var sum = 0, counter = 0;
	for (index = 0; index < trialTimes[difficulty].length ; index++)
	{
		sum += trialTimes[difficulty][index];
		counter++;
	}
	return sum/counter
}

// Sum the number of clicks
function sumClicks () {
	var sum = 0;
	for (index = 0; index < tileClickCount.length ; index++)
		sum += tileClickCount[index];
	return sum
}

// Visible and invisible loggers 
function visible()   { saveToCSV(6); }
function invisible() { saveToCSV(5); }

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

// Save the data, and redirect with generated hash
function saveData(json)
{
	$.ajax({
		type:'post',
		cache: false,
		url: 'savedata.php',
		data: {data: json},
		complete: function (returnvalue) {
			// The returned hash is in the returnText
			var returnedHash = returnvalue['responseText'];
			$("#hashForm").val(""+returnedHash);
			$("#form").submit();
		}
	});
}

/***********************************************************************
 * MAIN LOOP
 ***********************************************************************/

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

	var diffOrder = orders[Number(document.getElementById("diffOrder").textContent)];
	console.log(diffOrder);

	age = document.getElementById("user_age").textContent.trim();
	gender = document.getElementById("user_gender").textContent.trim();
	mturkID = document.getElementById("mturkID").textContent.trim();

	// Loop for future boards
	var refreshID = setInterval(function() 
			{
				// Set up first board
				if(blockCounter == -1) 
				{
					blockCounter++;
					difficulty = diffOrder[blockCounter];
					generateFormulas(difficulty); 

					newBoard();
					curBlockTime = new Date()
					trialStartTime = curBlockTime;
				} 
				// Set up a new board
				else if (cleared == 1 )
				{
					// Stop the trial
					var trialStopTime = new Date();

					// Save the trial time
					trialTimes[difficulty].push(trialStopTime - trialStartTime);

					// Check the amount of clicks
					if (sumClicks() < 30) alert(
							"You've completed the board in less than 30 clicks. You have earned a bonus");
					if (sumClicks() > 38) alert(
							"Please try to solve the next trials with fewer clicks");

					// Log the trial data and times
					//console.log("Trial time:  " +(trialStopTime - trialStartTime) + 'ms');
					//console.log("Average trial time: " + getAvgTrialTime(difficulty) + "ms");
					//console.log("Total trial time: " + getTime() + "ms");
					//console.log("blockCounter " + blockCounter);

					// Update the trial
					trialCounter++;

					// Check if blockCounter has to be incremented 
					// Increment if there is enough time for another average game
					if (getBlockTime() + (getAvgTrialTime(difficulty) / 2) >= blockTime )
					{
						alert(
								"You've completed a block, feel free to take a break." +
								"You can resume by clicking ok");
						blockCounter++;
						curBlockTime = new Date()
						if (blockCounter < 3) difficulty = diffOrder[blockCounter];
					}

					// Stop 
					if (blockCounter == 3) 
					{
						// Remove the first line
						CSVdata.shift();
						// Stringify the nested arrays
						var json = JSON.stringify(CSVdata);
						// Save to AJAX
						saveData(json);
					}

					cleared = 0;
					generateFormulas(difficulty); 
					newBoard();
					trialStartTime = new Date();
				} 
				$('h4').text("Current Block: " + (blockCounter+1));
			}, 300);
});
