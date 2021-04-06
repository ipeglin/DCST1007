import { pool } from './mysql-pool';

export class Student {
  id: number = 0;
  name: string = "";
  email: string = "";
}

export class Group {
  id: number = 0;
  name: string = "";
  description: string = "";
  image: string = "";
  leader: string = "";
  memberGroup: string = "";
}

class StudentService {
  getStudents() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9', (error: any, results: unknown) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getStudent(id: number) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9 WHERE id=?', [id], (error: any, results: unknown[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getGroup(id: number) {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM GroupsOOP9 WHERE id=?", [id], (error: any, results: unknown[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    })
  }

  storeStudent(student: Student) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE StudentsOOP9 SET name=?, email=? WHERE id=?',
        [student.name, student.email, student.id],
        (error: any, results: any) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}
export let studentService = new StudentService();

class GroupService {
  getGroups() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9', (error: any, results: unknown) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getGroup(id: number) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM GroupsOOP9 WHERE id=?', [id], (error: any, results: unknown[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getMembers(memberGroup: number) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM StudentsOOP9 WHERE groupID=?', [memberGroup], (error: any, results: unknown) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  storeGroup(group: Group) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE GroupsOOP9 SET name=?, description=?, image=?, leader=?, memberGroup=? WHERE id=?',
        [group.name, group.description, group.image, group.leader, group.memberGroup, group.id],
        (error: any, results: any) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}
export let groupService = new GroupService();
