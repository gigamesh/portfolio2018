import React, { Component } from "react";
import throttle from "react-throttle-render";
import TunnelVision from "./animations/TunnelVision";
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
    const { homeNavShowing, hasIntroFinished } = this.props;

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
                <NamePosed
                  pose={visible || hasIntroFinished ? "visible" : "hidden"}
                >
                  Matt Masurka
                </NamePosed>
              </div>
            </RevealBoxWrapper>
            <TunnelThrottled visible={visible}>
              <TunnelVision
                hasIntroFinished={hasIntroFinished}
                registerIntroFinished={this.props.registerIntroFinished}
              />
            </TunnelThrottled>
            <RevealBoxBottom>
              <div id="reveal-down">
                <BottomTextPosed
                  pose={visible || hasIntroFinished ? "visible" : "hidden"}
                >
                  web development & design
                </BottomTextPosed>
              </div>
            </RevealBoxBottom>
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
