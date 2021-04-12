import P5 from "p5";
import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";

// DEMO: A sample class implementation
//import Cell from "./Cell";
import p5 from "p5";
//import Cell from "./Cell";

const squareSize = 10;

// Creating the sketch itself
const sketch = (p5: P5) => {
	// DEMO: Prepare an array of MyCircle instances
	// const cells: Cell[] = [];

	let previousStageArray: number[][] = [[], []];
	let nextStageArray: number[][] = [[], []];
	const cells = [[], []];

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(500, 500);
		const width: number = p5.width / squareSize;
		const height: number = p5.height / squareSize;
		canvas.parent("app");

		// Configuring the canvas
		p5.background("white");
		p5.frameRate(3);

		for (let i = 0; i < width; i++) {
			previousStageArray[i] = [];
			for (let j = 0; j < height; j++) {
				previousStageArray[i][j] = 0;
			}
		}

		for (let i = 0; i < width; i++) {
			nextStageArray[i] = [];
			for (let j = 0; j < height; j++) {
				nextStageArray[i][j] = 0;
			}
		}

		previousStageArray[0][1] = 1;
		previousStageArray[1][1] = 1;
		previousStageArray[2][1] = 1;
	};

	// The sketch draw method
	p5.draw = () => {
		drawCells();
		applyRules();
	}

	function drawCells() {
		for (let i = 0; i < previousStageArray.length; i++) {
			for (let j = 0; j < previousStageArray[i].length; j++) {
				let x: number = squareSize * i;
				let y: number = squareSize * j;
				if (previousStageArray[i][j] === 0) {
					p5.fill('white');
					p5.square(x, y, squareSize);
				} else {
					p5.fill('black');
					p5.square(x, y, squareSize);
				}
			}
		}
	}

	function applyRules() {
		for (let i = 0; i < previousStageArray.length; i++) {
			for (let j = 0; j < previousStageArray[i].length; j++) {
				let liveNeighbours: number = 0;

				// checking neighbour live or dead top left to bottom right
				if (getCellValue(previousStageArray, i - 1, j - 1) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i - 1, j) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i - 1, j + 1) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i, j - 1) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i, j + 1) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i + 1, j - 1) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i + 1, j) === 1) {
					liveNeighbours++
				}
				if (getCellValue(previousStageArray, i + 1, j + 1) === 1) {
					liveNeighbours++
				}

				// Any live cell with two or three live neighbours survives
				if (previousStageArray[i][j] === 1 && liveNeighbours === 3) {
					nextStageArray[i][j] = 1;
				} else if (previousStageArray[i][j] === 1 && liveNeighbours === 2) {
					nextStageArray[i][j] = 1;
				} else {
					nextStageArray[i][j] = 0;
				}

				// Any dead cell with three live neighbours becomes a live cell.
				if (previousStageArray[i][j] === 0 && liveNeighbours === 3) {
					nextStageArray[i][j] = 1;
				}
			}
		}

		let tempArray = previousStageArray;
		previousStageArray = nextStageArray;
		nextStageArray = tempArray;
	}

	function getCellValue(arr: number[][], i: number, j: number) {
		if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
			return arr[i][j];
		} else {
			return null;
		}
	}
};

new P5(sketch);
