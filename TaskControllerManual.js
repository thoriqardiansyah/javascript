const { randomUUID } = require('node:crypto')
const { STATUS_CODES } = require('node:http')

class TaskController {
   #tasks = [
      {id: '62c99195-56f6-4324-a9bc-2babe9805096', title: "task a", status: "onprogress"}, 
      {id: 'cf736629-fc73-4a2a-a1ac-eddab727babd', title: "task b",status: "completed" }, 
      {id: 'f117b117-c3e4-422a-8587-2fab13f850c7', title: "task c", status: "onprogress"}
   ]

   getAll = (req, res) => {
      const jsonRaw = JSON.stringify(this.#tasks)
      res.writeHead(200, { "content-type": "application/json", "content-length": jsonRaw.length});
      res.write(jsonRaw)
      res.end();
   }

   createTask = (req, res) => {
      const chunks = []
      req.on('data', (chunk) => {
      chunks.push(chunk)
      })

      .on('error', (err) => {
      console.log('error', err);
      })

      .on('end', () => {
      const rawJson = Buffer.concat(chunks).toString()
      const {title} = JSON.parse(rawJson)

      if(title == undefined || title < 3){
         const statusCode = 400
         const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'title is required and more than 3 characters'})
         res.writeHead(400, { "content-type": "application/json", "content-length": badRequest.length});
         res.end(badRequest);
         return
      }

      const newTask = {id: randomUUID(), title: title, status: "todo"}
      this.#tasks.push(newTask)

      const newTaskJson = JSON.stringify(newTask)
      res.writeHead(201, { "content-type": "application/json", "content-length": newTaskJson.length});
      res.end(newTaskJson);
      })
   }

   updateTask = (req, res) => {
      const chunks = []
      req.on('data', (chunk) => {
         chunks.push(chunk)
      })
      .on('error', (err) => {
         console.log('error', err);
      })
      .on('end', () => {
         const rawJson = Buffer.concat(chunks).toString()
         const {id, status} = JSON.parse(rawJson)

         if(!id){
            const statusCode = 400
            const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'})
            res.writeHead(400, { "content-type": "application/json", "content-length": badRequest.length});
            res.end(badRequest);
            return
         }

         if(!status){
            const statusCode = 400
            const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'status is required'})
            res.writeHead(400, { "content-type": "application/json", "content-length": badRequest.length});
            res.end(badRequest);
            return
         }

         const index = this.#tasks.findIndex((task) => task.id === id)
         if (index < 0){
            const statusCode = 404
            const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is not found'})
            res.writeHead(404, { "content-type": "application/json", "content-length": badRequest.length});
            res.end(badRequest);
            return
         }

         this.#tasks[index].status = status
         // console.log('isi dari tasks[index]', this.#tasks[index])
         // console.log('isi dari index', index)

         const newTaskJson = JSON.stringify(this.#tasks[index])
         res.writeHead(200, { "content-type": "application/json", "content-length": newTaskJson.length});
         res.end(newTaskJson);
      })      
   }

   removeTask = (req, res) => {
      const chunks = []
      req.on('data', (chunk) => {
         chunks.push(chunk)
      })

      .on('error', (err) => {
         console.log('error', err);
      })

      .on('end', () => {
         const rawJson = Buffer.concat(chunks).toString()
         const {id} = JSON.parse(rawJson)

         if(!id){
            const statusCode = 400
            const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'id is required'})
            res.writeHead(400, { "content-type": "application/json", "content-length": badRequest.length});
            res.end(badRequest);
            return
         }

         const deletedTask = this.#tasks.find(task => task.id === id)
         if (!deletedTask){
            const statusCode = 404
            const badRequest = JSON.stringify({status: `${statusCode}: ${STATUS_CODES[statusCode]}`, message: 'task not found'})
            res.writeHead(404, { "content-type": "application/json", "content-length": badRequest.length});
            res.end(badRequest);
            return
         }
         
         this.#tasks = this.#tasks.filter(task => task.id !== id)

         const newTaskJson = JSON.stringify(deletedTask)
         res.writeHead(200, { "content-type": "application/json", "content-length": newTaskJson.length});
         res.end(newTaskJson);

      })
   }
}

module.exports = {TaskController}