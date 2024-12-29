const bcrypt = require('bcrypt')
const {randomUUID} = require('node:crypto')
const { z } = require('zod')

const SchemaCredentials = z.object({
   email: z.string().email(),
   password: z.string().min(6)
})

class UserRepository {
   #user = [{id: '5045780d-dd20-472c-81ba-37ff695f496b', email: 'admin@gmail.com', password: 'admin123'}]
   #saltRounds = 10

   findByEmailPassword = (email, pwd) => {
      const usr = this.#user.find(u => u.email === email)
      if(!usr) return { ok: false, data: null}
      const isMatch = bcrypt.compareSync(pwd, usr.password)
      if(!isMatch) return {ok: false, data: null}
      return {ok: true, data: {id: usr.id, email: usr.email}}
   }

   add = (email, pwd) => {
      const emailTaken = this.#user.some(u => u.email === email)
      if(emailTaken) return {ok: false, message: "email has already taken!"}

      const salt = bcrypt.genSaltSync(this.#saltRounds)
      const hash = bcrypt.hashSync(pwd, salt)

      const userId = randomUUID()
      this.#user.push({id: userId, email, password: hash})
      return {ok: true, data: {id: userId}}
   }
}

module.exports = { UserRepository, SchemaCredentials }