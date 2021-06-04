import express from 'express'
import Template from '../template.js'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

app.get('/', (req,res) => {
    res.status(200).send(Template())

})







export default app;