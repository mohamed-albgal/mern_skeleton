import config from './../config/config'
import mongoose from 'mongoose'
import app from './express'
import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_skeleton'

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
// MongoClient.connect(url, (err, db) => {

// 	console.log("Connected successfully to mongodb server")
// 	db.close()
// })
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