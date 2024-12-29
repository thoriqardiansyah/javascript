const express = require('express')
const config = require('./config')

const router = require('./router')
const morgan  = require('morgan')
const logger = morgan(config.logFormat())

const app = express()

// middleware
app.use(express.json())
app.use(logger)

//API
app.use('/api/v1', router)

// Global Error
app.use((err, req, res, next) => {
   console.error(err)
   res.json({message: "Something wrong!"}).status(500)
 })

// Server running
app.listen(config.port(), () => {
   console.log(`Server is listening at http://localhost:${config.port()}`)
})