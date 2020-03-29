import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import { Link } from "react-router-dom";
import { mainColor, lightBlue, darkBlue } from "../styles/variables.scss";

const NavSection = posed.ul({
  visible: {
    opacity: 1,
    delayChildren: 200,
    staggerChildren: 100,
  },
});

const LinkWrapper = posed.li({
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
  hidden: { opacity: 0, y: -50 },
});

const LinkWrapStyled = styled(LinkWrapper)`
  display: inline-block;
  padding: 0 10px;
  font-weight: 200;
`;

const NavSectionStyled = styled(NavSection)`
  position: absolute;
  top: 10px;
  left: 15px;
  list-style-type: none;
  font-size: 1.5em;
  z-index: 60;
  li:first-of-type {
    margin-left: 40px;
  }
  i {
    -webkit-text-stroke: ${mainColor} 1px;
    color: transparent;
    position: absolute;
    font-size: 1.4em;
    transition: color 150ms ease;
    &:hover {
      color: ${lightBlue};
      -webkit-text-stroke: ${mainColor} 1px;
    }
  }
`;

const LinkStyled = styled(Link)`
  color: ${mainColor};
  z-index: 10;
  a {
    position: relative;
  }
  &:hover {
    color: ${darkBlue};
  }
`;

class NavItems extends React.Component {
  state = {
    navSectionVisible: false,
  };

  componentDidMount() {
    this.setState({
      navSectionVisible: true,
    });
  }

  render() {
    const { navSectionVisible } = this.state;

    const navItems = [
      {
        text: "about",
        to: "/about",
      },
      {
        text: "portfolio",
        to: "/portfolio",
      },
      {
        text: "connect",
        to: "/connect",
      },
      // {
      //   text: 'resume',
      //   to: '/resume'
      // },
    ];

    const navItemsMap = navItems.map(item => {
      return (
        this.props.path !== item.to && (
          <LinkWrapStyled key={item.text}>
            <LinkStyled
              color={this.props.color}
              hovercolor={this.props.hovercolor}
              to={item.to}
            >
              {item.text}
            </LinkStyled>
          </LinkWrapStyled>
        )
      );
    });

    return (
      <React.Fragment>
        <NavSectionStyled pose={navSectionVisible ? "visible" : "hidden"}>
          <Link to="/">
            <i className="material-icons">home</i>
          </Link>
          {navItemsMap}
        </NavSectionStyled>
      </React.Fragment>
    );
  }
}

export default NavItems;
