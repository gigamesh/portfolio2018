import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import ScrollPercentage from 'react-scroll-percentage'
import './styles/page-swipes.css';

class App extends Component {

  render() {
    const currentKey = this.props.location.pathname.split('/')[1] || '/';

    return (
    <React.Fragment>
      <TransitionGroup>
        <CSSTransition
          key={currentKey}
          timeout={500}
          classNames="swipe"
          // appear
          >
          <ScrollPercentage>
            {({percentage}) => (  
            <Switch location={this.props.location} key="switch">
              <Route path="/" exact render={routeProps => (
                <LandingPage {...routeProps} percentage={percentage}/>
                )}/>      
              <Route path="/contact" exact component={Contact}/>      
              <Route path="/portfolio" exact component={Portfolio}/>      
              <Route path="/about" exact component={About}/>      
              <Route path="/resume" exact component={Resume}/>      
              <Route path="/home" exact component={Home}/>      
            </Switch>
            )}
          </ScrollPercentage>
        </CSSTransition>
      </TransitionGroup>
      <div id='headshot-loader'/>
    </React.Fragment>
    );
  }
}

export default withRouter(App);
