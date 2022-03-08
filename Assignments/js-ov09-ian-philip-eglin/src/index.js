import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, groupService } from './services';
import { store } from './stores';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Menu component
 * @class
 */
class Menu extends Component {
  /**
   * @method render Renders navbar to component
   * 
   * @returns {NavBar} Navbar containing links
   */
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/groups">Groups</NavBar.Link>
      </NavBar>
    );
  }
}

/**
 * Home page component
 * @class
 */
class Home extends Component {
  /**
   * @method render Renders card to component
   * 
   * @returns {Card} Welcome card
   */
  render() {
    return <Card title="Welcome">Welcome to StudAdm</Card>;
  }
}

/**
 * Studentlist component holding students objects from database
 * @class
 */
class StudentList extends Component {
  students = [];

  /**
   * @method render Render a card with all students
   * 
   * @returns {Card}
   */
  render() {
    return (
      <Card title="Students">
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  /**
   * @method mounted Get all students from database on mount
   */
  mounted() {
    studentService
      .getStudents()
      .then((students) => (this.students = students))
      .catch((error) => Alert.danger('ERROR getting students'));
  }
}

/**
 * Component holding student details
 * @class
 */
class StudentDetails extends Component {
  student = null;
  group = null;

  /**
   * @method render Renders information about student
   * 
   * @returns {div} Div containing Card for student information
   */
  render() {
    if (!this.student || !this.group) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Gruppe:</Column>
            <Column>
              <NavLink to={'/groups/' + this.group.id}>{this.group.name}</NavLink>
            </Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  /**
   * @method mounted Get specific student based on the id passed in the hash history
   */
  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then((student) => (this.student = student))
      .then((student) => {
        groupService
          .getGroup(student.groupID)
          .then((group) => (this.group = group))
          .catch((error) => Alert.danger('ERROR! Failed to get group'));
      })
      .catch((error) => Alert.danger('ERROR getting student'));
  }

  /**
   * @method edit Push new URL with student id to hash history
   */
  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

/**
 * Components holding edit form for student
 * @class
 */
class StudentEdit extends Component {
  student = null;

  /**
   * @method render Renders edit form for student
   * 
   * @returns {div} Div containing form for modifying student values
   */
  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  /**
   * @method mounted Get student object with given ID in URL
   */
  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then((student) => (this.student = student))
      .catch((error) => Alert.danger('ERROR getting students'));
  }

  /**
   * @method save Store modified student object to database
   */
  save() {
    store
      .student(this.student)
      .then((response) => {
        history.push('/students/' + this.props.match.params.id);
      })
      .catch((error) => Alert.danger('ERROR! Failed to update student'));
  }

  /**
   * @method cancel Cancel the editing of new student and navigate to students URL
   */
  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

/**
 * Group list component holding group objects from database
 * @class
 */
class GroupList extends Component {
  groups = [];

  /**
   * @method render Renders Card holding all links to groups
   * 
   * @returns {Card}
   */
  render() {
    return (
      <Card title="Groups">
        {this.groups.map((group) => (
          <Row key={group.id}>
            <Column>
              <NavLink to={'/groups/' + group.id}>{group.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  /**
   * @method mounted Get all groups from database on mount
   */
  mounted() {
    groupService
      .getGroups()
      .then((groups) => {
        this.groups = groups;
      })
      .catch((error) => Alert.danger('Error getting group'));
  }
}

/**
 * Component holding group details
 * @class
 */
class GroupDetails extends Component {
  group = null;
  members = [];

  /**
   * @method render Renders information about group
   * 
   * @returns {div} Div containing Card for group information
   */
  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Group details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.group.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Beskrivelse:</Column>
            <Column>{this.group.description}</Column>
          </Row>
          <Row>
            <Column width={2}>Bilde:</Column>
          </Row>
          <Row>
            <Column>
              <img src={this.group.image}></img>
            </Column>
          </Row>
          <Row>
            <Column width={2}>Leder:</Column>
            <Column>{this.group.leader}</Column>
          </Row>
          <Row>
            <Column width={2}>Medlemmer:</Column>
          </Row>
          {this.members.map((member) => (
            <Row key={member.id}>
              <Column>
                <NavLink to={'/students/' + member.id}>{member.name}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  /**
   * @method mounted Get specific group and it's members by ID passed in URL
   */
  mounted() {
    groupService
      .getGroup(this.props.match.params.id)
      .then((group) => (this.group = group))
      .catch((error) => Alert.danger('Error getting group'));

    groupService
      .getMembers(this.props.match.params.id)
      .then((members) => (this.members = members))
      .catch((error) => Alert.danger('Error getting members'));
  }

  /**
   * @method edit Push new URL with group id to hash history
   */
  edit() {
    history.push('/groups/' + this.group.id + '/edit');
  }
}

/**
 * Components holding edit form for group
 * @class
 */
class GroupEdit extends Component {
  group = null;

  /**
   * @method render Renders edit form for group
   * 
   * @returns {div} Div containing edit form for group values
   */
  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Edit group">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event) => (this.group.name = event.currentTarget.value)}
          />
          <Form.Label>Details:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.description}
            onChange={(event) => (this.group.description = event.currentTarget.value)}
          />
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.image}
            onChange={(event) => (this.group.image = event.currentTarget.value)}
          />
          <Form.Label>Leader:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.leader}
            onChange={(event) => (this.group.leader = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  /**
   * @method mounted Get specific group from database by ID
   */
  mounted() {
    groupService
      .getGroup(this.props.match.params.id)
      .then((group) => (this.group = group))
      .catch((error) => Alert.danger('Error getting group'));
  }

  /**
   * @method save Save modified group values to database
   */
  save() {
    store
      .group(this.group)
      .then((response) => {
        history.push('/groups/' + this.props.match.params.id);
      })
      .catch((error) => Alert.danger('An error occured while updating'));
  }

  /**
   * @method cancel Cancel the editing of new group and navigate to groups URL
   */
  cancel() {
    history.push('/groups/' + this.props.match.params.id);
  }
}

/**
 * Renderer for the React DOM holding a routing for page components
 * NB! This method of routing is outdated. Check React documentation for the
 *    new approach.
 */
ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
        <Route exact path="/groups" component={GroupList} />
        <Route exact path="/groups/:id" component={GroupDetails} />
        <Route exact path="/groups/:id/edit" component={GroupEdit} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
