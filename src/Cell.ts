import P5 from "p5";

export default class Cell {

	constructor(p5: P5, atPosition: P5.Vector, size: number) {
		this._p5 = p5;
		this._pos = atPosition;
		this._size = size;
	}

	show() {
		p5.noStroke();
		p5.fill(0,0,0);
		p5.square(i, j, 1);
	}
}