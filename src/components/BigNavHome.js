import React from "react";
import posed from "react-pose";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { animations } from "../utils/animations";
import media from "../utils/mediaqueries";

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
  font-size: 6.5rem;
  line-height: 1em;
  opacity: 0;
  position: relative;
`;

let LinkWrapper = posed.li(animations.homeNav);
LinkWrapper = styled(LinkWrapper)`
  position: relative;
  width: 100%;
`;

const NavLinkStyled = styled(NavLink)`
  position: relative;
  transition: color 400ms ease;
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
    let text = ["about", "connect"];

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
