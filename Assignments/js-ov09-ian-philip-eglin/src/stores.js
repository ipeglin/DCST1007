import { pool } from './mysql-pool';

class StoreChanges {
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
