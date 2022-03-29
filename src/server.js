const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middlewares/errorHandler.middleware')
const logger = require('./middlewares/logger.middleware')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(logger)
app.use('/users',userRouter)
app.use('/auth',authRouter)




app.get('/', (request, response) =>{
    response.json({
        ok:true,
        message: 'Server running'
    })
})
module.exports = app