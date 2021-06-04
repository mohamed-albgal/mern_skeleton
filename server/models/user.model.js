import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: "Name is required"
    },
    email: {
        type:String, 
        trim: true, 
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email adderss'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String, 
        required: "Password is required" ,
    },
})
UserSchema.methods = {
    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) == this.hashed_password
    },
    encryptedPassword: function(password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt).upadate(password).digest('hex')
        }catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
//password is a virtual field, pw is salted, encrypted, and stored as 'hashed_password'
//use the user schema methods defined above
UserSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    }).get(function() {
        return this._password
    })
UserSchema.path('hashed_password').validate( function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required.')
    }
}, null)

export default mongoose.model('User', UserSchema)

