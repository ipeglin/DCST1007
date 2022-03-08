import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

/**
 * Menu page component
 */
class Menu extends Component {
  /**
   * Renders component to DOM
   * 
   * @returns {div} Div holding navbar
   */
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/programs" activeStyle={{ color: 'darkblue' }}>
          Programs
        </NavLink>
      </div>
    );
  }
}

/**
 * Home page component
 */
class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

/**
 * Studentlist component holding students objects from database
 */
class StudentList extends Component {
  students = [];

  /**
   * Render list to component
   * 
   * @returns {ul} List of links to information page about each student
   */
  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  /**
   * Add all students from database to array
   */
  mounted() {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

/**
 * Component holding list of studyprograms for students
 */
class ProgramList extends Component {
  programs = [];

  /**
   * Render list to component
   * 
   * @returns {ul} List of study programs that the students might be in
   */
  render() {
    return (
      <ul>
        {this.programs.map((program) => (
          <li key={program.id}>
            <NavLink to={'/programs/' + program.id}>{program.programName}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  /**
   * Retrieving all data from the table containing all the different programs
   */
  mounted() {
    pool.query('SELECT * FROM StudyPrograms', (error, results) => {
      if (error) return console.error(error);

      this.programs = results;
    });
  }
}

/**
 * Component holding student details
 */
class StudentDetails extends Component {
  student = null;
  studyProgram = null;

  /**
   * Render information about student to component
   * 
   * @returns {(null|ul)} List of student properties or null
   */
  render() {
    if (!this.student) return null;

    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>Studieprogram: {this.studyProgram}</li>
      </ul>
    );
  }

  /**
   * Require the information about the student and their study program
   */
  mounted() {
    pool.query(
      'SELECT * FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error);
        this.student = results[0];

        pool.query(
          `SELECT * FROM StudyPrograms WHERE id=${this.student.programID}`,
          (error, results) => {
            if (error) return console.error(error);
            console.log(results);
            this.studyProgram = results[0].programName;
          }
        );
      }
    );
  }
}

/**
 * Component for listing the details of each study program
 */
class ProgramDetails extends Component {
  program = null;
  studentList = null; // Variable for holding names.

  /**
   * Renders list of details to component
   * 
   * @returns {(null|div)} List of details on study program or null
   */
  render() {
    if (!this.program) return null;

    return (
      <ul>
        <li>Studieprogram: {this.program.programName}</li>
        <li>Kode: {this.program.programCode}</li>
        <li>Studenter: {this.studentList}</li>
      </ul>
    );
  }

  /**
   * Request data from database with the program info and participant group identifier for each of them
   */
  mounted() {
    pool.query(
      'SELECT * FROM StudyPrograms WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error);

        this.program = results[0];

        // Getting participants from specific study program
        pool.query(
          `SELECT * FROM Participants WHERE groupID=${this.program.participantGroup}`,
          (error, results) => {
            if (error) return console.error(error);
            this.studentList = '';

            for (let student of results) {
              this.studentList += `${student.name}, `;
            }

            // Remove the last to characters ' ,' if the list isn't empty
            this.studentList
              ? (this.studentList = this.studentList.substring(0, this.studentList.length - 2))
              : null;
          }
        );
      }
    );
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
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/programs" component={ProgramList} />
      <Route exact path="/programs/:id" component={ProgramDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

pool.query('SELECT * FROM Students', [], (error, response) => {
  if (error) return console.error(error);

  console.log('Initial response:', response);
});
