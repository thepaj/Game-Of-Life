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

	const cellArray: number[][] = [[], []];
	const cells = [[], []];

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(200, 200);
		canvas.parent("app");

		// Configuring the canvas
		p5.background("white");

		for (let i = 0; i < p5.width; i++) {
			cellArray[i] = [];
			for (let j = 0; j < p5.height; j++) {
				cellArray[i][j] = 1;
			}
		}

		cellArray[3][10] = 0;
		cellArray[4][10] = 0;
		cellArray[5][10] = 0;
	};

	// The sketch draw method
	p5.draw = () => {


		for (let i = 0; i < p5.width; i++) {
			for (let j = 0; j < p5.height; j++) {
				let liveNeighbours: number[] = [];

				let cellCheck = () => {
					return (i - 1 !== -1 && j - 1 !== -1 && i + 1 < p5.width && j + 1 < p5.height);
				}

				// checking if array exists
				// checking neighbour live or dead top left to bottom right
				if (cellCheck() && cellArray[i - 1][j - 1] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i - 1][j] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i - 1][j + 1] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i][j - 1] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i][j + 1] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i + 1][j - 1] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i + 1][j] === 1) {
					liveNeighbours.push(1);
				}
				if (cellCheck() && cellArray[i + 1][j + 1] === 1) {
					liveNeighbours.push(1);
				}

				// Any live cell with two or three live neighbours survives
				if (cellArray[i][j] === 1 && liveNeighbours.length === 3 || liveNeighbours.length === 2) {
					cellArray[i][j] = 1;
				}

				// Any dead cell with three live neighbours becomes a live cell.
				if (cellArray[i][j] === 0 && liveNeighbours.length === 3) {
					cellArray[i][j] = 1;
				}
			}
		}

		for (let i = 0; i < p5.width; i++) {
			for (let j = 0; j < p5.height; j++) {
				if (cellArray[i][j] === 1) {
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
