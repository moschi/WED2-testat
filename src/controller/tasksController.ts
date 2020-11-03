import { dir } from 'console';
import { captureRejectionSymbol } from 'events';
import express = require('express');
import { read } from 'fs';
import store = require('../services/taskStore');

export class TasksController {
  showTasksDefault(req: express.Request, res: express.Response): void {
    const context = {
      title: 'Home',
      sort: 'finished',
      todos: {},
      direction: -1,
      invertedDirection: 1,
      isFinishedSorting: true,
      isCreationSorting: false,
      isImportanceSorting: false,
      showfinished: false,
      invertedshowfinished: true,
      isDarkmode: true,
    };
    store.getByFinishedBy(1, false, function (err, tasks) {
      context.todos = tasks;
      res.render('index', context);
    });
  }

  showTasks(req: express.Request, res: express.Response): void {
    const showFinished = req.params.shwfin == 'true';
    const direction = req.params.dir == '1' ? 1 : -1;
    const context = {
      title: 'Home',
      sort: req.params.attr,
      todos: {},
      direction: direction,
      invertedDirection: direction * -1,
      showfinished: showFinished,
      isFinishedSorting: false,
      isCreationSorting: false,
      isImportanceSorting: false,
      invertedshowfinished: !showFinished,
      isDarkmode: true,
    };
    switch (req.params.attr) {
      case 'finished':
        store.getByFinishedBy(direction, showFinished, function (err, tasks) {
          context.todos = tasks;
          context.isFinishedSorting = true;
          res.render('index', context);
        });
        break;
      case 'creation':
        store.getByCreationDate(direction, showFinished, function (err, tasks) {
          context.todos = tasks;
          context.isCreationSorting = true;
          res.render('index', context);
        });
        break;
      case 'importance':
        store.getByImportance(direction, showFinished, function (err, tasks) {
          context.todos = tasks;
          context.isImportanceSorting = true;
          res.render('index', context);
        });
        break;
    }
  }

  showTask(req: express.Request, res: express.Response): void {
    if (req.params.taskid == 'new') {
      this.createTask(req, res);
      return;
    }
    store.getByID(req.params.taskid, (err, tasks) => {
      res.render('task', tasks[0]);
    });
  }

  createTask(req: express.Request, res: express.Response): void {
    res.render('task', { _id: 'new' });
  }

  saveTask(req: express.Request, res: express.Response): void {
    if (req.params.taskid == 'new') {
      store.insert(req.body.title, req.body.desc, req.body.importance, req.body.finishedBy);
    } else {
      store.update(
        req.params.taskid,
        req.body.title,
        req.body.desc,
        req.body.importance,
        req.body.finishedBy,
        req.body.finished === 'on',
      );
    }
    res.redirect('/tasks/');
  }
}

export const tasksController = new TasksController();
