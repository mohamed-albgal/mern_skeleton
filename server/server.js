import config from './../config/config'
import mongoose from 'mongoose'
import app from './express'
import express from 'express'
import path from 'path'
import Template from '../template'

//allow routes to send request to 
app.use('/dist', express.static(path.join(process.cwd(), 'dist')))

//configure mongoose to use ES6 native promises (what does the alternative look like?)
mongoose.Promise = global.Promise;
//connect and configure it to use mongodb
mongoose.connect(config.mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to db: ----> ${config.mongoUri}`)
})

app.get('/', (req,res) => {
	res.status(200).send(Template())
})
app.listen(config.port, (err) => {
	if (err) {
		console.log(err)
	}
	console.info(`Server started on port ${config.port}`)
})

/**
 * don't forget to start the mongodb process: 
	* start mongodb using brew services
	* use mongo for shell environment
 */