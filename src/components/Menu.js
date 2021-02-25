import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import posed from "react-pose";
import media from "../utils/mediaqueries";
import { animations } from "../utils/animations";

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
    staggerChildren: 40
  },
  hidden: {
    opacity: 0
  }
});

const NavSectionStyled = styled(NavSection)`
  list-style-type: none;
  font-size: 6.5em;
  line-height: 1.2em;
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
  -webkit-text-stroke: var(--main-color) 2px;
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
    background: var(--light-blue);
    padding: 0 8px;
    left: -4px;
  }
  &:hover {
    &:before {
      height: 60%;
    }
  }
`;

export default class Home extends Component {
  state = {
    navSectionVisible: false,
    nameVisible: false
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
