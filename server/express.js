import express from 'express'
import Template from '../template.js'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

app.use('/', authRoutes)
app.use('/', userRoutes)



app.use((err, req, res, next) => {
    //expressjwt will throw an UnathorizedError if not authorized, here we control what is returned by that
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error" : err.name + ": " + err.message })
        console.log(err)
    }
})





export default app;