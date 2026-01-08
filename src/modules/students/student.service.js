const studentModel = require('./student.model');

class StudentService {

  async createStudent(payload) {
    if (!payload.name) {
      throw new Error('Student name is required');
    }
    return studentModel.create(payload);
  }

  async listStudents() {
    return studentModel.findAll();
  }

  async getStudentById(id) {
    const student = await studentModel.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async updateStudent(id, payload) {
    await this.getStudentById(id);
    return studentModel.update(id, payload);
  }

  async deleteStudent(id) {
    await this.getStudentById(id);
    return studentModel.delete(id);
  }

  async getStudentsByParent(parentId) {
    return studentModel.findByParentId(parentId);
  }

  async assignParent({ studentId, parentId }) {
    if (!studentId || !parentId) {
      throw new Error('Student ID and Parent ID are required');
    }
    return studentModel.assignParent(studentId, parentId);
  }
}

module.exports = new StudentService();
