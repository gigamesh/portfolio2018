import { Container, Graphics } from "pixi.js";
import { scaleLinear, scalePow } from "d3-scale";
import Ticker from "./Ticker";
import { getMousePosition } from "./../../../utils";

export default class TunnelContainer extends Container {
  constructor(props) {
    super(props);
    document.addEventListener("mousemove", this.setMousePosition);
    this.renderer = props.renderer;
    this.centerPoint = this.renderer.width / 2;
    this.mousePosition = { x: this.centerPoint, y: this.centerPoint };
    this.squareCount = 1;
    this.squares = [];

    setInterval(() => {
      const MAX_SQUARES = 50;

      // remove oldest square if its bigger than canvas
      if (
        this.squares.length &&
        this.squares[0].size / 3 > this.renderer.width
      ) {
        this.squares.shift();
      }

      if (this.squares.length < MAX_SQUARES) {
        const square = {
          shape: new Graphics(),
          size: 1,
          x: this.centerPoint,
          y: this.centerPoint,
          age: 0,
        };
        this.squares.push(square);
      }
    }, 600);

    this.sizeScale = scalePow()
      .exponent(2.5)
      .domain([0, 500])
      .range([0, 1]);

    this.xScale = scaleLinear()
      .domain([0, window.innerWidth])
      .range([this.renderer.width, 0]);

    this.yScale = scaleLinear()
      .domain([0, window.innerHeight])
      .range([this.renderer.height, 0]);

    Ticker.add(this.update, this);
  }

  setMousePosition = e => {
    this.mousePosition = getMousePosition(e);
  };

  update = () => {
    this.squares = this.squares.map((square, i) => {
      square.shape.clear();
      square.age += 1;
      square.size = square.size + this.sizeScale(square.age);
      square.x = this.xScale(this.mousePosition.x);
      square.y = this.yScale(this.mousePosition.y);

      // sets anchor to center
      square.shape.pivot.set(square.size / 2, square.size / 2);
      square.shape.lineStyle(1, 0x375688, 1);
      square.shape.beginFill(0xffffff);
      square.shape.endFill();
      square.shape.drawRect(square.x, square.y, square.size, square.size);
      return square;
    });

    this.squares.forEach(square => {
      this.addChild(square.shape);
    });
  };
}
