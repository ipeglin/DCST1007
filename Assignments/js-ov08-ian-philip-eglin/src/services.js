import { pool } from './mysql-pool';

/**
 * Creates a service class API for students database
 * @class
 */
class StudentService {
  /**
   * @method getStudents Get all students from database
   * 
   * @param {function} success Callback function for adding students
   */
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  /**
   * @method getStudent Get a specific student from database
   * 
   * @param {int} id Student id in database
   * @param {function} success Callback function for retrieving student
   */
  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  /**
   * @method addStudent Add a new student to database
   * 
   * @param {function} success Callback function 
   */
  addStudent(success) {
    pool.query(
      'INSERT INTO Students (name, email, programID) VALUES (?, ?, ?)',
      [name, email, programID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  /**
   * @method removeStudent
   * 
   * @param {int} id  Student id in database
   * @param {function} success Callback function 
   */
  removeStudent(id, success) {
    pool.query('SELECT name FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      console.log(results);
      console.log(results[0].name);
      let name = results[0].name;

      pool.query('DELETE FROM Participants WHERE name=?', [name], (error, results) => {
        if (error) return console.error(error);

        success();
      });
    });
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  /**
   * @method addStudent Add a new student to database
   * 
   * @param {string} name Name of new student 
   * @param {string} email Email of new student 
   * @param {int} programID ID of the studyprogram the student is enrolled in
   * @param {function} success Callback function
   */
  addStudent(name, email, programID, success) {
    pool.query(
      'INSERT INTO Students (name, email, programID) VALUES (?,?,?)',
      [name, email, programID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
    pool.query(
      'INSERT INTO Participants (name, groupID) VALUES (?,?)',
      [name, programID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  /**
   * @method updateStudent Update database values for a specific student
   * 
   * @param {string} student Name of the student 
   * @param {function} success Callback function
   */
  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let studentService = new StudentService();

/**
 * Creates a service class API for study program database
 * @class
 */
class ProgramService {
  /**
   * @method getPrograms Get all programs from database
   * 
   * @param {function} success Callback function 
   */
  getPrograms(success) {
    pool.query('SELECT * FROM StudyPrograms', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  /**
   * @method getProgram Get specific study program from database
   * 
   * @param {int} id Study program ID
   * @param {function} success Callback function
   */
  getProgram(id, success) {
    pool.query('SELECT * FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  /**
   * @method getParticipants Get all students in program group from database
   * 
   * @param {int} groupID ID of the study program group
   * @param {function} success  Callback function
   */
  getParticipants(groupID, success) {
    let list;
    pool.query('SELECT * FROM Participants WHERE groupID=?', [groupID], (error, results) => {
      if (error) return console.error(error);
      list = '';

      for (let student of results) {
        list += `${student.name}, `;
      }
      list ? (list = list.substring(0, list.length - 2)) : null;

      success(list);
    });
  }

  /**
   * @method removeProgram Removed a studyprogram from database
   * 
   * @param {int} id ID of the studyprogram
   * @param {function} success  Callback function
   */
  removeProgram(id, success) {
    pool.query('DELETE FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  /**
   * @method updateProgram database values for a specific study program
   * 
   * @param {string} program New name for the study program
   * @param {function} success Callback function
   */
  updateProgram(program, success) {
    pool.query(
      'UPDATE StudyPrograms SET programName=?, programCode=? WHERE id=?',
      [program.programName, program.programCode, program.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  /**
   * @method addProgram Add a new study program to database
   * 
   * @param {string} name Name of the new study program
   * @param {string} code Subject code of the new study program
   * @param {int} group Participant group ID
   * @param {function} success  Callback function
   */
  addProgram(name, code, group, success) {
    pool.query(
      'INSERT INTO StudyPrograms (programName, programCode, participantGroup) VALUES (?,?,?)',
      [name, code, group],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let programService = new ProgramService();
