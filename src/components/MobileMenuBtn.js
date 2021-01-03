import React from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";

const MenuBtn = styled.div`
  width: 60px;
  height: 45px;
  position: absolute;
  top: 1.5vmax;
  left: 1.5vmax;
  transform: rotate(0deg);
  transform: ${({ scale }) => (scale ? scale : "scale(0.7)")};
  z-index: 11;
  ${media.portrait.sm`
    left: 0;
    top: 1vmax;
  `}
  cursor: pointer;
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--main-color);
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.2s ease-in-out;
  }
  &:hover span {
    background: var(--dark-blue);
  }
  span:nth-child(1) {
    top: 0px;
  }
  span:nth-child(2),
  span:nth-child(3) {
    top: 18px;
  }
  span:nth-child(4) {
    top: 36px;
  }
  &.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }
  &.open span:nth-child(2) {
    transform: rotate(45deg);
  }
  &.open span:nth-child(3) {
    transform: rotate(-45deg);
  }
  &.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }
`;

const MobileMenu = ({ open, clickHandler, dimensions }) => {
  let scale;

  if (dimensions.x < 400 || dimensions.y < 400) {
    scale = "scale(.5)";
  }

  return (
    <MenuBtn
      onClick={clickHandler}
      className={open ? "open" : ""}
      scale={scale}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </MenuBtn>
  );
};
export default MobileMenu;
