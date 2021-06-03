import { MongoClient } from 'mongodb'
import express from 'express'
const CURRENT_WORKING_DIR = process.cwd()
import path from 'path'
import template from './../template'
import devBundle from './devBundle'

const app = express()
// this is supposed to make it easier to develop in dev mode (unsure of this)
devBundle.compile(app)
//this makes it so the server serves the staic files from the /dist directory if the request route is /dist
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.get('/', (req,res) => {
	res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
	if (err) {
		console.log(err)
	}
	console.info(`Server started on port ${port}.`)
})

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sampleproj'
MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true },  ( err, db) => {
	if (!err){
		console.log("Connected successfully to mongodb server")
		db.close()
	}
})

// import path from 'path'
// import express from 'express'
// import { MongoClient } from 'mongodb'
// import template from './../template'
// //comment out before building for production
// import devBundle from './devBundle'

// const app = express()
// //comment out before building for production
// devBundle.compile(app)

// const CURRENT_WORKING_DIR = process.cwd()
// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// app.get('/', (req, res) => {
//   res.status(200).send(template())
// })

// let port = process.env.PORT || 3000
// app.listen(port, function onStart(err) {
//   if (err) {
//     console.log(err)
//   }
//   console.info('Server started on port %s.', port)
// })

// // Database Connection URL
// const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// // Use connect method to connect to the server
// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, db)=>{
// 	if (err){
// 		console.log("we have a pplahhblem!")

// 	}else{
// 		console.log("Connected successfully to mongodb server")
//   		db.close()
// 	}
  
// })