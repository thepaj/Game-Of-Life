import P5 from "p5";
import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";

// DEMO: A sample class implementation
//import Cell from "./Cell";
import p5 from "p5";
//import Cell from "./Cell";

// Creating the sketch itself
const sketch = (p5: P5) => {
	// DEMO: Prepare an array of MyCircle instances
	// const cells: Cell[] = [];

	let previousStageArray: number[][] = [[], []];
	let nextStageArray: number[][] = [[],[]];
	const cells = [[], []];

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(200, 200);
		canvas.parent("app");

		// Configuring the canvas
		p5.background("white");

		for (let i = 0; i < p5.width; i++) {
			previousStageArray[i] = [];
			for (let j = 0; j < p5.height; j++) {
				previousStageArray[i][j] = 0;
			}
		}

		previousStageArray[3][10] = 1;
		previousStageArray[4][10] = 1;
		previousStageArray[5][10] = 1;

		nextStageArray = [...previousStageArray];
	};

	// The sketch draw method
	p5.draw = () => {
		for (let i = 0; i < p5.width; i++) {
			for (let j = 0; j < p5.height; j++) {
				let liveNeighbours: number = 0;

				let cellCheck = () => {
					return (i - 1 !== -1 && j - 1 !== -1 && i + 1 < p5.width && j + 1 < p5.height);
				}

				// checking if array exists
				// checking neighbour live or dead top left to bottom right
				if (cellCheck() && previousStageArray[i - 1][j - 1] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i - 1][j] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i - 1][j + 1] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i][j - 1] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i][j + 1] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i + 1][j - 1] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i + 1][j] === 1) {
					liveNeighbours++
				}
				if (cellCheck() && previousStageArray[i + 1][j + 1] === 1) {
					liveNeighbours++
				}

				// Any live cell with two or three live neighbours survives
				if (previousStageArray[i][j] === 1 && liveNeighbours === 3 || liveNeighbours === 2) {
					nextStageArray[i][j] = 1;
				}

				// Any dead cell with three live neighbours becomes a live cell.
				if (previousStageArray[i][j] === 0 && liveNeighbours === 3) {
					nextStageArray[i][j] = 1;
				}
			}
		}

		previousStageArray = nextStageArray;

		for (let i = 0; i < p5.width; i++) {
			for (let j = 0; j < p5.height; j++) {
				if (previousStageArray[i][j] === 1) {
					p5.noStroke();
					p5.fill(255, 255, 255);
					p5.square(i, j, 1);
				} else {
					p5.noStroke();
					p5.fill(0, 0, 0);
					p5.square(i, j, 1);
				}
			}
		}
	}
};

new P5(sketch);
