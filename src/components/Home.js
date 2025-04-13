import React, { Component } from "react";
import throttle from "react-throttle-render";
import TunnelVision from "./animations/TunnelVision";
import BigNavHome from "./BigNavHome";
import { Content, FullWrap, InnerWrap, TunnelWrapper } from "./homeStyledComps";
import "./LandingPage.css";

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
      isDesktop,
      mouseCoords,
      prevMouseCoords,
      updatePrevMouseCoords
    } = this.props;

    return (
      <FullWrap>
        {this.props.children}
        <InnerWrap>
          <Content
            homenav={isDesktop.toString()}
            innerRef={contentDiv => (this.contentDiv = contentDiv)}
          >
            <TunnelThrottled visible={visible}>
              <TunnelVision
                mouseCoords={mouseCoords}
                prevMouseCoords={prevMouseCoords}
                updatePrevMouseCoords={updatePrevMouseCoords}
              />
            </TunnelThrottled>
          </Content>
          {isDesktop && (
            <BigNavHome visible={visible}>{this.props.children}</BigNavHome>
          )}
        </InnerWrap>
      </FullWrap>
    );
  }
}
