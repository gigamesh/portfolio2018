import React from "react";
import posed from "react-pose";
import { Redirect } from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import ReactSVG from "react-svg";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import TunnelVision from "./animations/TunnelVision";
import "./LandingPage.css";

const FullPageWrap = styled.div`
  overflow: hidden;
  background: radial-gradient(
    circle at 50% 25%,
    #123559 1%,
    #05101c 80%,
    #05101c 90%
  );
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled.div`
  opacity: ${props => (props.visible ? 0 : 1)};
  background: #05101c;
  transition: opacity 0.9s ease-in;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const InnerWrap = styled.div`
  width: 650px;
  max-width: 75vmin;
  height: 100vh;
  span {
    color: #4a97e0;
  }
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  path {
    stroke: #fff;
  }
  ${media.landscape.md`
    width: 650px;
  `}
`;

const Content = styled.div`
  margin: 0 20px;
  user-select: none;
  position: relative;
  top: -30px;
  h1 {
    font-size: 2.5em;
    }
  h2 {
    position: relative;
    float: right;
    }
  ${media.portrait.md`
    h1 {
      font-size: 2.2em;
    }
    h2 {
      font-size: 1.3em;
    }
  `}
  ${media.portrait.sm`
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 0.9em;
    }
  `}
  ${media.portrait.xs`
    margin: 4%;
    h1 {
      font-size: 1.6em;
    }
  `}
  ${media.landscape.md`
    top: -5px;
    margin: 0;
    h1 {
      font-size: 2.2em;
    }
    h2 {
      font-size: 1.2em;
    }
  `}
  ${media.landscape.sm`
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 0.9em;
    }
  `}
  ${media.landscape.xs`
    margin: 0;
    h1 {
      font-size: 1.6em;
    }
  `}
`;

const ChevDownLink = styled.a`
  width: 50px;
  position: absolute;
  bottom: 3vh;
  z-index: 2;
  .chevdown-show {
    opacity: 1;
  }
  svg {
    opacity: 0;
    stroke: #fff;
    fill: none;
    animation: opacity 400ms ease-in 1.8s forwards;
    &:hover {
      stroke: #4a97e0;
    }
  }
  ${media.landscape.sm`
    width: 30px;
  `}
`;

const RevealBoxWrapper = styled.div`
  height: 40px;
  ${media.portrait.sm`
    height: 32px;
  `}
  ${media.portrait.xs`
    height: 27px;
  `}
  ${media.landscape.md`
    height: 32px;
  `}
  ${media.landscape.xs`
    height: 27px;
  `}
  overflow: hidden;
`;

const RevealBoxBottom = styled(RevealBoxWrapper)`
  ${media.portrait.xs`
    display: none;
  `}
  ${media.landscape.sm`
    display: none;
  `}
`;

const NamePosed = posed.h1({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60 },
    delay: 800
  }
});

const BottomTextPosed = posed.h2({
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60 },
    delay: 1200
  }
});

const TunnelAnimation = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 1s linear;
`;

class LandingPage extends React.Component {
  state = {
    animVisible: false,
    nameVisible: false,
    bottomTextVisible: false
  };

  componentDidMount() {
    this.setState({
      animVisible: true,
      nameVisible: true,
      bottomTextVisible: true
    });
  }

  scrollToNextPage = () => {
    scrollToComponent(this.pageTwo, {
      offset: 0,
      align: "bottom",
      duration: 2500,
      ease: "inOutQuad"
    });
  };

  render() {
    const landingPageContent = (
      <React.Fragment>
        <FullPageWrap>
          <Overlay visible={this.state.animVisible} />
          <InnerWrap>
            <Content>
              <TunnelAnimation visible={this.state.animVisible}>
                <TunnelVision percentage={0.5} />
              </TunnelAnimation>
            </Content>
          </InnerWrap>
          <ChevDownLink onClick={this.scrollToNextPage}>
            <ReactSVG path="/img/icons/chevdown.svg" />
          </ChevDownLink>
        </FullPageWrap>
        <div
          ref={section => {
            this.pageTwo = section;
          }}
          style={{ height: "100vh" }}
        ></div>
      </React.Fragment>
    );
    return this.props.percentage < 0.666 ? (
      landingPageContent
    ) : (
      <Redirect to="/home" />
    );
  }
}

export default LandingPage;
