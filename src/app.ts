import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";
import p5 from "p5";
import Cell from './Cell';

const squareSize = 10;

// Creating the sketch itself
const sketch = (p5: P5) => {
let previousStageArray: number[][] = [[], []];
	let nextStageArray: number[][] = [[], []];
	const cells: Cell[] = [];

	// The sketch setup method 
	p5.setup = () => {
		const canvas = p5.createCanvas(500, 500);
		const lineBtn = p5.select('#btn-line');
		const spaceshipBtn = p5.select('#btn-spaceship');
		const pentaDecaBtn = p5.select('#btn-penta-deca');
		lineBtn!.mousePressed(line);
		spaceshipBtn!.mousePressed(spaceship);
		pentaDecaBtn!.mousePressed(pentaDecathlon);
		const width: number = p5.width / squareSize;
		const height: number = p5.height / squareSize;
		canvas.parent("app");

		p5.background("#FAF9F6");
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
	};

	// The sketch draw method
	p5.draw = () => {
		drawCells();
		applyRules();
	}

	function drawCells() {
		for (let i = 0; i < previousStageArray.length; i++) {
			for (let j = 0; j < previousStageArray[i].length; j++) {
				let xDir: number = squareSize * i;
				let yDir: number = squareSize * j;
				if (previousStageArray[i][j] === 0) {
					cells[i] = new Cell(p5, squareSize, xDir, yDir , '#FAF9F6');
					cells[i].draw();
				} else {
					cells[i] = new Cell(p5, squareSize, xDir, yDir, 'black');
					cells[i].draw();
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

	function line() {
		killEveryone();

		previousStageArray[0][1] = 1;
		previousStageArray[1][1] = 1;
		previousStageArray[2][1] = 1;
	}

	function spaceship() {
		killEveryone();

		previousStageArray[0][1] = 1;
		previousStageArray[1][2] = 1;
		previousStageArray[2][0] = 1;
		previousStageArray[2][1] = 1;
		previousStageArray[2][2] = 1;
	}

	function pentaDecathlon() {
		killEveryone();

		previousStageArray[10][10] = 1;
		previousStageArray[10][11] = 1;
		previousStageArray[10][12] = 1;
		previousStageArray[11][10] = 1;
		previousStageArray[11][11] = 0;
		previousStageArray[11][12] = 1;
		previousStageArray[12][10] = 1;
		previousStageArray[12][11] = 1;
		previousStageArray[12][12] = 1;
		previousStageArray[13][10] = 1;
		previousStageArray[13][11] = 1;
		previousStageArray[13][12] = 1;
		previousStageArray[14][10] = 1;
		previousStageArray[14][11] = 1;
		previousStageArray[14][12] = 1;
		previousStageArray[15][10] = 1;
		previousStageArray[15][11] = 1;
		previousStageArray[15][12] = 1;
		previousStageArray[16][10] = 1;
		previousStageArray[16][11] = 0;
		previousStageArray[16][12] = 1;
		previousStageArray[17][10] = 1;
		previousStageArray[17][11] = 1;
		previousStageArray[17][12] = 1;
	}

	function killEveryone() {
		for (let i = 0; i < p5.width / squareSize; i++) {
			previousStageArray[i] = [];
			for (let j = 0; j < p5.height / squareSize; j++) {
				previousStageArray[i][j] = 0;
			}
		}
	}
};

new P5(sketch);
