import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import posed from "react-pose";
import media from "../utils/mediaqueries";
import { animations } from "../utils/animations";
import { mainColor, lightBlue } from "../styles/variables.scss";

const FullWrap = styled.div`
  background: pink;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  user-select: none;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
`;

const NavSection = posed.ul({
  visible: {
    opacity: 1,
    delayChildren: 0,
    staggerChildren: 40,
  },
  hidden: {
    opacity: 0,
  },
});

const NavSectionStyled = styled(NavSection)`
  list-style-type: none;
  font-size: 6.5em;
  line-height: 1.2em;
  font-weight: 700;
  opacity: 0;
  position: relative;
  ${media.portrait.sm`
    font-size: 3.5em;
    `}
`;
let LinkWrapper = posed.li(animations.main);
LinkWrapper = styled(LinkWrapper)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NavLinkStyled = styled(NavLink)`
  position: relative;
  transition: color 200ms ease;
  -webkit-text-stroke: ${mainColor} 2px;
  width: 100%;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 20%;
    z-index: -1;
    transition: height 200ms ease;
    background: ${lightBlue};
    padding: 0 8px;
    left: -4px;
  }
  &:hover {
    &:before {
      height: 60%;
    }
  }
`;

const NameInCorner = posed.h1({
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  hidden: { opacity: 0, y: -200 },
});

const NameInCornerStyled = styled(NameInCorner)`
  position: absolute;
  font-size: 2em;
  top: 25px;
  left: 25px;
  display: ${props => (props.visible === "true" ? "block" : "none")};
  opacity: 0;
  ${media.portrait.md`
    text-align: center;
    left: 20px;
    top: 20px;
    margin: 0 auto;
    font-size: 1.8em;
    `}
  ${media.portrait.sm`
    left: 20px;
    top: 20px;
    margin: 0 auto;
    text-align: center;
    font-size: 1.4em;
  `}
`;

export default class Home extends Component {
  state = {
    navSectionVisible: false,
    nameVisible: false,
  };

  componentDidMount() {
    setTimeout(() => this.showNav(), 200);
    this.showName();
  }

  showNav = () => this.setState({ navSectionVisible: true });
  showName = () => this.setState({ nameVisible: true });

  render() {
    const { navSectionVisible, nameVisible } = this.state;

    return (
      <FullWrap>
        <NavSectionStyled pose={navSectionVisible ? "visible" : "hidden"}>
          <LinkWrapper>
            <NavLinkStyled to="/about">about</NavLinkStyled>
          </LinkWrapper>
          <LinkWrapper>
            <NavLinkStyled to="/portfolio">portfolio</NavLinkStyled>
          </LinkWrapper>
          <LinkWrapper>
            <NavLinkStyled to="/resume">resume</NavLinkStyled>
          </LinkWrapper>
          <LinkWrapper>
            <NavLinkStyled to="/contact">contact</NavLinkStyled>
          </LinkWrapper>
        </NavSectionStyled>
      </FullWrap>
    );
  }
}
