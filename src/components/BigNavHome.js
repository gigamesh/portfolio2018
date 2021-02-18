import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import media from "../utils/mediaqueries";
import { animations } from "../utils/animations";
import { NavLink } from "react-router-dom";

const NavSection = posed.ul({
  visible: {
    opacity: 1,
    zIndex: 4,
    delayChildren: 2200,
    staggerChildren: 100
  },
  hidden: {
    opacity: 0
  }
});

const NavWrapAnimated = posed.div({
  visible: {
    width: "35%",
    delayChildren: 2000,
    transition: { ease: [0.71, 0.13, 0.35, 0.86], delay: 1800, duration: 800 }
  },
  hidden: {
    width: 0
  }
});

const NavWrap = styled(NavWrapAnimated)`
  position: relative;
  display: flex;
  left: 50px;
`;

const NavSectionStyled = styled(NavSection)`
  padding-top: 50px;
  list-style-type: none;
  line-height: 1em;
  opacity: 0;
  position: relative;
  font-size: 6em;
  ${media.portrait.md`
    font-size: 5.5em;
    `}
  ${media.portrait.sm`
    font-size: 4.8em;
    `}
  ${media.portrait.xs`
    font-size: 4em;
    `}
  ${media.landscape.sm`
    font-size: 4.8em;
  `} 
  ${media.landscape.xs`
    font-size: 3.6em;
  `} 
`;

let LinkWrapper = posed.li(animations.homeNav);
LinkWrapper = styled(LinkWrapper)`
  position: relative;
  width: 100%;
`;

const LinkStyled = styled.a`
  position: relative;
  transition: color 400ms ease;
  -webkit-text-stroke: var(--main-color) 1.5px;
  width: 100%;
  z-index: 1;
  color: #fff;
  ${media.landscape.xs`
    -webkit-text-stroke: var(--main-color) 1px;
  `} ${media.portrait.xs`
    -webkit-text-stroke: var(--main-color) 1px;
  `}
  &:hover {
    color: ${({ color }) => color || "#fff"};
  }
`;

export default props => {
  let { visible } = props;

  const links = () => {
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
  };

  return (
    <NavWrap pose={visible ? "visible" : "hidden"}>
      <NavSectionStyled pose={visible ? "visible" : "hidden"}>
        {links()}
      </NavSectionStyled>
    </NavWrap>
  );
};
