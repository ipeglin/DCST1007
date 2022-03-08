import { pool } from './mysql-pool';

/**
 * Creates a service class API for students database
 * @class
 */
class StudentService {
  /**
   * @method getStudents Get all students from database
   * 
   * @returns {Promise} Promise resolving array of student objects upon success
   */
  getStudents() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  /**
   * @method getStudent Get specific student from database
   * 
   * @param {int} id Student ID
   * @returns {Promise} Promise resolving student object upon success
   */
  getStudent(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9 WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }
}
export let studentService = new StudentService();

/**
 * Creates a service class API for group database
 * @class
 */
class GroupService {
  /**
   * @method getGroups Get all groups from database
   * 
   * @returns {Promise} Promise resolving array of group objects upon success
   */
  getGroups() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9', (error, results) => {
        if (error) return reject(error);
        
        resolve(results);
      });
    });
  }
  
  /**
   * @method getGroup Get specific group from database by ID
   * 
   * @param {int} id  ID of the group
   * @returns {Promise} Promise resolving group object upon success
   */
  getGroup(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9 WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  /**
   * @method getMembers Get all members within a group
   * 
   * @param {int} memberGroup ID of the member group
   * @returns {Promise} Promise resolving array of student objects upon success
   */
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