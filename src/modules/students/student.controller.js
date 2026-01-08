const studentService = require('./student.service');

class StudentController {

  async create(req, res) {
    try {
      const student = await studentService.createStudent(req.body);
      return res.status(201).json({
        success: true,
        message: 'Student created successfully',
        student
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async list(req, res) {
    try {
      const students = await studentService.listStudents();
      return res.status(200).json({
        success: true,
        students
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      return res.status(200).json({
        success: true,
        student
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const student = await studentService.updateStudent(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        student
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      await studentService.deleteStudent(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async myChildren(req, res) {
    try {
      const students = await studentService.getStudentsByParent(
        req.user.userId
      );
      return res.status(200).json({
        success: true,
        students
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async assignParent(req, res) {
    try {
      const student = await studentService.assignParent(req.body);
      return res.status(200).json({
        success: true,
        message: 'Parent assigned successfully',
        student
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new StudentController();
