import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
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

class Home extends Component {
  render() {
    return <div><h1>*Your Name Here*</h1><h3><i>*Short Text About You*</i></h3></div>;
  }
}

class Education extends Component {
  render() {
    return <div>*Your Education Listed Here*</div>;
  }
}

class WorkExperience extends Component {
  render() {
    return <div>*Your Previous Work Experience Here*</div>;
  }
}

class Skills extends Component {
  render() {
    return <div>*Your Additional Skills Here*</div>
  }
}

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
