// A function to generate a random integer in a given range
function randomRange(min, max)  {
	 var range = (max-min) + 1;
	 var rand = Math.floor( Math.random()*range );
	 return min+rand;
}

// A function for a random grey value
function randomGrey() {
	 var s = "#";
	 var grey = randomRange(0,12).toString(16);

	 while(s.length < 7) {
			s+=grey;
	 }

	 return s;
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

var Circle = function(x, y, radius, fillcolor) {
	 this.type = "circle";
	 this.x = x;
	 this.y = y;
	 this.radius = radius;
	 this.fillcolor = fillcolor;

	 this.left = x - radius;
	 this.top = y - radius;
	 this.right = x + radius;
	 this.bottom = y + radius;
};

var Square = function(x, y, width, height, fillcolor) {
	 this.type = 'square';
	 this.x = x;
	 this.y = y;
	 this.width = width;
	 this.height = height;
	 this.fillcolor = fillcolor;

	 this.left = x;
	 this.right = x + width;
	 this.top = y;
	 this.bottom = y + width;
};

var canvas = document.getElementById('canvas1');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');

var objects = [];
var last;

var drawCircle = function(context, x, y, radius, fillcolor) {
	 context.beginPath();
	 context.arc(x, y, radius, 0, 2 * Math.PI, false);
	 context.fillStyle = fillcolor;
	 context.fill();
	 context.strokeStyle = 'black';
	 context.stroke();
};

var drawSquare = function(context, x, y, width, height, fillcolor) {
	 context.fillStyle = fillcolor;
	 context.fillRect(x, y, width, height);
	 context.fill();
	 context.lineWidth = 2;
	 context.strokeStyle = 'black';
	 context.stroke();
};

function drawBoard (nrShapes) {
	 // First clear the canvasses
	 context.clearRect(0, 0, canvas.width, canvas.height);
	 context2.clearRect(0, 0, canvas2.width, canvas2.height);
	 // Empty the objects listeners
	 objects = [];

	 // Draw the shapes
	 for (i = 0; i < nrShapes; ++i) {
			// Keep 50px clear of each edge
			x = randomRange(50,  canvas.width-50);
			y = randomRange(50, canvas.height-50);
			fillcolor = randomGrey();

			// Choose circle of square at random 
			if (Math.random() < 0.5) {
				 radius = randomRange(50,100);
				 drawCircle(context, x, y, radius, fillcolor);
				 objects.push(new Circle(x, y, radius, fillcolor));  

			} else {
				 width = randomRange(50,200);
				 height = randomRange(50,200);

				 drawSquare(context, x, y, width, height, fillcolor);
				 objects.push(new Square(x, y, width, height, fillcolor));
			}
	 }
	 // Draw the shapes on the other canvas
	 for (i = 0; i < objects.length-1; ++i) {
			var obj = objects[i];
			if (obj.type == "circle") {
				 drawCircle(context2, obj.x, obj.y, obj.radius, obj.fillcolor);
			} else if (obj.type = 'square') {
				 drawSquare(context2, obj.x, obj.y, obj.width, obj.height, obj.fillcolor);
			}
	 }
	 // Draw the last shape slightly different
	 last = objects[objects.length-1];
	 randFactor = randomRange(120,160)/100;
	 if (last.type == "circle") {
			last.radius = last.radius*randFactor;
			last.left = last.x - last.radius;
			last.top = last.y - last.radius;
			last.right = last.x + last.radius;
			last.bottom = last.y + last.radius;
			drawCircle(context2, last.x, last.y, last.radius, last.fillcolor);
	 } else if (obj.type = 'square') {
			last.width = last.width*randFactor;
			last.height = last.height*randFactor;
			last.left = last.x;
			last.right = last.x + last.width;
			last.top = last.y;
			last.bottom = last.y + last.width;
			drawSquare(context2, last.x, last.y, last.width, last.height, last.fillcolor);
	 }
}


drawBoard(4);

$('#canvas2').click(function (e) {
	 var clickedX = e.pageX - this.offsetLeft;
	 var clickedY = e.pageY - this.offsetTop;

	 if (clickedX < last.right && clickedX > last.left && clickedY > last.top && clickedY < last.bottom) {
			if (last.type="circle") 
				 drawCircle(context2, last.x, last.y, last.radius, 'blue');
			else 
				 drawSquare(context2, last.x, last.y, last.width, last.height, 'blue');

			context.fillStyle = 'green';
			context.font = 'italic 40pt Calibri';
			context.fillText('Correct', (canvas.width/2)-60, canvas.height-20);
	 } else {
			for (i = 0; i < objects.length-1; ++i) {
				 var obj = objects[i];
				 if (clickedX < obj.right && clickedX > obj.left && clickedY > obj.top && clickedY < obj.bottom) {
						if (last.type="circle") 
							 drawCircle(context2, obj.x, obj.y, obj.radius, 'blue');
						else 
							 context2.fillRect(obj.x, obj.y, obj.width, obj.height, 'blue');

			context.fillStyle = 'red';
						context.font = 'italic 40pt Calibri';
						context.fillText('False', (canvas.width/2)-30, canvas.height-20);
				 }
			}
	 }
	 setTimeout(drawBoard(4), 1000);
});
