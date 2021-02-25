import React, { Component, createRef } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./components/Home";
import Connect from "./components/Connect";
import About from "./components/About";
import MobileMenu from "./components/MobileMenu";
import "./styles/page-swipes.css";

const mouseEaseDuration = 12;

class App extends Component {
  state = {
    initialLoad: false,
    pageDimensions: {
      x: null,
      y: null
    },
    homeKey: 0,
    menuBtnShowing: false,
    bigNavMobileOpen: false,
    mobileMenuOpen: false,
    homeNavShowing: true,
    source: "",
    hasIntroFinished: false
  };

  mouseCoords = {
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1
  };
  prevMouseCoords = {
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1
  };

  updatePrevMouseCoords = () => {
    this.prevMouseCoords.x =
      this.prevMouseCoords.x +
      (this.mouseCoords.x - this.prevMouseCoords.x) / mouseEaseDuration;
    this.prevMouseCoords.y =
      this.prevMouseCoords.y +
      (this.mouseCoords.y - this.prevMouseCoords.y) / mouseEaseDuration;
  };

  registerIntroFinished = () => {
    this.setState({ hasIntroFinished: true });
  };

  checkMenus = () => {
    let { x, y } = this.state.pageDimensions;

    if (x === null || y === null) {
      return;
    }
    if (x > 1200 || y > 1200) {
      this.setState({ menuBtnShowing: false });
    } else {
      this.setState({ menuBtnShowing: true });
    }
    if ((x < 1000 && x / y < 1.6) || (x > 1000 && x / y < 1.2)) {
      this.setState({ homeNavShowing: false, menuBtnShowing: true });
    } else {
      this.setState({ homeNavShowing: true });
    }
  };

  updateDimensions = () => {
    this.setState(prevState => ({
      pageDimensions: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      homeKey: prevState.homeKey + 1
    }));
  };

  clickHandler = (e, source) => {
    let { mobileMenuOpen } = this.state;

    if (source) {
      this.setState({ source: source });
    } else {
      this.setState({ source: "" });
    }

    if (mobileMenuOpen) {
      this.setState({ bigNavMobileOpen: false });
      setTimeout(() => {
        this.setState({ mobileMenuOpen: false });
      }, 10);
    } else {
      this.setState({ mobileMenuOpen: true });
      setTimeout(() => {
        this.setState({ bigNavMobileOpen: true });
      }, 10);
    }
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.checkMenus();

    document.body.addEventListener("mousemove", this.mouseMove);
  }

  componentDidUpdate(prevProps, prevState) {
    let { x, y } = this.state.pageDimensions;
    let prevX = prevState.pageDimensions.x;
    let prevY = prevState.pageDimensions.y;
    if (prevX === x && prevY === y) {
      return;
    }
    this.checkMenus();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    document.body.removeEventListener("mousemove", this.mouseMove, true);
  }

  mouseMove = e => {
    this.mouseCoords.x = e.clientX;
    this.mouseCoords.y = e.clientY;
  };

  render() {
    const pathname = this.props.location.pathname.split("/")[1] || "/";
    let {
      menuBtnShowing,
      mobileMenuOpen,
      bigNavMobileOpen,
      pageDimensions,
      homeNavShowing,
      source,
      hasIntroFinished
    } = this.state;

    const mobileMenuComp = color => (
      <MobileMenu
        clickHandler={this.clickHandler}
        mobileMenuOpen={mobileMenuOpen}
        bigNavMobileOpen={bigNavMobileOpen}
        btncolor={color}
        dimensions={pageDimensions}
        source={source}
        pathname={pathname}
      />
    );

    return (
      <React.Fragment>
        <TransitionGroup>
          <CSSTransition key={pathname} timeout={500} classNames="fade">
            <Switch location={this.props.location} key="switch">
              <Route
                path="/connect"
                exact
                render={routeProps => (
                  <Connect {...routeProps} menuBtnShowing={menuBtnShowing}>
                    {menuBtnShowing && mobileMenuComp()}
                  </Connect>
                )}
              />
              <Route
                path="/about"
                exact
                render={routeProps => (
                  <About {...routeProps} menuBtnShowing={menuBtnShowing}>
                    {menuBtnShowing && mobileMenuComp("#fff")}
                  </About>
                )}
              />
              <Route
                path="/"
                exact
                render={routeProps => (
                  <Home
                    hasIntroFinished={hasIntroFinished}
                    registerIntroFinished={this.registerIntroFinished}
                    homeNavShowing={homeNavShowing}
                    clickHandler={this.clickHandler}
                    mouseCoords={this.mouseCoords}
                    prevMouseCoords={this.prevMouseCoords}
                    updatePrevMouseCoords={this.updatePrevMouseCoords}
                    {...routeProps}
                  >
                    {menuBtnShowing && mobileMenuComp()}
                  </Home>
                )}
              />
              <Route
                path="/:any"
                render={routeProps => (
                  <Home {...routeProps} menuBtnShowing={menuBtnShowing}>
                    {menuBtnShowing && mobileMenuComp()}
                  </Home>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <div id="headshot-loader" />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
