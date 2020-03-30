import React from "react";
import Lottie from "react-lottie";
import tunnelVision from "./tunnelvision.json";
import tunnelVisionIntro from "./tunnelvisionintro.json";

export default class TunnelVision extends React.Component {
  state = {
    introDone: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        introDone: true,
      });
      this.props.introAnimationDone();
    }, 880);
  }

  render() {
    const partOne = (
      <Lottie
        options={{
          loop: false,
          animationData: tunnelVisionIntro,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
    );
    const partTwo = (
      <Lottie
        options={{
          loop: true,
          animationData: tunnelVision,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
    );

    return this.state.introDone || this.props.loaded === "true"
      ? partTwo
      : partOne;
  }
}
