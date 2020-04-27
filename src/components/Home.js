import React, { Component } from "react";
import throttle from "react-throttle-render";
import TunnelVision from "./animations/TunnelVision";
// import TunnelShapes from './animations/TunnelShapes';
import "./LandingPage.css";
import BigNavHome from "./BigNavHome";
import {
  FullWrap,
  InnerWrap,
  Content,
  RevealBoxBottom,
  RevealBoxWrapper,
  NamePosed,
  BottomTextPosed,
  TunnelWrapper,
  ColorSquare
} from "./homeStyledComps";

// const TunnelShapesThrottled = throttle(30)(TunnelShapes);
const TunnelThrottled = throttle(30)(TunnelWrapper);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tunnelWidth: 0
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 0);
    this.updateTunnelWidth();
  }

  updateTunnelWidth = () => {
    this.setState({ tunnelWidth: this.contentDiv.clientWidth });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tunnelWidth !== this.contentDiv.clientWidth) {
      this.updateTunnelWidth();
    }
  }

  render() {
    const { visible } = this.state;
    const { homeNavShowing } = this.props;

    return (
      <FullWrap>
        {this.props.children}
        <InnerWrap>
          <Content
            homenav={homeNavShowing.toString()}
            innerRef={contentDiv => (this.contentDiv = contentDiv)}
          >
            <RevealBoxWrapper>
              <div id="reveal-up">
                <NamePosed pose={visible ? "visible" : "hidden"}>
                  Matt Masurka
                </NamePosed>
              </div>
            </RevealBoxWrapper>
            <TunnelThrottled visible={visible}>
              <TunnelVision loaded={this.props.loaded} />
            </TunnelThrottled>
            <RevealBoxBottom>
              <div id="reveal-down">
                <BottomTextPosed pose={visible ? "visible" : "hidden"}>
                  web development & design
                </BottomTextPosed>
              </div>
            </RevealBoxBottom>
          </Content>
          {homeNavShowing && (
            <BigNavHome visible={visible}>{this.props.children}</BigNavHome>
          )}
        </InnerWrap>
      </FullWrap>
    );
  }
}
