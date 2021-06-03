
export default {
    env: process.env.NODE_ENV ||  'development',
    port:process.env.port || 3000,
    jwtSecret: process.env.JWT_SECRET || "secret_key",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost')
    + ':' + (process.env.MONGO_PORT || '27017)') + '/mernproject'
}
