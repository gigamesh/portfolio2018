import React, { Component } from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import portfolioItems from "./portfolioItems";
import Modal from "./Modal";
import posed from "react-pose";
import { animations } from "../utils/animations";
import { Header } from "./ui";
import { mainColor, lightBlue } from "../styles/variables.scss";

const FullPageWrap = styled.div`
  background: #f7f7f7;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  color: #28435e;
  filter: ${props => (props.active ? "blur(5px)" : "")};
  transition: filter 100ms ease;
`;

const AnimationWrap = styled.div`
  display: table;
  text-align: center;
  position: relative;
  margin: 0 auto;
  max-width: 1000px;
  top: -30px;
  width: 90%;
  ${media.portrait.lg`
    width: 96%;
  `}
  ${media.landscape.md`
    width: 96%;
  `}
`;
let ItemWrap = posed.div({
  visible: {
    opacity: 1,
    staggerChildren: 100,
    delayChildren: 200,
  },
  hidden: {
    opacity: 0,
    staggerChildren: 10,
  },
});

ItemWrap = styled(ItemWrap)`
  padding: 40px;
  position: relative;
  background: #fff;
  height: 70%;
  border: 1px solid ${mainColor};
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  margin-bottom: 50px;
  &:hover > *:not(:hover) {
    filter: opacity(40%);
  }
  @media (max-width: 1100px){
    grid-template-columns: 1fr 1fr;   
  }
  ${media.landscape.sm`
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    padding: 25px; 
  `}
  ${media.portrait.xl`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.portrait.lg`
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    padding: 30px; 
  `}
  ${media.portrait.sm`
    padding: 20px; 
    grid-template-columns: 1fr;
  `}
`;
let GridCell = posed.div(animations.homeNav);

GridCell = styled(GridCell)`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  &:hover {
    filter: opacity(100%);
    cursor: pointer;
  }
  &:hover div {
    opacity: 1;
  }
  transition: filter 300ms ease;
`;

const Item = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10%;
  border-radius: 3px;
  background-color: #324b56;
  background: url('${props => props.img}');
  background-size: cover;
  border: 1px solid rgba(0,0,0,0.4);
  transition: all 300ms ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export default class Contact extends Component {
  state = {
    visisible: false,
    activeItem: "",
    item: {},
    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.setState({
      visisible: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.width !== this.fullpage.clientWidth ||
      prevState.height !== this.fullpage.clientHeight
    ) {
      this.setState({
        width: this.fullpage.clientWidth,
        height: this.fullpage.clientHeight,
      });
    }
  }

  itemClickHandler = item => {
    this.setState({ activeItem: item.title, item: item });
  };
  closeModalHandler = () => {
    this.setState({ activeItem: "" });
  };

  render() {
    let { width, height } = this.state;
    let heightToRender = this.props.pageHeight;
    const portfolio = portfolioItems.map(item => {
      return (
        <div key={item.title}>
          <GridCell
            key={item.title}
            active={this.state.activeItem === item.title ? "yup" : ""}
          >
            <Item
              url={item.url}
              img={item.img}
              onClick={() => this.itemClickHandler(item)}
            ></Item>
          </GridCell>
        </div>
      );
    });

    if (height > heightToRender) {
      heightToRender = height;
    }

    return (
      <React.Fragment>
        {this.state.activeItem ? (
          <Modal
            close={this.closeModalHandler}
            item={this.state.item}
            dimensions={{ width, height: heightToRender }}
          />
        ) : null}
        <FullPageWrap
          active={this.state.activeItem}
          innerRef={fullpage => {
            this.fullpage = fullpage;
          }}
        >
          {this.props.children}
          {!this.props.menuBtnShowing && (
            <NavItems
              color={"#5296ce"}
              hovercolor={"#205887"}
              path={this.props.location.pathname}
            />
          )}
          <AnimationWrap>
            <Header
              pose={this.state.visisible ? "visible" : "hidden"}
              color={lightBlue}
            >
              portfolio
            </Header>
            <ItemWrap pose={this.state.visisible ? "visible" : "hidden"}>
              {portfolio}
            </ItemWrap>
          </AnimationWrap>
        </FullPageWrap>
      </React.Fragment>
    );
  }
}
