import { pool } from './mysql-pool';

/**
 * Creates a service class API for storing new values in databases
 * @class
 */
class StoreChanges {
  /**
   * @method student Update database values for a specific student
   * 
   * @param {object} student Student object
   * @returns {Promise} Promise resolving if query succeeds
   */
  student(student) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE StudentsOOP9 SET name=?, email=? WHERE id=?',
        [student.name, student.email, student.id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  /**
   * @method group Update database values for a specific group
   * 
   * @param {object} group Group object
   * @returns {Promise} Promise resolving if query succeeds
   */
  group(group) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE GroupsOOP9 SET name=?, description=?, image=?, leader=?, memberGroup=? WHERE id=?',
        [group.name, group.description, group.image, group.leader, group.memberGroup, group.id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

export let store = new StoreChanges();
