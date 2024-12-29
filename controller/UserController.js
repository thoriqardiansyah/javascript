const { STATUS_CODE } = require('node:http')
const { UserRepository } = require('../model/userModel')

class UserController {
   #repo
   
   /**
    * 
    * @param repo {UserRepository}
    */

   constructor(repo) {
      this.#repo = repo
   }

   register = (req, res) => {
      const { email, password } = req.body
      const {ok, data, message } = this.#repo.add(email, password)
      
      if(!ok) return res.json({status: STATUS_CODE[401], message})
      
      res.json(data).status(201)
   }

   login = (req, res) => {
      const { email, password } = req.body
      const { ok, data } = this.#repo.findByEmailPassword(email, password)

      if(!ok) return this.#unauthorized(res, "email or password incorrect!")
      
      res.json(data).status(200) 
   }

   #unauthorized = (res, message) => {
      const statusCode = 401;
      res.json({
         status: `${statusCode}: ${STATUS_CODE[statusCode]}`,
         message
      }).status(statusCode)
   }
}

module.exports = { UserController }