import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { programService } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory();

/**
 * Menu page component
 */
class Menu extends Component {
  /**
   * @method render Renders component to DOM
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
  /**
   * @method render Renders text to component
   * 
   * @returns {div}
   */
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

/**
 * Studentlist component holding students objects from database
 */
class StudentList extends Component {
  students = [];

  // Initiating info for new student
  newStudentName = null;
  newStudentEmail = null;
  newStudentProgramID = null;

  /**
   * @method render Render list to component
   * 
   * @returns {div} Div containing list of links to information page about each student
   */
  render() {
    return (
      <div>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
        <br></br>
        Name:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentName = event.currentTarget.value)}
        />
        <br></br>
        Email:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentEmail = event.currentTarget.value)}
        />
        <br></br>
        Program ID:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentProgramID = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.add}>
          Add Student
        </button>
      </div>
    );
  }

  /**
   * @method mounted Add all students from database to array on load
   */
  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }

  /**
   * @method add Adds a new student to database
   */
  add() {
    studentService.addStudent(
      this.newStudentName,
      this.newStudentEmail,
      this.newStudentProgramID,
      () => {
        history.push('/students');
      }
    );
    this.mounted();
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
   * @returns {div} Div containing list of study programs that the students might be in
   */
  render() {
    return (
      <div>
        <ul>
          {this.programs.map((program) => (
            <li key={program.id}>
              <NavLink to={'/programs/' + program.id + '/edit'}>{program.programName}</NavLink>
            </li>
          ))}
        </ul>
        <br></br>
        Program Name:{' '}
        <input
          type="text"
          onChange={(event) => (this.newProgramName = event.currentTarget.value)}
        />
        <br></br>
        Program Code:{' '}
        <input
          type="text"
          onChange={(event) => (this.newProgramCode = event.currentTarget.value)}
        />
        <br></br>
        Participant Group:{' '}
        <input
          type="text"
          onChange={(event) => (this.newProgramGroup = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.add}>
          Add Study Program
        </button>
      </div>
    );
  }

  /**
   * @method mounted Add all programs from database on mount
   */
  mounted() {
    programService.getPrograms((programs) => {
      this.programs = programs;
    });
  }

  /**
   * @method add Adds a new study program to database
   */
  add() {
    programService.addProgram(
      this.newProgramName,
      this.newProgramCode,
      this.newProgramGroup,
      () => {
        history.push('/programs');
      }
    );
    this.mounted();
  }
}

/**
 * Edit page component for students
 */
class StudentEdit extends Component {
  student = null;
  newProgramName = null;
  newProgramCode = null;
  newProgramGroup = null;

  /**
   * @method render Renders edit page to component
   * 
   * @returns {(null|div)} Div containing input form for changing student properties or null
   */
  render() {
    if (!this.student) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />
        <br></br>
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.remove}>
          Remove Student
        </button>
      </div>
    );
  }

  /**
   * @method mounted Get all students from database on mount
   */
  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  /**
   * @method save Update values in the database for selected student
   */
  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }

  /**
   * @method remove Removing student from database
   */
  remove() {
    studentService.removeStudent(this.props.match.params.id, () => {
      history.push('/students');
    });
  }
}

/**
   * @method render Renders edit page to component
   * 
   * @returns {(null|div)} Div containing input form for changing study program properties or null
   */
class ProgramEdit extends Component {
  program = null;
  studentList = null;

  render() {
    if (!this.program) return null;

    return (
      <div onLoad={this.listParticipants}>
        Program Name:{' '}
        <input
          type="text"
          value={this.program.programName}
          onChange={(event) => (this.program.programName = event.currentTarget.value)}
        />
        <br></br>
        Program Code:{' '}
        <input
          type="text"
          value={this.program.programCode}
          onChange={(event) => (this.program.programCode = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.remove}>
          Remove Program
        </button>
        <br></br>
        Students: {this.studentList}
      </div>
    );
  }

  /**
   * @method mounted Get all students from database on mount
   */
  mounted() {
    programService.getProgram(this.props.match.params.id, (program) => {
      this.program = program;
      programService.getParticipants(this.program.participantGroup, (studentList) => {
        this.studentList = studentList;
      });
    });
  }

  /**
   * @method save Update values in the database for selected study program
   */
  save() {
    programService.updateProgram(this.program, () => {
      history.push('/programs');
    });
  }

  /**
   * @method remove Removing study program from database
   */
  remove() {
    programService.removeProgram(this.props.match.params.id, () => {
      history.push('/programs');
    });
  }

  /**
   * @method listParticipants Get all participants from a given participant group
   */
  listParticipants() {
    programService.getParticipants(this.program.participantGroup),
      (studentList) => {
        this.studentList = studentList;
      };
  }
}

/**
 * Renderer for the React DOM holding a routing for page components
 * NB! This method of routing is outdated. Check React documentation for the
 *    new approach.
 */
ReactDOM.render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/programs" component={ProgramList} />
    <Route path="/programs/:id/edit" component={ProgramEdit} />
  </HashRouter>,
  document.getElementById('root')
);
