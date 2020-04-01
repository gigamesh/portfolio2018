import { Container, Graphics } from "pixi.js";
import { scaleLinear } from "d3-scale";

const scale = scaleLinear()
  .domain([0, 500])
  .range([0, 4]);

export default class TunnelContainer extends Container {
  constructor(props) {
    super(props);
    this.renderer = props.renderer;
    this.squares = [];
  }

  drawSquares = () => {
    const centerPoint = this.renderer.width / 2;

    if (!this.squares.length) {
      const square = {
        shape: new Graphics(),
        size: 1,
        x: centerPoint,
        y: centerPoint,
        age: 0,
      };
      this.squares.push(square);
    }

    // remove oldest square if its bigger than canvas
    if (this.squares[0].size > this.renderer.width) {
      this.squares.shift();
    }

    for (let square of this.squares) {
      square.shape.clear();
      square.age++;
      square.size = square.size + scale(square.age);

      // sets anchor to center
      square.shape.pivot.set(square.size / 2, square.size / 2);
      square.shape.lineStyle(1, 0x375688, 1);
      square.shape.beginFill(0xffffff);
      square.shape.endFill();
      square.shape.drawRect(square.x, square.y, square.size, square.size);

      this.addChild(square.shape);
    }
  };
}
