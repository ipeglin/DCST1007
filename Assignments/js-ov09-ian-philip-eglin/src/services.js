import { pool } from './mysql-pool';

class StudentService {
  getStudents() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getStudent(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9 WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getGroup(id) {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM GroupsOOP9 WHERE id=?", [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    })
  }
}
export let studentService = new StudentService();

class GroupService {
  getGroups() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getGroup(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9 WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getMembers(memberGroup) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9 WHERE groupID=?', [memberGroup], (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }
}
export let groupService = new GroupService();
