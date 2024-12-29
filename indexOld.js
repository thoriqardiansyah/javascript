const { createServer, STATUS_CODES } = require("node:http");
const { TaskController } = require("./TaskControllerManual");

const taskController = new TaskController()
const server = createServer();

server.on('request', async (req, res) => {
   const { method, url, headers } = req
  //  console.debug('request received ', {method, url, headers: {'content-type': headers['content-type']}})
   
   switch (url) {
    case '/api/v1/tasks':
      switch (method) {
        case 'GET':
          taskController.getAll(req, res)
          return
        
        case 'POST':
          taskController.createTask(req, res)
          return

        case 'PUT':
          taskController.updateTask(req, res)
          return
        
        case 'DELETE':
          taskController.removeTask(req, res)
          return
                
        default:
          res.writeHead(405, { "content-type": "application/json"});
          res.write(JSON.stringify({message: STATUS_CODES[405]}))
          res.end();
          break;
      }
      return

 
    default:
      // const html404 = `<!DOCTYPE html>
      // <html lang="en">
      //   <head>
      //     <meta charset="UTF-8" />
      //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //     <title>Document</title>
      //   </head>
      //   <body>
      //     <h1>404: Not Found</h1>      
      //   </body>
      // </html>`;
      // res.writeHead(404, { "content-type": "text/html", 'content-length': html404.length });
      // res.end(html404);
      res.end()
      return
   }

   
 })

const port = 8080;
server.listen(port, "localhost", () => {
  console.log(`server is listening at http://localhost:${port}`);
});

process.addListener("SIGINT", (signal) => {
  console.log("shutdown procedure started");
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  console.log("shutdown procedure completed");
})

console.log("server started");
