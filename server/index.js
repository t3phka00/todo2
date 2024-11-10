import express from 'express'
import cors from 'cors'
import todoRouter from '../server/routes/todoRouter.js'
import userRouter from '../server/routes/userRouter.js'

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/',todoRouter)
app.use('/user',userRouter)

app.listen(port)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

