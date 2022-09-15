// 3rd party libraries
require('dotenv').config() // To get access of environment variables
require('express-async-errors') // To avoid writing try/catch and throwing error using next

// Express
const express = require('express')
const app = express()

// Database Connection
const connectDB = require('./db/connect')

// Authenticate User
const authenticateUser = require('./middleware/authentication')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// Error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Middleware to serve JSON
app.use(express.json())
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
