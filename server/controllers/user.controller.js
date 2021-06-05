import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
const create = async (req, res, next) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    }catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }

}
// for request with a userID segment in the request path, first find the db user, then propogate to 'next'
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status(400).json({ error: "User not found" })
        req.profile = user
        next()
    }catch (err) {
        return res.status(400).json({
            error: `Could not retrieve user ${id}`
        })
    }
}

// when this link in the chain gets called, it'll know the user id because we attached it to the profile
//in reading, no async/await since we already know the user, its attached as the key profile in the req object
const read = (req, res) => {
    //remove sensitive information before giving it to the frontend
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res) => {
    try {
        //remember: req.proifle is-a Schema object that's been attached to the request earlier.
        //is has methods save, remove, findBy...
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    }catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res, next) => {
    try {
        let user = req.profile
        let deleted = await user.remove()
        deleted.hashed_password = undefined
        deleted.salt = undefined
        res.json(deleted)
    }catch (err){
        res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userByID, read, list, remove, update}