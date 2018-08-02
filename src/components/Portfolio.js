import React, { Component } from 'react'
import styled from 'styled-components'
import media from '../utils/mediaqueries';
import NavItems from './NavItems';
import { animations } from '../utils/animations';
import portfolioItems from './portfolioItems';
import posed from 'react-pose';
import Modal from './Modal';
import { Header, HeaderIcon } from './ui'

const FullPageWrap = styled.div`
  background: var(--lighter-blue);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  color: #28435e;
  filter: ${props => props.active ? 'blur(5px)' : ''};
  /* ${media.landscape.md`
    height: 175%;
  `} */
  transition: filter 300ms ease;
`
const PosedDiv = posed.div(animations.main);

const AnimationWrap = styled.div`
  display: table;
  text-align: center;
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  top: -40px;
  width: 90%;
  ${media.portrait.lg`
    width: 96%;
  `}
  ${media.landscape.md`
    width: 96%;
  `}
`

const ItemWrap = styled.div`
  padding: 40px;
  position: relative;
  background: #fff;
  height: 70%;
  border: 2px solid var(--main-color);
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  margin-bottom: 50px;
  &:hover > *:not(:hover) {
    filter: opacity(50%);
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
`

const GridCell = styled.div`
  position: relative;
  /* width: 100%; */
  &:before{
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
`

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
  box-shadow: 2px 4px 8px 4px rgba(0,0,0,0.4);
  transition: all 300ms ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 7px 30px 4px rgba(0,0,0,0.5);
  }
`

export default class Contact extends Component {
  state = {
    visisible: false,
    activeItem: '',
    item: {},
    width: 0,
    height: 0
  }

  componentDidMount(){
    this.setState({
      visisible: true
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.width !== this.fullpage.clientWidth
    || prevState.height !== this.fullpage.clientHeight){
      this.setState({
        width: this.fullpage.clientWidth,
        height: this.fullpage.clientHeight
        })
    }
  }

  itemClickHandler = (item) => {
    this.setState({ activeItem: item.title, item: item});
  }
  closeModalHandler = () => {
    this.setState({ activeItem: ''})
  }

  render() {
    let{ width, height } = this.state;
    let heightToRender = this.props.pageHeight;
    const portfolio = portfolioItems.map(item => {
      return (
        <GridCell 
          key={item.title}
          active={this.state.activeItem === item.title ? 'yup' : ''}>
          <Item 
            url={item.url} 
            img={item.img} 
            onClick={() => this.itemClickHandler(item)}
            />
        </GridCell>
      )
    })

    if(height > heightToRender){
      heightToRender = height;
    }


    return (
      <React.Fragment>
        {this.state.activeItem ? <Modal 
          close={this.closeModalHandler}
          item={this.state.item}
          dimensions={{width, height: heightToRender}}
          /> : null}
        <FullPageWrap 
          active={this.state.activeItem} 
          innerRef={ (fullpage) => {this.fullpage = fullpage}}>
          {this.props.children}
          {!this.props.menuBtnShowing && 
          <NavItems 
            color={'#5296ce'} 
            hovercolor={'#205887'}
            path={this.props.location.pathname}
            />}
          <AnimationWrap>
            <Header
              pose={this.state.visisible ? 'visible' : 'hidden'}
              color='var(--portfolio-color)'>
                portfolio
              <HeaderIcon alt="Portfolio Paint Brush Icon" 
                bgURL={'/img/icons/retro/paint_blue_clean-01.png'}/>
            </Header>
            <ItemWrap pose={this.state.visisible ? 'visible' : 'hidden'}>
              {portfolio}
            </ItemWrap>       
          </AnimationWrap>
        </FullPageWrap>
      </React.Fragment>
    )
  }
}
