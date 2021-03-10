import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

class Menu extends Component {
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

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

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

  mounted() {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

// Added a new component for listing the different studyprograms
class ProgramList extends Component {
  programs = [];

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

  mounted() {
    // Retrieving all data from the table containing all the different programs
    pool.query('SELECT * FROM StudyPrograms', (error, results) => {
      if (error) return console.error(error);

      this.programs = results;
    });
  }
}

class StudentDetails extends Component {
  student = null;
  studyProgram = null;

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

  mounted() {
    pool.query(
      'SELECT * FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return
        this.student = results[0];

        // Require the information containing the students studyprogram
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

// Created a new component for listing the details of each study program
class ProgramDetails extends Component {
  program = null;
  // Creating an variable for holding names. Making it more neat to organize
  studentList = null;

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

  mounted() {
    // Requesting data from database containing the program information as well as the participant group identifier for each of them
    pool.query(
      'SELECT * FROM StudyPrograms WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error);

        this.program = results[0];

        // Sending a new information request to a third database containing participants for all programs. Only retrieving the names from the wanted program
        pool.query(
          `SELECT * FROM Participants WHERE groupID=${this.program.participantGroup}`,
          (error, results) => {
            if (error) return console.error(error);
            this.studentList = '';

            // Adding all the student names to the
            for (let student of results) {
              this.studentList += `${student.name}, `;
            }

            // If the list contains names... Remove the last to characters (' ,'). Else... Don't do anything
            this.studentList
              ? (this.studentList = this.studentList.substring(0, this.studentList.length - 2))
              : null;
          }
        );
      }
    );
  }
}

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
