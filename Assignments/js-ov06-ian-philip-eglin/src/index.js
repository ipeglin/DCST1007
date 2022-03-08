import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

/**
 * Menu component for navigation
 */
class Menu extends Component {
  /**
   * Renders the menu to the DOM
   * 
   * @returns {div} Div holding the nivbar
   */
  render() {
    return (
      <div>
        Menu:
        <ul>
          <li><NavLink to="/">Homepage Title</NavLink></li>
          <li><NavLink to="/education">Education</NavLink></li>
          <li><NavLink to="/work_experience">Work Experience</NavLink></li>
          <li><NavLink to="/skills">Skills</NavLink></li>
        </ul>
        
      </div>
    );
  }
}

/**
 * Home page component
 */
class Home extends Component {
  render() {
    return <div><h1>*Your Name Here*</h1><h3><i>*Short Text About You*</i></h3></div>;
  }
}

/**
 * Education page component
 */
class Education extends Component {
  render() {
    return <div>*Your Education Listed Here*</div>;
  }
}

/**
 * Work Experience page component
 */
class WorkExperience extends Component {
  render() {
    return <div>*Your Previous Work Experience Here*</div>;
  }
}

/**
 * Skills page component
 */
class Skills extends Component {
  render() {
    return <div>*Your Additional Skills Here*</div>
  }
}

/**
 * Renderer for the React DOM holding a routing for page components
 * NB! This method of routing is outdated. Check React documentation for the
 *    new approach.
 */
ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/education" component={Education} />
      <Route path="/work_experience" component={WorkExperience} />
      <Route path="/skills" component={Skills} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
