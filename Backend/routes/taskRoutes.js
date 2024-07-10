

const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/task.model');
const User = require('../models/user.model'); 

const router = express.Router();

// Create Task
router.post('/', async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const task = await Task.create({
      title,
      description,
      dueDate,
      status,
      UserId: user.id,
    });
    res.status(201).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Task creation failed' });
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, status } = req.body;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const task = await Task.findOne({ where: { id: taskId, UserId: user.id } });
    if (!task) {
      throw new Error('Task not found');
    }
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    await task.save();
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Task update failed' });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const task = await Task.findOne({ where: { id: taskId, UserId: user.id } });
    if (!task) {
      throw new Error('Task not found');
    }
    await task.destroy();
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Task deletion failed' });
  }
});

// Get All Tasks
router.get('/', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const tasks = await Task.findAll({ where: { UserId: user.id } });
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Unable to fetch tasks' });
  }
});

module.exports = router;
