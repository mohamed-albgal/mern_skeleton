import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'
import webpackNodeExternals from 'webpack-node-externals'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email})
        if (!user)
            return res.status(401).json({ error: `User ${req.body.email} not found`})
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match"})
        }
        const token = jwt.sign({ _id : user._id }, config.jwtSecret)
        //the client stores this cookie and attaches it to the Authorization header to make requests, 
        //to sign out delete it
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch (err) {
        return res.status(401).json({ error: "Could not signin" })
    }
}


const signout = (req, res) => {
    res.clearCookie('t')
    res.status(200).json({ message: "Signed Out"})
}
//express checks the auth header for us to make sure the token is present and valid
//it throws an authentication error if invalid
//if valid it takes the userid (which it knows somehow) and places it as the value for the 'auth' key in the request object
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth'

}) 
//after being authenticted, the user must be authorized to delete or post user information
const hasAuthorization = (req, res, next) => {
    //attached is the user object, check for it, and that an auth key exists, and that the value of the auth key matches profile id of the request
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized for this operationn"
        })
    }
    next()
}

export default { signin, signout, requireSignin, hasAuthorization }