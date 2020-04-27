import React, { Component } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import ReactTooltip from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import { animations } from "../utils/animations";
import posed from "react-pose";
import { Header } from "./ui";

const FullPageWrap = styled.div`
  background: #f7f7f7;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  top: -30px;
  position: relative;
  height: 65%;
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
`;
const InnerWrap = styled.div`
  position: relative;
  background: #fff;
  padding: 40px;
  margin: 0 auto;
  margin-bottom: 40px;
  height: 100%;
  border: 1px solid var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.portrait.md`
    padding: 20px;
    `}
`;

let LinkList = posed.ul({
  visible: {
    opacity: 1,
    staggerChildren: 100,
    delayChildren: 300
  },
  hidden: {
    opacity: 0,
    staggerChildren: 0
  }
});

LinkList = styled(LinkList)`
  position: relative;
  list-style-type: none;
  font-size: 4.6em;
  line-height: 130%;
  white-space: pre;
  overflow: hidden;
  left: 4%;
  user-select: none;
  span {
    /* -webkit-text-stroke: var(--main-color) 1px; */
  }
  svg {
    position: relative;
    transition: fill 200ms ease;
    fill: var(--main-color);
    margin-right: 30px;
    width: 70px;
  }
  li:hover {
    color: var(--dark-blue);
    text-decoration: underline;
  }
  li:hover svg {
    fill: var(--dark-blue);
  }
  .tooltip-email{
    font-size: 20px;
    background: #fff;
    color: var(--main-color);
    border: 1px solid var(--main-color);
  }
  .icon-email {
    bottom: -10px;
  }
  .icon-github {
    bottom: -15px;
  }
  .icon-medium {
    bottom: -15px;
  }
  .icon-twitter {
    bottom: -15px;
  }
  ${media.portrait.md`
    font-size: 3.8em;
    svg {
      margin-right: 15px;
      width: 60px;
    }
  `}
  ${media.portrait.sm`
    font-size: 3em;
    left: 0;
    svg {
      margin-right: 15px;
      width: 50px;
    }
  `}
  ${media.portrait.xs`
    font-size: 2.8em;
    svg {
      width: 40px;
    } 
  `}
  ${media.landscape.md`
    font-size: 4.6em;
    line-height: 120%;
    svg {
      width: 60px;
    } 
  `}
  ${media.landscape.sm`
    font-size: 3.8em;
  `}
  ${media.landscape.xs`
    font-size: 3em;
        svg {
          width: 40px;
    } 
  `}
`;

let ListItem = posed.li(animations.homeNav);

const SVGInject = styled(ReactSVG)`
  display: inline;
  position: relative;
    div {
      position: relative;
      display: inline;
    }
  }
`;

export default class Contact extends Component {
  state = {
    visible: false,
    copied: false,
    tooltipText: "Click to copy email address"
  };

  componentDidMount() {
    this.setState({
      visible: true,
      copied: false
    });
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  onCopy = () => {
    this.setState({
      copied: true,
      tooltipText: "Copied to clipboard!"
    });
    setTimeout(() => {
      this.setState({
        tooltipText: "Click to copy email address"
      });
    }, 8000);
  };

  render() {
    let { visible } = this.state;

    return (
      <FullPageWrap>
        {this.props.children}
        {!this.props.menuBtnShowing && (
          <NavItems
            color={"#5296ce"}
            hovercolor={"#205887"}
            path={this.props.location.pathname}
          />
        )}
        <Container>
          <Header
            pose={this.state.visible ? "visible" : "hidden"}
            color={"var(--light-blue)"}
          >
            connect
          </Header>
          <InnerWrap pose={this.state.visisible ? "visible" : "hidden"}>
            <LinkList pose={visible ? "visible" : "hidden"}>
              <ListItem
                style={{ cursor: "pointer" }}
                data-tip={this.state.tooltipText}
                key={this.state.tooltipText}
              >
                <a rel="noopener noreferrer" href="mailto:m.masurka@gmail.com">
                  <SVGInject
                    path="/img/icons/mail.svg"
                    svgClassName="icon-email"
                  />
                  <span>email</span>
                </a>
              </ListItem>

              <ListItem>
                <a
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/matt-masurka-334762150/"
                  target="_blank"
                >
                  <SVGInject
                    path="/img/icons/linkedin.svg"
                    svgClassName="icon-linkedin"
                  />
                  <span>linkedin</span>
                </a>
              </ListItem>
              <ListItem>
                <a
                  rel="noopener noreferrer"
                  href="https://github.com/gigamesh"
                  target="_blank"
                >
                  <SVGInject
                    path="/img/icons/github.svg"
                    svgClassName="icon-github"
                  />
                  <span>github</span>
                </a>
              </ListItem>
              {/* <ListItem>
                <a
                  rel="noopener noreferrer"
                  href="https://medium.com/@m.masurka"
                  target="_blank"
                >
                  <SVGInject
                    path="/img/icons/medium.svg"
                    svgClassName="icon-medium"
                  />
                  <span>medium</span>
                </a>
              </ListItem> */}
              <ListItem>
                <a
                  rel="noopener noreferrer"
                  href="https://twitter.com/gigamesh"
                  target="_blank"
                >
                  <SVGInject
                    path="/img/icons/twitter.svg"
                    svgClassName="icon-twitter"
                  />
                  <span>twitter</span>
                </a>
              </ListItem>
            </LinkList>
          </InnerWrap>
        </Container>
      </FullPageWrap>
    );
  }
}
