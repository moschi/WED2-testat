import express = require('express');
import store = require('../services/taskStore');
import { tasksController } from '../controller/tasksController';
const router = express.Router();

/* GET home page. */
router.get('/', tasksController.showTasks.bind(tasksController));

module.exports = router;
