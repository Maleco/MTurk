var backgroundLocation = "url(../img/tile_bg.jpg)"

// Board variables
var last_flipped_id = -1;
var tiles_flipped = 0; 

// Shuffle the tiles
Array.prototype.memory_tile_shuffle = function(){ 
	 var i = this.length, j, temp; 
	 while(--i > 0){ 
			j = Math.floor(Math.random() * (i+1)); 
			temp = this[j]; 
			this[j] = this[i]; 
			this[i] = temp; 
	 } 
} 

// Create a new board
function newBoard(){ 
	 //memory_formulas.memory_tile_shuffle(); 

	 var output = ''; 
	 for(var	i = 0; i < formulas.length; i++)
			output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+i+'\')"></div>'; 

	 document.getElementById('memory_board').innerHTML = output; 
} 

function flipBack(){ 
	 // Flip the last flipped tile back over
	 var tile = document.getElementById("tile_" + last_flipped_id); 
	 tile.style.background = backgroundLocation;
	 tile.innerHTML = ""; 
} 

function clearTiles(id1, id2) {
	 var tile_1 = document.getElementById("tile_" + id1); 
	 var tile_2 = document.getElementById("tile_" + id2); 
	 tile_1.style.background = '#FFF'; 
	 tile_2.style.background = '#FFF'; 
	 tile_1.innerHTML = '<div class="text">MATCHED!</div>'; 
	 tile_2.innerHTML = '<div class="text">MATCHED!</div>'; 
	 tiles_flipped += 2; 
	 last_flipped_id = -1;
}

function memoryFlipTile(tile,val){ 
	 // Check if new flipped matches last flipped tile
	 // Else flip new tile
	 if(last_flipped_id != -1 && xvalues[last_flipped_id] == xvalues[val]) {
			clearTiles(last_flipped_id, val);
	 } else {
			if (last_flipped_id != -1) flipBack();
			tile.style.background = '#FFF'; 
			tile.innerHTML = '<div class="text">' + formulas[val] + '</div>'; 
			last_flipped_id = val;
	 }

	 // Check if board is cleared
	 if(tiles_flipped == formulas.length) {
			cleared = 1;
			last_flipped_id = -1;
			tiles_flipped = 0; 
	 }

} 
