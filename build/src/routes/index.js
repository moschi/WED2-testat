"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tasksController_1 = require("../controller/tasksController");
var router = express.Router();
router.get('/', tasksController_1.tasksController.showTasksDefault.bind(tasksController_1.tasksController));
module.exports = router;
