import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import media from "../utils/mediaqueries";
import { animations } from "../utils/animations";
import { NavLink } from "react-router-dom";

const NavSection = posed.ul({
  visible: {
    opacity: 1,
    staggerChildren: 50
  },
  hidden: {
    opacity: 0,
    staggerChildren: 10
  }
});

const NavSectionStyled = styled(NavSection)`
  list-style-type: none;
  font-size: 7.5em;
  line-height: 1.1em;
  opacity: 0;
  position: relative;
  ${media.portrait.md`
    font-size: 6.3em;
    `}
  ${media.portrait.sm`
    font-size: 4.8em;
    `}
  ${media.portrait.xs`
    font-size: 4em;
    `}
  ${media.landscape.md`
    font-size: 6em;

    `}
  ${media.landscape.sm`
    font-size: 4.5em;
  `} 
  ${media.landscape.xs`
    font-size: 4em;
  `} 
`;

let LinkWrapper = posed.li(animations.homeNav);
LinkWrapper = styled(LinkWrapper)`
  position: relative;
  width: 100%;
`;

const LinkStyled = styled.a`
  position: relative;
  transition: color 200ms ease;
  -webkit-text-stroke: var(--main-color) 1.5px;
  width: 100%;
  z-index: 1;
  color: #fff;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 18%;
    z-index: -1;
    transition: height 200ms ease;
    background: ${({ color }) => color || "#fff"};
    padding: 0 4px;
    left: -2px;
  }
  &:hover {
    color: ${({ color }) => color || "#fff"};
    /* color: #fff; */
  }
  ${media.portrait.sm`
    -webkit-text-stroke: var(--main-color) 1px;
  `}
  ${media.landscape.sm`
    -webkit-text-stroke: var(--main-color) 1px;
  `}
`;

class BigNavMobile extends React.Component {
  render() {
    let { visible, clickHandler, pathname } = this.props;

    let links = [
      { text: "fren", href: "https://finfren.com" },
      { text: "creator", href: "https://spectranova.life" },
      { text: "producer", href: "https://gigameshmusic.com" },
      { text: "optimist", href: "https://optimism.io" }
    ];

    return links.map(link => {
      return (
        <LinkWrapper key={link.text}>
          <LinkStyled
            href={link.href}
            color={`var(--light-blue)`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </LinkStyled>
        </LinkWrapper>
      );
    });
  }
}
export default BigNavMobile;
