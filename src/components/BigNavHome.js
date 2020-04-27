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
  left: 2vmax;
`;

const NavSectionStyled = styled(NavSection)`
  list-style-type: none;
  font-size: 20em;
  line-height: 1.1em;
  font-weight: 700;
  opacity: 0;
  position: relative;
  top: -1.5vh;
  ${media.portrait.lg`
    font-size: 6.3em;
    `}
  ${media.portrait.md`
    font-size: 5.5em;
    `}
  ${media.portrait.sm`
    font-size: 4.8em;
    `}
  ${media.portrait.xs`
    font-size: 4em;
    `}
  ${media.landscape.xl`
    font-size: 8.4em;
    `}
  ${media.landscape.lg`
    font-size: 7.3em;
    `}
  ${media.landscape.md`
    font-size: 6em;
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

const NavLinkStyled = styled(NavLink)`
  position: relative;
  transition: color 200ms ease;
  -webkit-text-stroke: var(--main-color) 1.5px;
  width: 100%;
  z-index: 1;
  color: #fff;
  padding-bottom: 30px;
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
    let text = ["about", "portfolio", "connect"];

    let linkMap = text.map(val => {
      let link = `/${val}`;
      return (
        <LinkWrapper key={val}>
          <NavLinkStyled to={link} color={`var(--light-blue)`}>
            {val}
          </NavLinkStyled>
        </LinkWrapper>
      );
    });
    return linkMap;
  };

  return (
    <NavWrap pose={visible ? "visible" : "hidden"}>
      <NavSectionStyled pose={visible ? "visible" : "hidden"}>
        {links()}
      </NavSectionStyled>
    </NavWrap>
  );
};
