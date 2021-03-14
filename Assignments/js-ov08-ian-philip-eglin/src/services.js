import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

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

class ProgramService {
  getPrograms(success) {
    pool.query('SELECT * FROM StudyPrograms', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getProgram(id, success) {
    pool.query('SELECT * FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

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

  removeProgram(id, success) {
    pool.query('DELETE FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

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
