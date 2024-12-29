const tasks = require('./TaskModel')
const users = require('./userModel')

module.exports = {
   ...tasks,
   ...users
}