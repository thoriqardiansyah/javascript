const { randomUUID } = require('node:crypto')
const { z } = require('zod')

const TASK_STATUS = ['todo', 'onprogress', 'completed']

const SchemaAddTask = z.object({
   title: z.string().min(3)
}).required()

const SchemaUpdateStatus = z.object({
   status: z.enum(TASK_STATUS)
}).required()

class TaskRepository {
   #tasks = [
      {id: '62c99195-56f6-4324-a9bc-2babe9805096', title: "task a", status: "onprogress"}, 
      {id: 'cf736629-fc73-4a2a-a1ac-eddab727babd', title: "task b",status: "completed" }, 
      {id: 'f117b117-c3e4-422a-8587-2fab13f850c7', title: "task c", status: "onprogress"}
   ]


   all = () => this.#tasks
   
   add = (title) => {
      const newTask = {id: randomUUID(), title: title, status: "onprogress"}
      this.#tasks.push(newTask)
      return newTask
   }

   removeById = (id) => {
      const target = this.#tasks.find(task => task.id === id)
      if (!target){
         return {ok: false, data: null}
      }
      
      this.#tasks = this.#tasks.filter(task => task.id !== id)
      return {ok: true, data: target}
   }

   updateById = (id, status) => {
      const index = this.#tasks.findIndex((task) => task.id === id)
      if (index < 0){
         return {ok: false, data: null}
      }

      this.#tasks[index].status = status
      return {ok: true, data: this.#tasks[index]}
   }
}

module.exports = {TaskRepository, SchemaAddTask, SchemaUpdateStatus}