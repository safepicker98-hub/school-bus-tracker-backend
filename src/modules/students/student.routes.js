const express = require('express');
const router = express.Router();
const studentController = require('./student.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');
const parentOnly = require('../../middlewares/parentOnly');

// Admin routes
router.post('/', verifyToken, adminOnly, studentController.create.bind(studentController));
router.get('/', verifyToken, adminOnly, studentController.list.bind(studentController));
router.get('/:id', verifyToken, adminOnly, studentController.getById.bind(studentController));
router.put('/:id', verifyToken, adminOnly, studentController.update.bind(studentController));
router.delete('/:id', verifyToken, adminOnly, studentController.delete.bind(studentController));
router.post('/assign-parent', verifyToken, adminOnly, studentController.assignParent.bind(studentController));

// Parent routes
router.get('/parents/students', verifyToken, parentOnly, studentController.myChildren.bind(studentController));

module.exports = router;
