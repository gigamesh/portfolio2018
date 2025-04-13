import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import media from "../utils/mediaqueries";

const H1 = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 0.3rem;
`;

const NavWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  left: 2vmax;
  width: 35%;
`;

const NavSection = styled.ul`
  list-style-type: none;
  font-size: 5rem;
  line-height: 5rem;
  position: relative;
`;

const NavLinkStyled = styled(NavLink)`
  position: relative;
  transition: color 400ms ease;
  -webkit-text-stroke: var(--main-color) 1.5px;
  width: 100%;
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
    let text = ["about", "connect"];

    let linkMap = text.map(val => {
      let link = `/${val}`;
      return (
        <li>
          <NavLinkStyled to={link} color={`var(--light-blue)`}>
            {val}
          </NavLinkStyled>
        </li>
      );
    });
    return linkMap;
  };

  return (
    <NavWrap>
      <H1>Matt Masurka</H1>
      <NavSection>{links()}</NavSection>
    </NavWrap>
  );
};
