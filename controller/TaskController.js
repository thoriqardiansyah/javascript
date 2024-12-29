const { STATUS_CODES } = require('node:http')
const { TaskRepository } = require("../model/TaskModel")

class TaskController {
   #repo

   /**
    * 
    * @param { TaskRepository } taskRepository 
    */

   constructor(taskRepository){
      this.#repo = taskRepository
   }

   getAll = (req, res) => {
      res.json(this.#repo.all()).status(200)
   }

   createTask = (req, res) => {
      const {title} = req.body

      if(title == undefined || title < 3){
         const statusCode = 400
         return res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'title is required and more than 3 characters'}).status(statusCode)
      }

      const newTask = this.#repo.add(title)

      res.json(newTask).status(201)
   }

   updateStatus = (req, res) => {
         const {taskId: id} = req.params
         const {status} = req.body

         if(!id){
            const statusCode = 400
            res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'}).status(statusCode)
            return
         }

         if(!status){
            const statusCode = 400
            res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'}).status(statusCode)
            return
         }

         const {ok, data} = this.#repo.updateById(id, status)
         if (!ok){
            const statusCode = 404
            res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'}).status(statusCode)
            return
         }

         res.json(data).status(200)
   }

   removeTask = (req, res) => {
         const {taskId: id} = req.params
         console.log(id);

         if(id === undefined){
            const statusCode = 400
            res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'}).status(statusCode)
            return
         }

         const {ok, data} = this.#repo.removeById(id)
         if (ok === undefined){
            const statusCode = 404
            res.json({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id not found!'}).status(statusCode)
            return
         }         
         res.json(data).status(200)
   }
}

module.exports = {TaskController}