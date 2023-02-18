import React, { Component } from "react";
import throttle from "react-throttle-render";
import TunnelVision from "./animations/TunnelVision";
import "./LandingPage.css";
import BigNavHome from "./BigNavHome";
import {
  FullWrap,
  InnerWrap,
  Content,
  RevealBoxWrapper,
  NamePosed,
  TunnelWrapper
} from "./homeStyledComps";

// const TunnelShapesThrottled = throttle(30)(TunnelShapes);
const TunnelThrottled = throttle(30)(TunnelWrapper);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 0);
  }

  render() {
    const { visible } = this.state;
    const {
      homeNavShowing,
      hasIntroFinished,
      mouseCoords,
      prevMouseCoords,
      updatePrevMouseCoords
    } = this.props;

    return (
      <FullWrap>
        {this.props.children}
        <InnerWrap>
          <Content
            homenav={homeNavShowing.toString()}
            innerRef={contentDiv => (this.contentDiv = contentDiv)}
          >
            <TunnelThrottled visible={visible}>
              <TunnelVision
                hasIntroFinished={hasIntroFinished}
                registerIntroFinished={this.props.registerIntroFinished}
                mouseCoords={mouseCoords}
                prevMouseCoords={prevMouseCoords}
                updatePrevMouseCoords={updatePrevMouseCoords}
              />
            </TunnelThrottled>
          </Content>
          {homeNavShowing && (
            <BigNavHome visible={visible || hasIntroFinished}>
              {this.props.children}
            </BigNavHome>
          )}
        </InnerWrap>
      </FullWrap>
    );
  }
}
