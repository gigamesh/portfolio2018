import React, { Component } from "react";
import styled from "styled-components";
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
import ReactSVG from "react-svg";

// const TunnelShapesThrottled = throttle(30)(TunnelShapes);
const TunnelThrottled = throttle(30)(TunnelWrapper);

const SVGInject = styled(ReactSVG)`
  position: relative;
  z-index: 100;
  opacity: .8;
    div {
      padding-bottom: 20px;
      padding-right: 30px;
      position: relative;
      width: 50px;
      height: 50px;
    }
  }
`;
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
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end"
        }}
      >
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
                  mouseCoords={mouseCoords}
                  prevMouseCoords={prevMouseCoords}
                  updatePrevMouseCoords={updatePrevMouseCoords}
                />
              </TunnelThrottled>
            </Content>
            {homeNavShowing && (
              <BigNavHome visible={visible || hasIntroFinished}>
                <p>hello</p>
              </BigNavHome>
            )}
          </InnerWrap>
        </FullWrap>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:matt@masurka.com"
          style={{ display: "flex", justifyContent: "flex-end", bottom: 0 }}
        >
          <SVGInject path="/img/icons/mail.svg" svgClassName="icon-email" />
        </a>
      </div>
    );
  }
}
