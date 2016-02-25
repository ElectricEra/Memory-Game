var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');

var GameGrid = [];
var TileArray=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];

var FIELD_C = 6;
var FIELD_R = 6;
var BlockSize = 100;

var openedX = undefined;
var openedY = undefined;

var clickable = true;

var totalTilesOpened = 0;
var matches = 0;

canvas.addEventListener('click', update);

function update(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var tempX = Math.floor(mouseX/BlockSize);
	var tempY = Math.floor(mouseY/BlockSize);
	
	if (clickable  && tempX<=6 && tempY<=6) {
		totalTilesOpened++;
		drawHood();
		tileCheck(tempX,tempY);
	}
}

function tileCheck(col,row) {
	if (openedX == undefined) {
		GameGrid[col][row].visibility = true;
		openedX = col;
		openedY = row;
		drawTiles();
	} else {
		clickable = false;
		GameGrid[col][row].visibility = true;
		drawTiles();
		checking(col,row,openedX,openedY)
		openedX = undefined;
		openedY = undefined;
		if (matches == 18) {
			var ans = confirm("You won! It took you " + totalTilesOpened + " to win. Do you dare to beat this score !?!");
			if (ans) {
				resetField();
				generateBoard();
				totalTilesOpened = 0;
				matches = 0;
				drawHood();
				drawTiles();
			}
		}
	}
}

function checking(ax,ay,bx,by) {
	setTimeout(function() {
			if(GameGrid[ax][ay].value == GameGrid[bx][by].value) {
				GameGrid[ax][ay].value = 10;
				GameGrid[bx][by].value = 10;
				matches++;
				drawHood();
			} else {
				GameGrid[ax][ay].visibility = false;
				GameGrid[bx][by].visibility = false;
			}
			drawTiles();
			clickable = true;
	},1000);

}

for (var c=0; c<FIELD_C; c++) {
	GameGrid[c] = [];
	for (var r=0; r<FIELD_R; r++) {
		GameGrid[c][r]={x:0,y:0,value:0,visibility:false};
	}
}


for (var c=0; c<FIELD_C; c++) {
	for (var r=0; r<FIELD_R; r++) {
		positionX = c*BlockSize;
		positionY = r*BlockSize;
		GameGrid[c][r].x = positionX;
		GameGrid[c][r].y = positionY;
	}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function generateBoard() {
	var RandomizedArray = TileArray.slice();
	shuffle(RandomizedArray);
	for (var c=0; c<FIELD_C; c++) {
		for (var r=0; r<FIELD_R; r++) {
			var numb = RandomizedArray.pop();
			if (numb != undefined) {
				GameGrid[c][r].value = numb;
			} else {
				GameGrid[c][r].value = 0;
			}
		}
	}
}

generateBoard();

function resetField() {
	for (var c=0; c<FIELD_C; c++) {
		for (var r=0; r<FIELD_R; r++) {
			GameGrid[c][r].value = 0;
			GameGrid[c][r].visibility = false;
		}
	}
}

var imageArray = [];

imageArray[0] = document.getElementById("back");
imageArray[1] = document.getElementById("sea");
imageArray[2] = document.getElementById("tree");
imageArray[3] = document.getElementById("lightning");
imageArray[4] = document.getElementById("space");
imageArray[5] = document.getElementById("beach");
imageArray[6] = document.getElementById("mountain");
imageArray[7] = document.getElementById("night");
imageArray[8] = document.getElementById("flower");
imageArray[9] = document.getElementById("snowman");
imageArray[10] = document.getElementById("empty");

drawTiles();

function drawTiles() {
	for (var c=0; c<FIELD_C; c++) {
		for (var r=0; r<FIELD_R; r++) {
			if (GameGrid[c][r].visibility == true) {
				canvasContext.drawImage(imageArray[GameGrid[c][r].value],GameGrid[c][r].x,GameGrid[c][r].y);
			} else {
				canvasContext.drawImage(imageArray[0],GameGrid[c][r].x,GameGrid[c][r].y);
			}
		}
	}
}
drawHood();
function drawHood() {
	canvasContext.fillStyle = "#eec39a";
	canvasContext.fillRect(600,0,200,600);
	canvasContext.fillStyle = "black";
	canvasContext.strokeRect(600,0,200,600);
	canvasContext.fillStyle = "black";
	canvasContext.font = "16px Arial";
	canvasContext.fillText("Total tiles opened - "+totalTilesOpened,620,50);
	canvasContext.font = "16px Arial";
	canvasContext.fillText("Matches - "+matches,620,100);

}