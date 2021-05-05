import P5 from "p5";

export default class Cell {
	p5: P5;
	size: number;
	x: number;
	y: number;
	color: string;

	constructor(p5: P5, size: number, x: number, y: number, color: string) {
		this.p5 = p5;
		this.size = size;
		this.x = x;
		this.y = y;
		this.color = color;
	}

	draw() {
		const p5 = this.p5;

		p5.noStroke();
		p5.fill(this.color);
		p5.square(this.x, this.y, 100);
	}
}