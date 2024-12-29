const express = require('express')

const { validator } = require('../middleware')
const { taskController } = require('../controller')
const { SchemaAddTask, SchemaUpdateStatus } = require('../model')

const taskRouter = express()


taskRouter.get('/', taskController.getAll)
taskRouter.post('/', validator(SchemaAddTask), taskController.createTask)
taskRouter.put('/:taskId', validator(SchemaUpdateStatus), taskController.updateStatus)
taskRouter.delete('/:taskId', taskController.removeTask)


module.exports = taskRouter