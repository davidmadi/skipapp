import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import ListItems from './Views/ListItems';
import SubItemsList from './Views/SubItemsList';
import About from './Views/About';
import MenuApp from './Views/MenuApp';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
          </a>
          <div id="menu" className="menu">
            <MenuApp />
          </div>
          <div id="content">
            {this.props.children}
          </div>            
          <Route path="/items" component={() => <ListItems />} />
          <Route path="/about" component={About} />
          <Route path="/subitems/:itemid" component={SubItemsList} />
        </div>
      </Router>
    )
  }
}

export default App;
