const server = require('./src/server')
const mongoose = require('mongoose')
require('dotenv').config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
  .then(
    server.listen(process.env.PORT || 3000, () => {
      console.log('server is running')
    })
  )
  .catch(error => {
    console.log('DB connection error', error)
  })




