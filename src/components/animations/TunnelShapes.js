import React from "react";
import posed from "react-pose";
import styled from "styled-components";
import { darken } from "polished";

const colors = ["#7aa7ee", "#f08989", "#f7eb80", "#a9f196"];

let ShapeWrap = posed.div({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

ShapeWrap = styled(ShapeWrap)`
  position: absolute;
  top: 21%;
  left: 32%;
  /* top: ${({ w }) =>
    w >= 520
      ? "20%"
      : w < 520 && w >= 464
      ? "18%"
      : w < 464 && w >= 408
      ? "15.7%"
      : w < 408 && w >= 330
      ? "14%"
      : "11%"};
  left: ${({ w }) =>
    w >= 520
      ? "31%"
      : w < 520 && w >= 464
      ? "29%"
      : w < 464 && w >= 408
      ? "26.7%"
      : w < 408 && w >= 330
      ? "24.4%"
      : "23%"}; */
`;

let ColorDiv = posed.div({
  hidden: {
    y: 0,
    x: 0,
    scale: 0,
  },
  visible: {
    y: ({ coord }) => coord.y,
    x: ({ coord }) => coord.x,
    scale: ({ scale }) => scale,
    transition: {
      default: { ease: [1, 0.09, 0.95, 0], duration: 4000 },
      // opacity: { ease: [0,0,1,1], duration: 2000}
    },
  },
});

ColorDiv = styled(ColorDiv)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(
    circle at 30% 15%,
    ${({ color }) => color + "," + darken(0.15, color)}
  );
  border-radius: 50%;
  z-index: 5;
`;

class TunnelShapes extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 0);
  }

  render() {
    let { tunnelWidth } = this.props;
    let { visible } = this.state;

    // console.log(visible);
    return (
      <ShapeWrap pose={visible ? "visible" : "hidden"} w={tunnelWidth}>
        <ColorDiv
          scale={16}
          color={colors[1]}
          key={1}
          coord={{ x: 100, y: 280 }}
        />
        <ColorDiv
          scale={12}
          color={colors[2]}
          key={2}
          coord={{ x: -60, y: 200 }}
        />
        <ColorDiv
          scale={9}
          color={colors[0]}
          key={0}
          coord={{ x: 250, y: -20 }}
        />
      </ShapeWrap>
    );
  }
}

export default TunnelShapes;
