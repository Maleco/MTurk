/* TODO
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
// Time (ms), Participant, P_Age, P_Gender, Difficulty, Block, Trialnr, Move, Card, Bonus counter
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
var blockTime = 15      * 60      * 1000;

// The Counters
var blockCounter = -3;
var trialCounter = 0;
var bonusCounter = 0;

// Max bonus = x * 0.10
maxBonus = 40;


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

function pauseComp(milliseconds)
{
 var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
// Return time in ms since start experiment 
function getTime () { return new Date() - startTime; }
function getBlockTime () { return new Date() - curBlockTime; }

// Log the data to a csv
function saveToCSV (action, cardID) {
	if (!cardID) var cardID = "";
	CSVdata.push([getTime(), mturkID, age, gender, difficulty, blockCounter, trialCounter, action, cardID, bonusCounter]); 
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

// Sum the number of steps
function sumSteps () {
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
				// Set up the first intro board
				if (blockCounter == -3) 
				{
					alert("Welcome to the experiment, you will now be presented with 2 introduction puzzles.");
					blockCounter++;
					cleared = 0;
					// Generate easy
					generateFormulas(1); 
					newBoard();
					$('h4').text("Current Block: Practice 1 of 2");
				}
				else if (blockCounter == -2 && cleared == 1)
				{
					blockCounter++;
					cleared = 0;
					// Generate medium
					generateFormulas(2); 
					newBoard();
					$('h4').text("Current Block: Practice 2 of 2");
				}
				// Set up first board
				else if(blockCounter == -1 && cleared == 1) 
				{
					alert("The real experiment will now begin. We would like to urge you to complete puzzles in as few steps as possible.");
					blockCounter++;
					cleared = 0;

					difficulty = diffOrder[blockCounter];
					generateFormulas(difficulty); 

					newBoard();
					curBlockTime = new Date()
						trialStartTime = curBlockTime;
					if (bonusCounter > maxBonus)
						 $('h4').text("Current Block: " + (blockCounter+1) + ", Current Bonus: $" + (0.10*maxBonus).toFixed(2));
					else 
						 $('h4').text("Current Block: " + (blockCounter+1) + ", Current Bonus: $" + (0.10*bonusCounter).toFixed(2));
				} 
				// Set up a new board
				else if (cleared == 1 )
				{
					// Stop the trial
					var trialStopTime = new Date();

					// Save the trial time
					trialTimes[difficulty].push(trialStopTime - trialStartTime);

					// Check the amount of steps
					if (sumSteps() > 15 && sumSteps() < 30) 
					{
						 alert("Number of steps " + sumSteps() + ". " +
									 "You've completed the board in less than 30 steps. You have earned a bonus");
						 bonusCounter++;
					}
					if (sumSteps() > 38) 
					{
						 alert("Number of steps " + sumSteps() + ". " +
									 "Please try to solve the next puzzles with fewer steps");
						 if (bonusCounter > 0) bonusCounter--;
					}

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
					if (bonusCounter > maxBonus)
						 $('h4').text("Current Block: " + (blockCounter+1) + ", Current Bonus: $" + (0.10*maxBonus).toFixed(2));
					else 
						 $('h4').text("Current Block: " + (blockCounter+1) + ", Current Bonus: $" + (0.10*bonusCounter).toFixed(2));
				} 
			}, 300);
});
