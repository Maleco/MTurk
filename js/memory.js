var backgroundLocation = "url(../img/tile_bg.jpg)"

// Board variables
var last_flipped_id = -1;
var tiles_flipped = 0; 
var tiles_cleared = []; 


// Create a new board
function newBoard(){ 
	 // Reset the counter
	 for(var i = 0; i < 16; i++)
			tileClickCount[i] = 0;
	 // Reset the variables
	 last_flipped_id = -1;
	 tiles_flipped = 0; 
	 tiles_cleared = []; 

	 // Shuffle the formulas
	 var formulasAndXValues = [];
	 for (var i = 0; i < formulas.length; i++)
			formulasAndXValues.push({"id": i, "formula": formulas[i], "xval": xvalues[i]});

	 // Shuffle the order
	 //formulasAndXValues = shuffle(formulasAndXValues);

	 var output = ''; 
	 for(var i = 0; i < formulas.length; i++)
	 {
			var obj = formulasAndXValues[i];
			output += '<div id="tile_' +obj["id"]+ '" onclick="memoryFlipTile(this,\''+obj["id"]+'\')"></div>'; 
	 }

	 document.getElementById('memory_board').innerHTML = output; 
} 

function flipBack(){ 
	 // Flip the last flipped tile back over
	 var tile = document.getElementById("tile_" + last_flipped_id); 
	 tile.style.background = backgroundLocation;
	 tile.innerHTML = ""; 
} 

function clearTiles(id1, id2) {
	 // Report a match (3) or lucky match(4)
	 if (tileClickCount[id1] == 0 && tileClickCount[id2] == 0 )
			saveToCSV(4, id2);
	 else
			saveToCSV(3, id2);

	 var tile_1 = document.getElementById("tile_" + id1); 
	 var tile_2 = document.getElementById("tile_" + id2); 
	 tile_1.style.background = '#FFF'; 
	 tile_2.style.background = '#FFF'; 
	 tile_1.innerHTML = '<div class="text">MATCHED!</div>'; 
	 tile_2.innerHTML = '<div class="text">MATCHED!</div>'; 
	 tiles_flipped += 2; 
	 last_flipped_id = -1;
	 tiles_cleared.push(id1);
	 tiles_cleared.push(id2);
}

function memoryFlipTile(tile, id){ 
	 if (tiles_cleared.indexOf(id) == -1)
	 {
			// On new flip
			if (last_flipped_id != id)
			{
				 // Update flip counter
				 tileClickCount[id]++;
				 console.log(formatTime(new Date()) + " Flipped tile: " + id);
			}


			if (last_flipped_id != -1 && last_flipped_id != id && 
						xvalues[last_flipped_id] == xvalues[id]
				 ) 
				 // Check if new flipped matches last flipped tile
			{
				 clearTiles(last_flipped_id, id);
			} else 
				 // Else flip new tile
			{
				 if (last_flipped_id != -1) flipBack();

				 // Report the new(1) or revisited(2) flip 
				 if (tileClickCount[id] == 1)
						saveToCSV(1, id);
				 else
						saveToCSV(2, id);

				 // Update tile image
				 tile.style.background = '#FFF'; 
				 tile.innerHTML = '<div class="text">' + formulas[id] + '</div>'; 
				 last_flipped_id = id;
			}
	 }

	 // Check if board is cleared
	 if(tiles_flipped == formulas.length) {
			cleared = 1;
			last_flipped_id = -1;
			tiles_flipped = 0; 
	 }

} 
