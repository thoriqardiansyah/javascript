const { TaskController } = require('./TaskController')
const { UserController } = require('./UserController')
const { TaskRepository, UserRepository } = require('../model')

const taskRepository = new TaskRepository
const taskController = new TaskController(taskRepository)
const userRepository = new UserRepository
const userController = new UserController(userRepository)

module.exports = {
   taskController,
   userController
}