/*
 * GLOBAL VARIABLES
 */
// TODO
// UNIQUELY IDENTIFY EVERY WORKE

// LOG EVERYTHING YOU CAN LOG
// Logging to csv, columns:
// Time (ms), Participant, P_Age, P_Gender, Difficulty, Block, Trialnr, Move, Card
// Move: 1 = newCard, 2 = Revisit, 3 = Match, 4 = Lucky Match, 5 = Focus lost, 6 = Focus gained
var CSVdata = []
// The formulas
var formulas = [] 
// The x-values
var xvalues = [] 
var cleared = 0;

var tileClickCount = [];

// The Block counter
var blockCounter = -1;
var trialCounter = 0;
var difficulty;

var startTime = new Date();
var age, gender, mturkID;
/*
 * GLOBAL FUNCTIONS
 */
function formatTime(time) {
	 var timeLog = (
				 ("0" + time.getHours()).slice(-2) + ":" + 
				 ("0" + time.getMinutes()).slice(-2) + ":" + 
				 ("0" + time.getSeconds()).slice(-2) + "." + 
				 ("0" + time.getMilliseconds()).slice(-3)); 

	 return timeLog;
}

function getMS () {
	 return new Date() - startTime;
}

function saveToCSV (action, cardID) {
	 if (!cardID) var cardID = "";
	 CSVdata.push([getMS(), mturkID, age, gender, difficulty, blockCounter, trialCounter, action, cardID]); 
}

function visible() {
	 console.log([getMS(), age, gender, difficulty, blockCounter, trialCounter, 6, ""]); 
	 saveToCSV(6);
}

function invisible() {
	 console.log([getMS(), age, gender, difficulty, blockCounter, trialCounter, 5, ""]); 
	 saveToCSV(5);
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

function saveTrial(startTime, stopTime)
{
	// Column names: time, start/finish
	var trial = [ 
		 ["Hello", "world"],
		 ["Hello", "world"]
		 ];

	// Column names: time, participant_id, age, gender, , start/finish
	console.log(trial);
	return trial;
}

function saveData(json)
{
	 $.ajax({
			type:'post',
			cache: false,
			url: 'savedata.php',
			data: {data: json},
			complete: function(data) {
				 window.location.href = "thanks.php";
		}
	 });
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

	 age = document.getElementById("user_age").textContent.trim();
	 gender = document.getElementById("user_gender").textContent.trim();
	 mturkID = document.getElementById("mturkID").textContent.trim();

	var trialStartTime,trialStopTime;
	// Randomize block order
	var diffOrder = shuffle([1, 2, 3]);
	// Collect trial times by difficulty
	var trialTimes = { 1 : [],2 :[],3 :[] };
	console.log("Difficulty order: " + diffOrder);

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
					trialStartTime = new Date();
				} 
				// Set up a new board
				else if (cleared == 1 )
				{
					// Stop the trial
					var trialStopTime = new Date();

					// Save the trial time
					trialTimes[difficulty].push(trialStopTime - trialStartTime);
					
					// Log the trial data and times
					console.log(formatTime(trialStartTime) + " Trial start");
					console.log(formatTime(trialStopTime)  + " Trial stop");
					console.log("Trial time:  " +(trialStopTime - trialStartTime) + 'ms');

					var revisits = 0;
					for (var i=0; i < tileClickCount.length; i++)
						revisits += tileClickCount[i] -1;
					console.log("revisits " + revisits);

					console.log("blockCounter " + blockCounter);


					// Stop 
					if (blockCounter == 0) 
					{
						 // Remove the first line
						 CSVdata.shift();
						 console.log(CSVdata);
						 // Save the data
						 //var json = JSON.stringify(saveTrial(trialStartTime,trialStopTime));
						 var json = JSON.stringify(CSVdata);
						 saveData(json);
					}

					cleared = 0;

					blockCounter++;
					difficulty = diffOrder[blockCounter];
					generateFormulas(difficulty); 

					newBoard();
					trialStartTime = new Date();
				} 
			}, 500);
});
