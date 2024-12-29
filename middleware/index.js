const { ZodError } = require('zod')

const validator = (schema) => {
   return (req, res, next) => {
      try {
         schema.parse(req.body)
         next()
      } catch (err) {
         if(err instanceof ZodError){
            console.log('error', err.errors)
            const issues = err.errors.map(({path, message}) => ({path, message}))
            res.json({code: "validation_error", issues}).status(400)
         } else {
            next(err)
         }
      }
   }
}

module.exports = { validator }